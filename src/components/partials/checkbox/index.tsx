import { FC, InputHTMLAttributes, memo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Theme } from '../../../constants';
import { ThemeProp } from '../../../constants/interfaces';
import { CSSUnit } from '../../../constants/types';
import { getTheme } from '../../../slices/theme';
import { RootState } from '../../../store';
import { parseCSSUnit } from '../../../utils';
import v from '../../../styles/variables.module.scss';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string|undefined;
    checked: boolean|undefined;
    label?: string;
    labelWidth?: CSSUnit;
    disabled?: boolean;
    className?: string;
    labelPosition?: 'left' | 'right';
    theme?: ThemeProp;
}

const CheckboxContainer = styled.div<{disabled: boolean}>`
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    height: 33px;
    
    @media (max-width: 768px) {
        height: 28px;
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

const Label = styled.label<{disabled: boolean}>`
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    user-select: none;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    
    &:hover {
        > ${CheckboxContainer} {
            ${props => !props.disabled && 'opacity: 0.7'};   
        }
    }
    
    &[disabled] {
        > div { opacity: 0.3; }
    }

    @media (max-width: 768px) {
        font-size: small;
    }
`;

const StyledCheckbox = styled.div<{
    $checked: boolean | undefined,
    $disabled: boolean,
    $theme: ThemeProp,
}>`
    display: inline-block;
    width: 21px;
    height: 21px;
    border-radius: 4px;
    border: 1px solid ${props => props.$theme === Theme.DARK ? v.buttonPrimaryColorDark : v.buttonPrimaryColor};
    background-color: ${props => props.$checked ? props.$theme === Theme.DARK ? v.buttonPrimaryColorDark : v.buttonPrimaryColor : 'white'};
    transition: all 150ms;
    
    ${Icon} {
        visibility: ${props => (props.$checked ? 'visible' : 'hidden')}
    }
    
    ${props => props.$disabled && 'opacity: 0.7; pointer-events: none;'}
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

    return <Label disabled={disabled}>
        {label && labelPosition === 'left' && <span style={{minWidth: 'fit-content', width: parseCSSUnit(labelWidth as CSSUnit), marginRight: '0.3rem'}}>{label}</span>}
        <CheckboxContainer disabled={disabled} className={className}>
            <HiddenCheckbox disabled={disabled} name={name} checked={checked} onChange={onChange}/>
            <StyledCheckbox $theme={theme as ThemeProp} $disabled={disabled} $checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
        {label && labelPosition !== 'left' && <span style={{width: parseCSSUnit(labelWidth as CSSUnit), marginLeft: '0.3rem'}}>{label}</span>}
    </Label>
}

const mapStateToProps = (state: RootState) => ({
    theme: getTheme(state),
});

export default connect(mapStateToProps)(memo(Checkbox));