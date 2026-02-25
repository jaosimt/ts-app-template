import { FC, memo, useEffect, useRef, useState } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { classNames, getTextWidth, snakeCase } from '../../../utils';
import ReactIcon from '../../partials';
import '../../partials/tab/styles.scss';

type TabWidthsProps = {
    tab: number;
    tabItems: number,
}

type TabItemsPos = {
    lefts: number[];
    rights: number[];
}

const Tabs: FC = () => {
    const tabItemsWrapper = useRef<HTMLDivElement | null>(null);
    const tabWidths = useRef<TabWidthsProps>({
        tab: 0,
        tabItems: 0
    });

    const [tabOverflow, setTabOverflow] = useState<Record<string, boolean>>({
        left: false,
        right: false
    });

    const getTabWidth = () => parseFloat(getComputedStyle(tabItemsWrapper.current as HTMLElement)['width']);

    const getTabItemsPos = () => {
        const tabItems: TabItemsPos = {
            lefts: [],
            rights: []
        };

        tabItemsWrapper.current?.querySelectorAll('.tab-item').forEach((t, i) => {
            const tBCR = t.getBoundingClientRect();
            tabItems.lefts.push(Math.round(tBCR.left));
            tabItems.rights.push(Math.round(tBCR.right));
        });

        return tabItems;
    };

    useEffect(() => {
        console.log('tabOverflow:', tabOverflow);
    }, [tabOverflow]);

    useEffect(() => {
        localStorage.setItem('scroll-left', '0');

        const tabItems = tabItemsWrapper.current?.querySelectorAll('.tab-item');
        const tabItemWidths: number[] = [];

        tabItems?.forEach((t: Element) => {
            const computedStyles = getComputedStyle(t);
            const paddingLeft = parseFloat(computedStyles['paddingLeft']);
            const paddingRight = parseFloat(computedStyles['paddingRight']);
            const borderLeft = parseFloat(computedStyles['borderLeft']);
            const borderRight = parseFloat(computedStyles['borderRight']);

            const itemWidth = +(getTextWidth(t.textContent as string, computedStyles['font']) + paddingLeft + paddingRight + borderLeft + borderRight).toFixed(2);
            tabItemWidths.push(itemWidth);
        });

        tabWidths.current.tab = getTabWidth();
        tabWidths.current.tabItems = tabItemWidths.reduce((acc: number, currentValue: number) => acc + currentValue, 0);

        updateTabOverflow();
        // eslint-disable-next-line
    }, []);

    function getNext(direction: 'left' | 'right', tabItemsPos: number[]) {
        const tabBCR = tabItemsWrapper.current?.getBoundingClientRect();
        const tabLeft = Math.round(tabBCR?.left as number);
        const tabRight = Math.round(tabBCR?.right as number);

        if (direction === 'left') return tabItemsPos.filter(l => l < tabLeft).pop();
        if (direction === 'right') return tabItemsPos.filter(l => l > tabRight).shift();

        return undefined;
    }

    const hasHidden = (direction: 'left' | 'right', tabItemsPos: number[]) => getNext(direction, tabItemsPos) !== undefined;

    const scrollLeftHandler = () => {
        const {lefts} = getTabItemsPos();
        const nextLeftScrollPos = getNext('left', lefts);

        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;

        if (nextLeftScrollPos !== undefined) {
            const tabLeft = Math.round(itemsWrapper.getBoundingClientRect()['left'] as number);
            const storedScrollLeft = parseFloat(localStorage.getItem('scroll-left') || '0');

            tabItemsWrapper.current?.scroll({
                left: storedScrollLeft - (tabLeft - nextLeftScrollPos),
                behaviour: 'smooth'
            } as ScrollOptions);

            localStorage.setItem('scroll-left', String(itemsWrapper.scrollLeft));

            updateTabOverflow();
        }
    };

    const scrollRightHandler = () => {
        const {rights} = getTabItemsPos();
        const nextRightScrollPos = getNext('right', rights);

        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;

        if (nextRightScrollPos !== undefined) {
            const tabRight = Math.round(itemsWrapper.getBoundingClientRect()['right'] as number);
            const storedScrollLeft = parseFloat(localStorage.getItem('scroll-left') || '0');

            itemsWrapper.scroll({
                left: storedScrollLeft + (nextRightScrollPos - tabRight),
                behaviour: 'smooth'
            } as ScrollOptions);

            localStorage.setItem('scroll-left', String(itemsWrapper.scrollLeft));

            updateTabOverflow();
        }
    };

    const tabItems = (() => {
        const arr = [];
        for (let i = 0; i < 14; i++) arr.push(`Tab ${i + 1}`);
        return arr;
    })();

    function updateTabOverflow() {
        const {lefts, rights} = getTabItemsPos();

        setTabOverflow({
            left: hasHidden('left', lefts),
            right: hasHidden('right', rights)
        });
    }
    return <div data-component={'tabs'}>
        <div className={'tab-items'}>
            <div className={classNames('scroll-btn-left', tabOverflow.left && 'visible')}>
                <ReactIcon size={21} icon={CiCircleChevLeft} onClick={scrollLeftHandler}/>
            </div>
            <div className={'tab-items-wrapper'} ref={tabItemsWrapper}>
                {
                    tabItems.map((t, i) => {
                        return <div key={`data-item-${i}`} data-name={snakeCase(t)} className={'tab-item'}>{t}</div>;
                    })
                }
            </div>
            <div className={classNames('scroll-btn-right', tabOverflow.right && 'visible')}>
                <ReactIcon size={21} icon={CiCircleChevRight} onClick={scrollRightHandler}/>
            </div>
        </div>
        <div className="tab-content">
            Tab Content
        </div>
    </div>;
};

export default memo(Tabs);