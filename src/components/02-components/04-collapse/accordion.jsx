import { useState } from "react";
import PropTypes from "prop-types";
import { data as sampledata } from "./data";
import { Collapse } from "./collapse";

export const Accordion = ({dataParentId=null, accData=sampledata, activeIndex_prop=0, ...props}) => {
    const [activeIndex, setActiveIndex] = useState(activeIndex_prop);

    const handleItemClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
            <div id={dataParentId ? dataParentId : ''}>
                {
                 accData.map((item, index) => {
                    return <Collapse
                        dataParentid={dataParentId}
                        ariaExpanded={activeIndex === index}
                        ariaControls={`acc-${index}`}
                        key={index}
                        title={item.title}
                        content={item.content}
                        btnClick={() => handleItemClick(index)}
                    />
                 })
                }
            </div>
        </>
    )
}

Accordion.propTypes = {
    dataParentid: PropTypes.string,
    accData: PropTypes.array,
    activeIndex_prop: PropTypes.number
}