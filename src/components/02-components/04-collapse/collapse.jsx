import { useState, useRef, useEffect } from 'react';
import './collapse.scss';
import PropTypes from "prop-types"

export const Collapse = ({ dataParentid=null, ariaExpanded=true, ariaControls='region1', ...props }) => {

    const OPEN_CLASS = '-show'
    const TRANSITION_CLASS = '-transition';
    const TRANSITION_TIME = 250;

    const [open, setOpen] = useState(ariaExpanded);
    // const [transition, setTransition] = useState(false);

    const elref = useRef();
    useEffect( () => {
        // Anything in here is fired on component mount.
        console.log(elref)
        return () => {
            // Anything in here is fired on component unmount.
        }
    }, []);

    /**
     * Show
     */
    function show() {
        const collapseElement = (elref.current);

        setOpen(true);
        collapseElement.style.height = `${0}px`;
        console.log('showing', elref, collapseElement.offsetHeight, collapseElement.classList.contains(OPEN_CLASS) , collapseElement.scrollHeight, collapseElement.getBoundingClientRect().height);
        collapseElement.classList.add(TRANSITION_CLASS); //setTransition(true);
        collapseElement.style.height = `${collapseElement.scrollHeight}px`;

        // end transition
        setTimeout(() => {
            collapseElement.classList.remove(TRANSITION_CLASS); //setTransition(false);
            collapseElement.style.height = '';
        }, TRANSITION_TIME);
    }
    /**
     * Hide
     */
    function hide() {
        const collapseElement = (elref.current);

        console.log('hiding', elref, collapseElement.offsetHeight, collapseElement.scrollHeight, collapseElement.getBoundingClientRect().height);
        collapseElement.style.height = `${collapseElement.scrollHeight}px`;
        collapseElement.classList.add(TRANSITION_CLASS); //setTransition(true);
        collapseElement.style.height = `${0}px`;

        // end transition
        setTimeout(() => {
            collapseElement.classList.remove(TRANSITION_CLASS); //setTransition(false);
            setOpen(false);
            collapseElement.style.height = '';
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
            <div className='c-abaccordion'>
                <button type='button' className='c-collapse' 
                    aria-expanded={open === true ? 'true' : 'false'} 
                    aria-controls={ariaControls} onClick={()=>{setOpen(!open)}}> {/* onClick={toggle}*/}
                        <div className='c-collapse__inner'>
                            <span className='-title'>Terms of use</span>
                        </div>
                </button>
                {/* <Button {...(condition ? {bsStyle: 'success'} : {})} /> */}
                {/* data-parentid={dataParentid ? dataParentid : undefined} */}
                {/* {...(dataParentid && {'data-parentid': dataParentid})} */}
                {/* {className={open === true ? '-collapse -show' : '-collapse'}} */}
                {/* ${transition===true ? TRANSITION_CLASS : ''} */}
                <div ref={elref} id={ariaControls} className={ `-collapse ${open===true ? OPEN_CLASS : ''}` }   
                {...(dataParentid && {'data-parentid': dataParentid})}
                style={ open ? { height: `${elref.current.scrollHeight}px` } : { height: "0px" } }
                >
                    <div className='c-accordion__container'>
                        <p>Your access to and use of this site is subject to the following terms and conditions and all applicable laws. By accessing and using this site, you accept the following terms and conditions, without limitation or qualification.</p>
                    </div>
                </div>
            </div>
        </>       
    )
}

Collapse.propTypes = {
    dataParentid: PropTypes.string,
    ariaExpanded: PropTypes.bool,
    ariaControls: PropTypes.string,
}
