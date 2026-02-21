import { BoxProps } from '../../../interafaces';
import { CSSUnit } from '../../../types';
import { classNames } from '../../../utils';
import './styles.scss';

export const Box = (props: BoxProps) => {
    const {children, title, className, boxClassName, borderRadius = 0, width, borderColor, titleColor} = props;

    let titleBorderRadius: number | CSSUnit = borderRadius;
    if (borderRadius !== 0) {
        const brSplit = [parseFloat(titleBorderRadius.toString()), titleBorderRadius.toString().replace(/\d*/, '')];
        titleBorderRadius = parseCSSUnit(`${brSplit[0] as number / 2}${brSplit[1]}`);
    }

    function parseCSSUnit(cssUnit: string): CSSUnit {
        return cssUnit.match(/\d$/) ? `${Math.ceil(parseFloat(cssUnit))}px` : cssUnit as CSSUnit;
    }

    return <section
        data-component={'box'}
        className={classNames('p-0p5', boxClassName, 'border', title && 'mt-0p5')}
        style={{borderRadius: parseCSSUnit(String(borderRadius)), width, borderColor}}
    >
        {title && <h6 className={'title m-0 background border'} style={{borderRadius: titleBorderRadius, borderColor, color: titleColor}}>{title}</h6>}
        <div className={classNames(className, title && 'mt-0p5')}>{children}</div>
    </section>;
};