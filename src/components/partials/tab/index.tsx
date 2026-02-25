import { FC, HTMLAttributes, memo, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from 'react-icons/bi';
import { useResizeObserver } from 'usehooks-ts';
import { CSSColors, CSSUnit } from '../../../types';
import { classNames, inStringNumberToWords, parseCSSUnit, Round, snakeCase } from '../../../utils';
import ReactIcon from '../../partials';
import './styles.scss';

export interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
    activeItemColor?: CSSColors;
    contentPadding?: CSSUnit;
    data: TabItemType[];
    minContentHeight?: CSSUnit;
    moveSelectedOnScroll?: boolean;
    type?: 'boxed-content' | 'boxed' | 'plain';
    onTabChange?: Function,
    activeTab?: string;
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
        activeTab
    } = props;

    const tabItemsWrapper = useRef<HTMLDivElement>(null);
    const resizeTimeoutRef = useRef<any>(null);

    const [tabOverflow, setTabOverflow] = useState<Record<string, boolean>>({
        left: false,
        right: false
    });
    const [selected, setSelected] = useState(activeTab || snakeCase(inStringNumberToWords(data[0].name), '-'));
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
        onResize: (size) => {
            clearTimeout(resizeTimeoutRef.current);
            resizeTimeoutRef.current = setTimeout(() => {
                console.log('useResizeObserver:', size);
                updateTabOverflow();
            }, 300);
        },
    });

    useEffect(() => {
        console.log('[Tabs] tabItemsWrapper:', tabItemsWrapper.current);

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

    return <div data-component={'tabs'} className={type}>
        <div className={'tab-items'}>
            <div className={classNames('scroll-btn-left', tabOverflow.left && 'visible')}>
                <ReactIcon size={21} icon={BiSolidChevronLeftCircle} onClick={scrollLeftHandler}/>
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
                <ReactIcon size={21} icon={BiSolidChevronRightCircle} onClick={scrollRightHandler}/>
            </div>
        </div>
        {
            data.map(t => {
                const itemName = snakeCase(inStringNumberToWords(t.name), '-');
                return <div
                    key={`tab-content-${itemName}`} data-name={itemName}
                    style={{
                        padding: parseCSSUnit(String(contentPadding)),
                        minHeight: parseCSSUnit(String(minContentHeight))
                    }}
                    className={classNames('tab-content', selected === itemName && 'active')}>
                    {t.content}
                </div>;
            })
        }
    </div>;
};

export default memo(Tabs);