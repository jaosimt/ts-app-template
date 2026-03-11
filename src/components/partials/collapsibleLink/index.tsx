import { FC, useState } from 'react';
import { classNames } from '../../../utils';

export interface CollapsibleLinkProps {
    linkText: string;
    details: any;
    detailsClassName?: string;
}

const CollapsibleLink:FC<CollapsibleLinkProps> = ({linkText, details, detailsClassName}) => {
    const [show, setShow] = useState(false);

    return <span className={'display-flex flex-direction-column trim'}>
        <b className={'link'} onClick={() => setShow(!show)}>{linkText}</b>
        {show && <pre className={classNames(detailsClassName, 'm-0 mt-0p1', 'overflow-auto', 'color-gray', 'font-size-x-small')}>{details}</pre>}
    </span>
}

export default CollapsibleLink;