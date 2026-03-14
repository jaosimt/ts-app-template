import { FC, HTMLAttributes, memo } from 'react';
import { ImSpinner } from 'react-icons/im';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThemeProp } from '../../../App';
import { $accentColor, $accentColorDark } from '../../../styles/variables';
import { CSSColors } from '../../../types';
import { classNames } from '../../../utils';
import { ReactIcon } from '../index';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
    borderWidth?: CSSUnit;
    borderColor?: CSSColors;
    backgroundColor?: CSSColors;
    padding?: boolean;
    position?: 'fixed' | 'absolute';
    size?: number;
    color?: CSSColors,
    topText?: string;
    bottomText?: string;
    boxShadow?: boolean
    theme?: ThemeProp;
}

type CSSUnit = number | `${number}${string}`;

const parseCSSUnit = (cssUnit: CSSUnit): CSSUnit => String(cssUnit).match(/\d$/) ? `${parseFloat(String(cssUnit))}px` : cssUnit as CSSUnit;

const Container = styled.div<{
    $position: 'fixed' | 'absolute';
    $borderColor?: CSSColors;
    $backgroundColor?: CSSColors;
    $borderWidth?: CSSUnit;
    $padding: boolean;
}>`
    transition: all 0.3s ease-in-out;
    z-index: 7;
    left: 50%;
    position: ${props => props.$position};
    background-color: ${props => props.$backgroundColor || 'white'};
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1;
    ${props => (props.$borderWidth || props.$borderColor) && `border: ${parseCSSUnit(props.$borderWidth || 1)} solid ${props.$borderColor || 'whitesmoke'};`}
    ${props => props.$padding && 'padding: 1.5rem 3rem;'}
`;

const Spinner = styled.div<{ $color: CSSColors }>`
    color: ${props => props.$color};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Loading: FC<LoadingProps> = (props) => {
    const {
        borderWidth,
        padding = true,
        boxShadow = false,
        position = 'fixed',
        size = 42,
        borderColor = props.theme === ('dark' as any) ? $accentColorDark : $accentColor,
        color = props.theme === ('dark' as any) ? $accentColorDark : $accentColor,
        topText,
        bottomText,
        children,
        backgroundColor
    } = props;

    return <Container
        $backgroundColor={backgroundColor}
        className={classNames(boxShadow && 'box-shadow')}
        $position={position}
        $borderColor={borderColor}
        $borderWidth={parseCSSUnit(borderWidth as any)}
        $padding={padding}
    >
        <Spinner $color={color}>
            {topText && <h4 className={'m-0 text-align-center'}>{topText}</h4>}
            <ReactIcon className={classNames('spin-3', topText && 'mt-1', bottomText && 'mb-1')} size={size}
                       icon={ImSpinner}/>
            {bottomText && <h6 className={'m-0 text-align-center'}>{bottomText}</h6>}
        </Spinner>
        {
            children && <>
                <br/>
                {children}
            </>
        }
    </Container>;
};

const mapStateToProps = (state: any) => ({
    theme: state.theme,
})

export default connect(mapStateToProps)(memo(Loading));