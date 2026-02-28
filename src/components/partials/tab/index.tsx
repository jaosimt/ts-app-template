import { FC, HTMLAttributes, memo, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';
import { useResizeObserver } from 'usehooks-ts';
import { CSSColors, CSSUnit } from '../../../types';
import { classNames, inStringNumberToWords, isString, parseCSSUnit, Round, snakeCase } from '../../../utils';
import ReactIcon from '../../partials';
import './styles.scss';

export interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
    activeItemColor?: CSSColors;
    contentPadding?: CSSUnit;
    data: TabItemType[];
    minContentHeight?: CSSUnit;
    moveSelectedOnScroll?: boolean;
    type?: 'boxed' | 'boxed-content' | 'boxed-tabs' | 'plain';
    onTabChange?: Function,
    width?: CSSUnit;
    rememberActiveTab?: boolean;
    id?: string;
}

export type TabItemType = {
    id?: string;
    name: string;
    content: ReactNode;
}

type TabItemsPos = {
    lefts: number[];
    rights: number[];
}

const roundPrecision = 0;
const shiftOffset = 3;

const Tabs: FC<TabItemProps> = (props) => {
    const {
        data,
        contentPadding = '1rem',
        type = 'plain',
        moveSelectedOnScroll = false,
        activeItemColor = 'magenta',
        minContentHeight,
        onTabChange,
        rememberActiveTab,
        id,
        width
    } = props;

    const tabItemsWrapper = useRef<HTMLDivElement>(null);
    const resizeTimeoutRef = useRef<any>(null);

    const [tabOverflow, setTabOverflow] = useState<Record<string, boolean>>({
        left: false,
        right: false
    });

    const [selected, setSelected] = useState<string>(() => {
        if (isString(id, true) && rememberActiveTab) {
            const saved = getStoredSelection();
            console.log('data:', data);
            console.log('saved:', saved);
            const savedSelection = saved.filter((s:any) => s.id === id)[0];
            console.log('savedSelection:', savedSelection);
            const thisSelection = data.filter((d:TabItemType) => {
                const name = snakeCase(inStringNumberToWords(d.name), '-')
                console.log('name:', name)
                return name === savedSelection?.name
            });
            console.log('thisSelection:', thisSelection);

            if (thisSelection.length) return savedSelection.name;
        }
        return snakeCase(inStringNumberToWords(data[0].name), '-')
    });

    const [hoveredItem, setHoveredItem] = useState('');

    const getTabItemsPos = () => {
        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;

        const tabItems: TabItemsPos = {
            lefts: [],
            rights: []
        };

        if (!itemsWrapper) return tabItems;

        itemsWrapper.querySelectorAll('.tab-item').forEach(t => {
            const tBCR = t.getBoundingClientRect();
            tabItems.lefts.push(Round(tBCR.left, roundPrecision));
            tabItems.rights.push(Round(tBCR.right, roundPrecision));
        });

        return tabItems;
    };

    useResizeObserver({
        ref: tabItemsWrapper as RefObject<HTMLDivElement>, // containerRef is RefObject<HTMLDivElement | null>
        onResize: () => {
            clearTimeout(resizeTimeoutRef.current);
            resizeTimeoutRef.current = setTimeout(updateTabOverflow, 300);
        },
    });

    useEffect(() => {
        localStorage.setItem('scroll-left', '0');
        updateTabOverflow();

        return () => {
            clearTimeout(resizeTimeoutRef.current);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (localStorage.getItem('checkVisibility') === 'true') {
            localStorage.removeItem('checkVisibility');
            const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
            const activeElement = itemsWrapper.querySelector('.tab-item.active') as HTMLElement;

            const activeElementBCR = activeElement.getBoundingClientRect();
            const itemWrapperBCR = itemsWrapper.getBoundingClientRect();

            const activeElementLeft = Math.ceil(activeElementBCR.left);
            const wrapperLeft = itemWrapperBCR.left;
            const activeElementRight = Math.ceil(activeElementBCR.right);
            const wrapperRight = itemWrapperBCR.right;

            if (activeElementRight > wrapperRight) scrollRightHandler();
            else if (activeElementLeft < wrapperLeft) scrollLeftHandler();
        }

        onTabChange && onTabChange(selected);

        if (isString(id, true) && rememberActiveTab) {
            const saved = getStoredSelection().filter((s: any) => s.id !== id);
            localStorage.setItem('tabS', JSON.stringify([...saved, {id, name: selected}]));
        }

        // eslint-disable-next-line
    }, [selected]);

    const getNext = (direction: 'left' | 'right', tabItemsPos: number[]) => {
        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
        const tabBCR = itemsWrapper.getBoundingClientRect();
        const tabLeft = Round(tabBCR?.left as number, roundPrecision);
        const tabRight = Round(tabBCR?.right as number, roundPrecision);

        if (direction === 'left') return tabItemsPos.filter(l => l < tabLeft).pop();
        if (direction === 'right') return tabItemsPos.filter(l => l > tabRight).shift();

        return undefined;
    }

    const hasHidden = (direction: 'left' | 'right', tabItemsPos: number[]) => getNext(direction, tabItemsPos) !== undefined;

    const scrollLeftHandler = () => {
        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
        const {lefts} = getTabItemsPos();
        const nextLeftScrollPos = getNext('left', lefts);

        if (nextLeftScrollPos !== undefined) {
            const tabLeft = Round(itemsWrapper.getBoundingClientRect()['left'] as number, roundPrecision);
            const storedScrollLeft = parseFloat(localStorage.getItem('scroll-left') || '0');

            const activeElement = itemsWrapper.querySelector('.tab-item.active') as HTMLElement;
            if (moveSelectedOnScroll && activeElement) {
                const {dataset: {index}} = activeElement;
                const nIndex = Number(index) - 1;

                const activeElementLeft = Math.floor(activeElement.getBoundingClientRect().left);
                const wrapperLeft = itemsWrapper.getBoundingClientRect().left;

                if (nIndex <= data.length && activeElementLeft > wrapperLeft) {
                    const nextTabItem = snakeCase(inStringNumberToWords(data[nIndex].name), '-');
                    setSelected(nextTabItem);
                }
            }

            itemsWrapper.scroll({
                left: storedScrollLeft - (tabLeft - (nextLeftScrollPos - shiftOffset)),
                behaviour: 'smooth'
            } as ScrollOptions);

            updateTabOverflow();
        }
    };

    const scrollRightHandler = () => {
        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
        const {rights} = getTabItemsPos();
        const nextRightScrollPos = getNext('right', rights);

        if (nextRightScrollPos !== undefined) {
            const tabRight = Round(itemsWrapper.getBoundingClientRect()['right'] as number, roundPrecision);
            const storedScrollLeft = parseFloat(localStorage.getItem('scroll-left') || '0');

            const activeElement = itemsWrapper.querySelector('.tab-item.active') as HTMLElement;
            if (moveSelectedOnScroll && activeElement) {
                const {dataset: {index}} = activeElement;
                const nIndex = Number(index) + 1;

                const activeElementRight = Math.ceil(activeElement.getBoundingClientRect().right);
                const wrapperRight = itemsWrapper.getBoundingClientRect().right;

                if (nIndex <= data.length && activeElementRight < wrapperRight) {
                    const nextTabItem = snakeCase(inStringNumberToWords(data[nIndex].name), '-');
                    setSelected(nextTabItem);
                }
            }

            itemsWrapper.scroll({
                left: storedScrollLeft + ((nextRightScrollPos + shiftOffset) - tabRight),
                behaviour: 'smooth'
            } as ScrollOptions);

            updateTabOverflow();
        }
    };

    const tabItemClickHandler = (e: any) => {
        const {dataset: {name}} = e.currentTarget;
        // checkVisibility is used to limit checking whether the clicked tab item is fully visible!
        // otherwise, the selected partially shown tab item will be automatically scrolled
        localStorage.setItem('checkVisibility', 'true');
        setSelected(name);
    };

    function updateTabOverflow() {
        const {lefts, rights} = getTabItemsPos();

        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
        if (!itemsWrapper) return;

        localStorage.setItem('scroll-left', String(Round(itemsWrapper.scrollLeft, roundPrecision)));
        setTabOverflow({
            left: hasHidden('left', lefts),
            right: hasHidden('right', rights)
        });
    }

    function getStoredSelection() {
        const saved = localStorage.getItem('tabS');
        return saved ? JSON.parse(saved) : [];
    }

    return <div data-component={'tabs'} className={type} style={{width: width ? parseCSSUnit(width) : 'inherit'}}>
        <div className={'tab-items'}>
            <div className={classNames('scroll-btn-left', tabOverflow.left && 'visible')}>
                <ReactIcon size={21} icon={RxChevronLeft} onClick={scrollLeftHandler}/>
            </div>
            <div className={'tab-items-wrapper'} ref={tabItemsWrapper}>
                {
                    data.map((t, i) => {
                        const itemName = t.id || snakeCase(inStringNumberToWords(t.name), '-');
                        const isActive = selected === itemName;

                        return <div
                            key={`tab-item-${itemName}`}
                            data-index={i}
                            data-name={itemName}
                            onClick={tabItemClickHandler}
                            className={classNames('tab-item', isActive && 'active')}
                            onMouseEnter={() => setHoveredItem(itemName)}
                            onMouseLeave={() => setHoveredItem('')}
                            style={{
                                color: isActive || hoveredItem === itemName ? activeItemColor : ''
                            }}>
                            {t.name}
                        </div>;
                    })
                }
            </div>
            <div className={classNames('scroll-btn-right', tabOverflow.right && 'visible')}>
                <ReactIcon size={21} icon={RxChevronRight} onClick={scrollRightHandler}/>
            </div>
        </div>
        {
            data.map(t => {
                const itemName = snakeCase(inStringNumberToWords(t.name), '-');
                return <div
                    key={`tab-content-${itemName}`} data-name={itemName}
                    style={{
                        padding: parseCSSUnit(contentPadding),
                        minHeight: minContentHeight && parseCSSUnit(minContentHeight)
                    }}
                    className={classNames('tab-content', selected === itemName && 'active')}>
                    {t.content}
                </div>;
            })
        }
    </div>;
};

export default memo(Tabs);