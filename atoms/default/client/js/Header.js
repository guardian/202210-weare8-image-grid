import { Component, render, h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useSelector } from "react-redux";

import SocialBar from 'shared/js/SocialShare';

const Header  = (props) => {

    const data = useSelector(state=>state.global ? state.global : {headline:'',standfirst:'',shareUrl:"", shareTitle:"", logoLink:"#"});

    const shareUrl = location.href;

    return (
        <Fragment>
        <div className ="hero" style="background-image: url(<%= path %>/header.jpg);" alt="" />
            <div className="max-container">
                <div className="header">
                    <header>
                        <h1>{data.headline}</h1>
                        <div dangerouslySetInnerHTML={{__html:data.standfirst}}></div>
                        <div dangerouslySetInnerHTML={{__html:data.intro}}></div>
                    </header>
                    <div className='client'>
                        <p>Paid for by</p>
                        <a href={data.logoLink} target="_blank" title="Dairy Australia"><img src="<%= path %>/brand_logo.png" width="120" alt="" /></a>
                        <SocialBar url={shareUrl} title={data.shareTitle} />
                    </div>
            </div>
            <div className="hr"></div>
        </div>
    </Fragment>
    )
}

export default Header;