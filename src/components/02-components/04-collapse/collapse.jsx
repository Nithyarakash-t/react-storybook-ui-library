import React, {useState, useRef} from 'react';
import './collapse.scss';

export const Collapse = ({ dataParentid=null, ariaExpanded=true, ariaControls='region1', ...props }) => {

    const OPEN_CLASS = '-show'
    const TRANSITION_CLASS = '-transition';
    const TRANSITION_TIME = 250;

    const [open, setOpen] = useState(ariaExpanded);
    const [transition, setTransition] = useState(false);

    /**
     * Show
     */
    function show() {
        console.log('showing')
        setTransition(true);

        setTimeout(() => {
            setTransition(false);
            setOpen(true);
        }, TRANSITION_TIME);
    }
    /**
     * Hide
     */
    function hide() {
        console.log('hiding');
        setTransition(true);

        setTimeout(() => {
            setTransition(false);
            setOpen(false);
        }, TRANSITION_TIME);
    }
    /**
     * Toggle
     */
    function toggle() {
        if (open) {
            hide();
        } else {
            show();
        }
    }
    return (
        <>
            <div className='c-accordion'>
                <button type='button' className='c-collapse' 
                    aria-expanded={open === true ? 'true' : 'false'} 
                    aria-controls={ariaControls} onClick={toggle}>
                        <div className='c-collapse__inner'>
                            <span className='-title'>Terms of use</span>
                        </div>
                </button>
                {/* <Button {...(condition ? {bsStyle: 'success'} : {})} /> */}
                {/* data-parentid={dataParentid ? dataParentid : undefined} */}
                {/* {...(dataParentid && {'data-parentid': dataParentid})} */}
                {/* {className={open === true ? '-collapse -show' : '-collapse'}} */}
                <div id={ariaControls} className={ `-collapse ${open===true ? OPEN_CLASS : ''} ${transition===true ? TRANSITION_CLASS : ''}` }  {...(dataParentid && {'data-parentid': dataParentid})}>
                    <div className='c-accordion__container'>
                        <p>Your access to and use of this site is subject to the following terms and conditions and all applicable laws. By accessing and using this site, you accept the following terms and conditions, without limitation or qualification.</p>
                    </div>
                </div>
            </div>
        </>       
    )
}