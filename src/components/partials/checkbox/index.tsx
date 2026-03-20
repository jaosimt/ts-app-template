import { FC, InputHTMLAttributes, memo, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSUnit } from '../../../constants/types';
import { getTheme } from '../../../slices/theme';
import { RootState } from '../../../store';
import { getRandStr, parseCSSUnit } from '../../../utils';
import { getButtonPrimaryColor, getLightShadow } from '../../../utils/themeUtils';
import v from '../../../styles/variables.module.scss';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string | undefined;
    checked: boolean | undefined;
    label?: string;
    labelWidth?: CSSUnit;
    disabled?: boolean;
    className?: string;
    labelPosition?: 'left' | 'right';
    theme?: ThemeProp;
}

const CheckboxContainer = styled.div<{
    $disabled: boolean,
    $theme: ThemeProp | undefined,
}>`
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    border: 1px solid ${props => getButtonPrimaryColor(props.$theme as ThemeProp)};
    border-radius: ${v.inputBorderRadius};
    box-shadow: ${props => `0 0 7px ${getLightShadow(props.$theme as ThemeProp)}`};
    
    ${props => props.$disabled && 'opacity: 0.3; pointer-events: none;'}
`;

const Container = styled.label<{
    $disabled: boolean
}>`
    display: flex;
    gap: ${parseCSSUnit(v.labelPadding as CSSUnit)} 0;
    flex-wrap: wrap;
    align-items: center;
    cursor: ${props => props.$disabled ? 'default' : 'pointer'};
    user-select: none;
    width: fit-content;
    min-height: ${v.inputHeight};
   
    &:hover {
        > ${CheckboxContainer} {
            ${props => !props.$disabled && 'opacity: 0.7'};
        }
    }

    &[disabled=true] {
        > div { opacity: 0.3; }
    }

    @media (max-width: 768px) {
        font-size: small;
        min-height: ${v.inputHeightSmall};
    }
`;

const Icon = styled.svg`
    fill: none;
    stroke: #fff;
    stroke-width: 2px;
`;

// noinspection CssUnknownProperty
const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<{
    $checked: boolean | undefined,
    $disabled: boolean,
    $theme: ThemeProp,
}>`
    display: inline-block;
    width: 21px;
    height: 21px;
    background-color: ${props => props.$checked ? getButtonPrimaryColor(props.$theme) : 'white'};
    transition: all 150ms;

    ${Icon} {
        visibility: ${props => (props.$checked ? 'visible' : 'hidden')}
    }
`;

const Label = styled.span<{
    $width: CSSUnit | undefined,
    $position: 'left' | 'right' | undefined,
}>`
    line-height: 1.2;
    min-width: fit-content;
    ${props => {
        let styles;
        switch (props.$position) {
            case 'left':
                styles = `padding-right: ${parseCSSUnit(v.labelPadding as CSSUnit)};`;
                break;
            default:
                styles = `padding-left: ${parseCSSUnit(v.labelPadding as CSSUnit)};`;
        }

        styles += `width: ${parseCSSUnit(props.$width as CSSUnit)};`;

        return styles;
    }};

    @media (max-width: 768px) {
        ${props => {
            switch (props.$position) {
                case 'left':
                    return `padding-right: ${parseCSSUnit(v.labelPadding as CSSUnit)};`;
                default:
                    return `padding-left: ${parseCSSUnit(v.labelPadding as CSSUnit)};`;
            }
        }};
    }
`;

const Checkbox: FC<CheckboxProps> = (props) => {
    const {
        disabled = false,
        label,
        labelWidth,
        name,
        className,
        checked,
        labelPosition,
        onChange,
        theme
    } = props;

    const idRef = useRef<string>(getRandStr(21));

    return <Container data-component={'checkbox'} htmlFor={`i-${idRef.current}`} $disabled={disabled}
                      className={className}>
        {label && labelPosition !== 'right' && <Label $width={labelWidth} $position={'left'}>{label}</Label>}
        <CheckboxContainer $theme={theme} className={'checkbox-container'} $disabled={disabled}>
            <HiddenCheckbox id={`i-${idRef.current}`} disabled={disabled} name={name} checked={checked}
                            onChange={onChange}/>
            <StyledCheckbox $theme={theme as ThemeProp} $disabled={disabled} $checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
        {label && labelPosition === 'right' && <Label $width={labelWidth} $position={labelPosition}>{label}</Label>}
    </Container>;
};

const mapStateToProps = (state: RootState) => ({
    theme: getTheme(state),
});

export default connect(mapStateToProps)(memo(Checkbox));