import React from 'react';
import './collapse.scss';

export const Collapse = ({ dataParentid=null, ariaExpanded=true, ariaControls='region1', ...props }) => {
    return (
        <>
            <div class='c-accordion'>
                <button type='button' class='c-collapse' 
                    aria-expanded={ariaExpanded === true ? 'true' : 'false'} 
                    aria-controls={ariaControls}>
                        <div class='c-collapse__inner'>
                            <span class='-title'>Terms of use</span>
                        </div>
                </button>
                {/* <Button {...(condition ? {bsStyle: 'success'} : {})} /> */}
                {/* data-parentid={dataParentid ? dataParentid : undefined} */}
                {/* {...(dataParentid && {'data-parentid': dataParentid})} */}
                <div id={ariaControls} class={ariaExpanded === true ? '-collapse -show' : '-collapse'} {...(dataParentid && {'data-parentid': dataParentid})}>
                    <div class='c-accordion__container'>
                        <p>Your access to and use of this site is subject to the following terms and conditions and all applicable laws. By accessing and using this site, you accept the following terms and conditions, without limitation or qualification.</p>
                        <p>The information provided on this site is free of charge and for informational purposes and internal use only. Unless otherwise stated, the contents of this site including, but not limited to, the text and images contained herein and their arrangement are the property of Accenture. All trademarks used or referred to in this website are the property of their respective owners.</p>
                        <p>Nothing contained in this site shall be construed as conferring by implication, estoppel, or otherwise, any license or right to any copyright, patent, trademark or other proprietary interest of Accenture or any third party. This site and the content provided in this site, including, but not limited to, graphic images, audio, video, html code, buttons, and text, may not be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way, without the prior written consent of Accenture, except that you may download, display, and print one copy of the materials on any single computer solely for your personal, non-commercial use, provided that you do not modify the material in any way and you keep intact all copyright, trademark, and other proprietary notices.Links on this site may lead to services or sites not operated by Accenture. No judgment or warranty is made with respect to such other services or sites and Accenture takes no responsibility for such other sites or services. A link to another site or service is not an endorsement of that site or service. Any use you make of the information provided on this site, or any site or service linked to by this site, is at your own risk.</p>
                        <p>This site and its contents are provided “as is” and Accenture makes no representation or warranty of any kind with respect to this site or any site or service accessible through this site. Accenture expressly disclaims all express and implied warranties including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. In no event will Accenture be liable to any party for any direct, indirect, incidental, special, exemplary, consequential, or other damages (including, but not limited to, lost profits, business interruption, loss of programs or data) without regard to the form of action and whether in contract,tort, negligence, strict liability, or otherwise, arising out of or in connection with this site, any content on or accessed through this site or any site service linked to, or any copying, displaying, or use thereof.</p>
                        <p>You are responsible for complying with the laws of the jurisdiction from which you are accessing this site and you agree that you will not access or use the information on this site in violation of such laws. Unless expressly stated otherwise herein, any information submitted by you through this site shall be deemed non-confidential and non-proprietary. You represent that you have the lawful right to submit such information and agree that you will not submit any information unless you are legally entitled to do so. Because of the open nature of the Internet, we recommend that you not submit information you consider confidential. </p>
                    </div>
                </div>
            </div>
        </>       
    )
}