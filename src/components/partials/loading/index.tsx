import { FC, HTMLAttributes } from 'react';
import { ImSpinner } from 'react-icons/im';
import styled from 'styled-components';
import { CSSColors } from '../../../types';
import { classNames } from '../../../utils';
import ReactIcon from '../index';

type CSSUnit = number | `${number}${string}`;
const parseCSSUnit = (cssUnit: CSSUnit): CSSUnit => String(cssUnit).match(/\d$/) ? `${parseFloat(String(cssUnit))}px` : cssUnit as CSSUnit;

const Loading = styled.div<{
    $position: 'fixed' | 'absolute';
    $borderColor?: CSSColors;
    $borderWidth?: CSSUnit;
    $padding: boolean;
}>`
    left            : 50%;
    position        : ${props => props.$position};
    top             : 50%;
    transform       : translate(-50%, -50%);
    border-radius   : 0.5rem;
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;
    line-height     : 1;
    ${props => (props.$borderWidth || props.$borderColor) && `border: ${parseCSSUnit(props.$borderWidth || 1)} solid ${props.$borderColor || 'whitesmoke'};`}
    ${props => props.$padding && 'padding: 1.5rem 3rem;'}
`;

const Spinner = styled.div<{ $color: CSSColors; }>`
    color : ${props => props.$color};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
    borderWidth?: number;
    borderColor?: CSSColors;
    padding?: boolean;
    position?: 'fixed' | 'absolute';
    size?: number;
    color?: CSSColors,
    topText?: string;
    bottomText?: string;
    backShadow?: boolean;
}

const Loader: FC<LoaderProps> = (props) => {
    const {
        borderWidth,
        borderColor,
        padding = true,
        backShadow = false,
        position,
        size = 42,
        color = 'inherit',
        topText,
        bottomText,
        children
    } = props;

    return <Loading
        className={classNames(backShadow && 'box-shadow')}
        $position={position || 'fixed'}
        $borderColor={borderColor}
        $borderWidth={borderWidth}
        $padding={padding}
    >
        <Spinner $color={color}>
            {topText && <h4 className={'m-0'}>{topText}</h4>}
            <ReactIcon className={classNames('spin-3', topText && 'mt-1', bottomText && 'mb-1')} size={size} icon={ImSpinner}/>
            {bottomText && <h6 className={'m-0'}>{bottomText}</h6>}
        </Spinner>
        {
            children && <>
                <br/>
                {children}
            </>
        }
    </Loading>;
};

export default Loader;