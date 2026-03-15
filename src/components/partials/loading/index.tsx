import { FC, HTMLAttributes, memo } from 'react';
import { ImSpinner } from 'react-icons/im';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSColors } from '../../../constants/types';
import { getTheme } from '../../../slices/theme';
import { RootState } from '../../../store';
import { $accentColor, $accentColorDark } from '../../../styles/variables';
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
    const themed = props.theme ? props.theme === Theme.DARK ? $accentColorDark : $accentColor : undefined;
    const {
        borderWidth = undefined,
        padding = themed !== undefined,
        boxShadow = false,
        position = 'fixed',
        size = 42,
        borderColor = themed as CSSColors,
        color = themed as CSSColors,
        topText,
        bottomText,
        children,
        backgroundColor = 'transparent'
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
            {topText && <h4 style={{margin: 0, textAlign: 'center'}}>{topText}</h4>}
            <ReactIcon style={{marginTop: topText ? '1rem' : 0, marginBottom: bottomText ? '1rem' : 0}}
                       className={'spin-3'} size={size} icon={ImSpinner}/>
            {bottomText && <h6 style={{margin: 0, textAlign: 'center'}}>{bottomText}</h6>}
        </Spinner>
        {
            children && <>
                <br/>
                {children}
            </>
        }
    </Container>;
};

const mapStateToProps = (state: RootState) => ({
    theme: getTheme(state)
})

export default connect(mapStateToProps)(memo(Loading));