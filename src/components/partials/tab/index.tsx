import { FC, HTMLAttributes, memo, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';
import styled from 'styled-components';
import { useResizeObserver } from 'usehooks-ts';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSColors, CSSUnit } from '../../../constants/types';
import { useAppSelector } from '../../../hooks';
import { getTheme } from '../../../slices/theme';
import { classNames, inStringNumberToWords, isString, parseCSSUnit, Round, snakeCase } from '../../../utils';
import { getAccentColor } from '../../../utils/themeUtils';
import { ReactIcon } from '../index';
import v from '../../../styles/variables.module.scss';

export interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
    activeItemColor?: CSSColors;
    contentPadding?: CSSUnit | undefined;
    data: TabItemType[];
    minContentHeight?: CSSUnit;
    moveSelectedOnScroll?: boolean;
    type?: TabsType;
    onTabChange?: Function,
    width?: CSSUnit;
    rememberActiveTab?: boolean;
    id?: string;
    theme?: ThemeProp;
}

export type TabsType = 'boxed' | 'boxed-content' | 'boxed-tabs' | 'plain';

export type TabItemType = {
    id?: string;
    name: string;
    content: ReactNode;
}

type TabItemsPos = {
    lefts: number[];
    rights: number[];
}

// noinspection CssUnusedSymbol
const ScrollBtn = styled.div<{
    $theme: ThemeProp;
}>`
    align-items: center;
    cursor: pointer;
    display: flex;
    opacity: 0;
    transition: all 200ms ease-in-out;
    z-index: 2;
    justify-content: center;
    height: inherit;
    padding: 0.4rem 0;
    margin-top: 3px;
    border-bottom: none;

    > svg {
        background-color: white;
        border-radius: 50%;
        color: ${props => getAccentColor(props.$theme)};
    }

    &.visible {
        opacity: 0.3;
    }

    &.btn-left {

    }
`;

const TabItems = styled.div<{}>`
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-bottom: none;
    border-top-left-radius: ${v.borderRadius};
    border-top-right-radius: ${v.borderRadius};
    display: grid;
    font-weight: bold;
    grid-template-columns: 21px auto 21px;

    &:hover {
        > ${ScrollBtn} {
            &.visible {
                opacity: 1;

                &:active {
                    opacity: 0.3;
                }
            }
        }
    }
`;

// noinspection CssUnusedSymbol
const TabItemsWrapper = styled.div<{
    $theme: ThemeProp;
}>`
    border: none;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    white-space: nowrap;
    z-index: 1;
    color: ${v.buttonPrimaryTextColor};

    > .tab-item {
        border-width: 1px;
        border-style: solid;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        cursor: pointer;
        display: inline-flex;
        padding: 0.5rem 0.7rem;
        transition: color, background-color, opacity, width, height, padding 100ms ease-in-out;
        white-space: nowrap;

        &:first-child:not(.active),
        & ~ .tab-item:not(.active):not(:last-child) { border-right-width: 0; }

        &.active + .tab-item { border-left-width: 0; }

        &.active {
            color: ${props => getAccentColor(props.$theme)};
            background-color: ${v.buttonPrimaryTextColor};
            border-bottom-color: ${v.buttonPrimaryTextColor};
            border-left-width: 1px;
            margin-top: 0;
            z-index: 1;
        }

        &:not(.active) {
            z-index: -1;
        }
    }
`;

// noinspection CssUnusedSymbol
const TabContent = styled.div<{
    $padding: CSSUnit | undefined;
    $minHeight: CSSUnit | undefined;
    $theme: ThemeProp;
}>`
    width: 100%;
    overflow: auto;
    ${props => props.$padding !== undefined && `padding: ${parseCSSUnit(props.$padding)}`};
    ${props => props.$minHeight !== undefined && `min-height: ${parseCSSUnit(props.$minHeight)}`};

    color: ${v.textColor};
    background-color: ${v.buttonPrimaryTextColor};
    border-width: 1px;
    border-style: solid;
    border-color: ${props => getAccentColor(props.$theme)};
    border-radius: ${v.borderRadius};
    margin-top: -1px;
    position: relative;
    z-index: 0;

    > * { animation: fadein 300ms ease-in; }
`;

// noinspection CssUnusedSymbol
const Container = styled.div<{
    $minWidth: CSSUnit;
    $width: CSSUnit | 'inherit';
    $theme: ThemeProp;
}>`
    min-width: ${props => props.$minWidth};
    width: ${props => props.$width || '100%'};
    border-radius: ${v.borderRadius};
    border: none;
    display: flex;
    flex-direction: column;
    overflow: auto;

    &.boxed {
        > ${TabItems} {
            background-color: ${props => getAccentColor(props.$theme)};
            border-color: ${props => getAccentColor(props.$theme)};

            > ${TabItemsWrapper} {
                > .tab-item {
                    &:not(.active) {
                        color: ${v.buttonPrimaryTextColor};
                        background-color: transparent;
                        border-color: transparent;

                        &:hover {
                            color: ${props => getAccentColor(props.$theme)};
                            border-color: ${props => getAccentColor(props.$theme)};
                            background-color: ${v.buttonPrimaryTextColor};
                            border-bottom-color: ${v.buttonPrimaryTextColor};
                            opacity: 0.7;
                        }
                    }
                }
            }
        }

        > ${TabContent} {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }

    &.boxed-content {
        > ${TabItems} {
            background-color: transparent;
            border-color: transparent;

            > ${TabItemsWrapper} {
                > .tab-item {
                    &:not(.active) {
                        color: ${v.textColor};
                        background-color: transparent;
                        border-color: transparent;

                        &:hover {
                            border-color: ${props => getAccentColor(props.$theme)};
                            background-color: ${v.buttonPrimaryTextColor};
                            border-bottom-color: ${v.buttonPrimaryTextColor};
                            color: ${props => getAccentColor(props.$theme)};
                            opacity: 0.7;
                        }
                    }
                }
            }
        }
    }

    &.boxed-tabs {
        > ${TabItems} {
            background-color: transparent;
            border-color: transparent;

            > ${TabItemsWrapper} {
                > .tab-item {
                    &:not(.active) {
                        color: ${v.textColor};
                        background-color: ${v.buttonPrimaryTextColor};
                        border-color: ${v.textColor};
                        border-bottom-color: ${props => getAccentColor(props.$theme)};
                        opacity: 0.7;

                        &:hover {
                            border-color: ${props => getAccentColor(props.$theme)};
                            color: ${props => getAccentColor(props.$theme)};
                        }
                    }
                }
            }
        }
    }

    &.plain {
        > ${TabItems} {
            background-color: transparent;
            border-color: transparent;

            > ${TabItemsWrapper} {
                > .tab-item {
                    background-color: transparent;
                    border-color: transparent;

                    &:not(.active) {
                        color: ${v.textColor};

                        &:hover {
                            color: ${props => getAccentColor(props.$theme)};
                            opacity: 0.7;
                        }
                    }
                }
            }
        }

        > ${TabContent} {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            background-color: inherit;
            border-color: transparent;
            border-top: 1px solid ${props => getAccentColor(props.$theme)};
        }
    }
`;

const roundPrecision = 0;
const shiftOffset = 3;

const Tabs: FC<TabItemProps> = (props) => {
    const {
        data,
        contentPadding,
        type = 'plain',
        moveSelectedOnScroll = false,
        activeItemColor,
        minContentHeight,
        onTabChange,
        rememberActiveTab,
        id,
        width,
        theme: props_theme
    } = props;

    const _theme = useAppSelector(getTheme) as ThemeProp;
    const theme = props_theme || _theme;

    const tabItemsWrapper = useRef<HTMLDivElement>(null);
    const resizeTimeoutRef = useRef<any>(null);

    const [tabOverflow, setTabOverflow] = useState<Record<string, boolean>>({
        left: false,
        right: false
    });

    const [selected, setSelected] = useState<string>(() => {
        if (isString(id, true) && rememberActiveTab) {
            const saved = getStoredSelection();
            const savedSelection = saved.filter((s: any) => s.id === id)[0];
            const thisSelection = data.filter((d: TabItemType) => {
                const name = snakeCase(inStringNumberToWords(d.name), '-');
                return name === savedSelection?.name;
            });
            if (thisSelection.length) return savedSelection.name;
        }
        return snakeCase(inStringNumberToWords(data[0].name), '-');
    });

    const [hoveredItem, setHoveredItem] = useState('');
    const [minWidth, setMinWidth] = useState<CSSUnit | 'auto'>('auto');

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
        sessionStorage.setItem('scroll-left', '0');

        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
        let maxWidth = 50;
        if (itemsWrapper) {
            Array.from(itemsWrapper.querySelectorAll('.tab-item')).forEach(t => {
                maxWidth = Math.max(maxWidth, t.getBoundingClientRect().width);
            });
        }

        setMinWidth(maxWidth + 42);

        updateTabOverflow();

        return () => {
            clearTimeout(resizeTimeoutRef.current);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('checkVisibility') === 'true') {
            sessionStorage.removeItem('checkVisibility');
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
            sessionStorage.setItem('tabS', JSON.stringify([...saved, {id, name: selected}]));
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
    };

    const hasHidden = (direction: 'left' | 'right', tabItemsPos: number[]) => getNext(direction, tabItemsPos) !== undefined;

    const scrollLeftHandler = () => {
        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
        const {lefts} = getTabItemsPos();
        const nextLeftScrollPos = getNext('left', lefts);

        if (nextLeftScrollPos !== undefined) {
            const tabLeft = Round(itemsWrapper.getBoundingClientRect()['left'] as number, roundPrecision);
            const storedScrollLeft = parseFloat(sessionStorage.getItem('scroll-left') || '0');

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
            const storedScrollLeft = parseFloat(sessionStorage.getItem('scroll-left') || '0');

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
        sessionStorage.setItem('checkVisibility', 'true');
        setSelected(name);
    };

    function updateTabOverflow() {
        const {lefts, rights} = getTabItemsPos();

        const itemsWrapper = tabItemsWrapper.current as HTMLDivElement;
        if (!itemsWrapper) return;

        sessionStorage.setItem('scroll-left', String(Round(itemsWrapper.scrollLeft, roundPrecision)));
        setTabOverflow({
            left: hasHidden('left', lefts),
            right: hasHidden('right', rights)
        });
    }

    function getStoredSelection() {
        const saved = sessionStorage.getItem('tabS');
        return saved ? JSON.parse(saved) : [];
    }

    const selectedTab = data.find((d: any) => snakeCase(inStringNumberToWords(d.name), '-') === selected);

    return <Container
        data-component={'tabs'}
        aria-label={'Tabs Component'}
        className={type}
        $minWidth={parseCSSUnit(minWidth as CSSUnit)}
        $width={width ? parseCSSUnit(width) : 'inherit'}
        $theme={theme}
    >
        <TabItems className={'disable-select'}>
            <ScrollBtn $theme={theme} className={classNames('btn-left', tabOverflow.left && 'visible')}>
                <ReactIcon size={21} icon={RxChevronLeft} onClick={scrollLeftHandler} />
            </ScrollBtn>
            <TabItemsWrapper $theme={theme} ref={tabItemsWrapper}>
                {
                    data.map((t, i) => {
                        const itemName = t.id || snakeCase(inStringNumberToWords(t.name), '-');
                        const isActive = selected === itemName;

                        return <div
                            key={`tab-item-${itemName}-${i}`}
                            data-index={i}
                            data-name={itemName}
                            onClick={tabItemClickHandler}
                            className={classNames('tab-item', isActive && 'active')}
                            onMouseEnter={() => setHoveredItem(itemName)}
                            onMouseLeave={() => setHoveredItem('')}
                            style={{
                                color: isActive || hoveredItem === itemName ? activeItemColor ? activeItemColor : '' : '',
                            }}>
                            {t.name}
                        </div>;
                    })
                }
            </TabItemsWrapper>
            <ScrollBtn $theme={theme} className={classNames('btn-right', tabOverflow.right && 'visible')}>
                <ReactIcon size={21} icon={RxChevronRight} onClick={scrollRightHandler} />
            </ScrollBtn>
        </TabItems>
        <TabContent
            key={`tab-content-${selectedTab?.name}`}
            data-name={selectedTab?.name}
            $theme={theme}
            $padding={contentPadding}
            $minHeight={minContentHeight}
            className={classNames('trim')}>
            {selectedTab?.content}
        </TabContent>
    </Container>;
};

export default memo(Tabs);