import styled from 'styled-components';

const CheckboxContainer = styled.div`
    display: inline-flex;
    align-items: center;
    height: 33px;
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
    checked: boolean | undefined
}>`
    display: inline-block;
    width: 21px;
    height: 21px;
    border-radius: 4px;
    border: 1px solid rgb(0, 123, 255);
    background-color: ${props => props.checked ? 'rgba(0, 123, 255, 0.63)' : 'transparent'};
    transition: all 150ms;
    
    ${Icon} {
        visibility: ${props => (props.checked ? 'visible' : 'hidden')}
    }
`;

const Label = styled.label`
    cursor: pointer;
    user-select: none;
    display: inline-flex;
    align-items: center;
    
    & + * {
        margin-left: 0.5rem;
    }

    &:hover {
        > ${CheckboxContainer} {
            opacity: 0.7;   
        }
    }
`;

const Checkbox = ({label, name, className, checked, onChange, ...props}: {
    label?: string,
    name: string,
    className?: string,
    checked: boolean | undefined,
    onChange?: any
}) => (
    <Label>
        <CheckboxContainer className={className}>
            <HiddenCheckbox name={name} checked={checked} onChange={onChange} {...props} />
            <StyledCheckbox checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
        <span style={{marginLeft: '0.3rem'}}>{label || name}</span>
    </Label>
);

export default Checkbox;