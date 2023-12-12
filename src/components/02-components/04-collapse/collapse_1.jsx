import {useRef, useEffect} from 'react';
import { Collapse as Collapse_class } from '../../../assets/scripts/components/layout/accordion';
import './collapse.scss';

export const Collapse = ({ dataParentid=null, ariaExpanded=true, ariaControls='region1', ...props }) => {

    const elref = useRef(null);

    useEffect( () => {
        // Anything in here is fired on component mount.
        const class_ref = Collapse_class.initInterface(elref.current);

        return () => {
            // Anything in here is fired on component unmount.
            class_ref._destroy();
        }
    }, []);

    return (
        <>
            <div className='c-accordion'>
                <button type='button' className='c-collapse' 
                    aria-expanded={ariaExpanded === true ? 'true' : 'false'} 
                    aria-controls={ariaControls} ref={elref}>
                        <div className='c-collapse__inner'>
                            <span className='-title'>Terms of use</span>
                        </div>
                </button>
                <div id={ariaControls} className={ `-collapse ${ariaExpanded===true ? '-show' : ''}` }  {...(dataParentid && {'data-parentid': dataParentid})}>
                    <div className='c-accordion__container'>
                        <p>Your access to and use of this site is subject to the following terms and conditions and all applicable laws. By accessing and using this site, you accept the following terms and conditions, without limitation or qualification.</p>
                    </div>
                </div>
            </div>
        </>       
    )
}