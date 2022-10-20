import { Component, render, h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useSelector } from "react-redux";


const Footer  = (props) => {


    const data = useSelector(state=>state.global ? state.global : {footer:''});

    return (
        <Fragment>
            
            <div className="max-container container footer ">
                <p>&nbsp;</p>
                <div>
                    <div className="hr"></div>
                    <div className="footer-content" dangerouslySetInnerHTML={{__html: data.cta}}></div>
                </div>

            
            </div>
        </Fragment>
    )
}

export default Footer;