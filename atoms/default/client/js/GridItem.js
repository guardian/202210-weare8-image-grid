import gsap from "gsap/gsap-core";
import { Component, render, h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Expander from "./Expander";


const GridItem = (props) => {
    const expanderRef = useRef(null);

    const getTileBody = () => {
        switch (props.data.type) {
            case 'image':
                return (
                    <a ref={elRef} 
                    onMouseLeave={handleScaleDown}
                    onMouseOver={handleScaleUp} 
                    className="bg container" style={`background-image: linear-gradient(0deg, #0009, transparent 65%), url(<%= path %>/${props.data.bg})`} href="#">
                        <h2>{props.data.content}</h2>
                    </a>
                )
            case 'imageRight':
                return (
                    <a ref={elRef} 
                    onMouseLeave={handleScaleDown}
                    onMouseOver={handleScaleUp} 
                    className="bg container" href="#">
                        <div dangerouslySetInnerHTML={{__html: props.data.content}}></div>
                        <div style={`background-image: linear-gradient(0deg, #0009, transparent 65%), url(<%= path %>/${props.data.bg})`} >
                            <h2>{props.data.playerTitle}</h2>
                        </div>
                        
                    </a>
                )
            case 'imageLeft':
                return (
                    <a ref={elRef} 
                    onMouseLeave={handleScaleDown}
                    onMouseOver={handleScaleUp} 
                    className="bg container" href="#">
                        <div style={`background-image: linear-gradient(0deg, #0009, transparent 65%), url(<%= path %>/${props.data.bg})`} >
                            <h2>{props.data.playerTitle}</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: props.data.content}}></div>
                        
                    </a>
                )
            case 'audio':
                return (
                    <a className="container" href="#" dangerouslySetInnerHTML={{__html: props.data.content}}>
                    </a>
                )
        }
    }

    const elRef = useRef();
    const handleScaleUp = () => {
        gsap.to(elRef.current, {duration: 0.2, rotationZ: 0.001, scale: 1.02})
    }
    const handleScaleDown = () => {
        
        gsap.to(elRef.current, {duration: 0.2, rotationZ: 0.001, scale: 1})
    }

    return (
        <Fragment>
            <li className={`${props.className} tile-type-${props.data.type}`} {...props} 
            >
                {getTileBody()}
            </li>
            
            <Expander 
                className={"expander " + (props.expanded && 'active')}  
                ref={expanderRef} 
                expanded={props.expanded} 
                index={props.index} 
                toggleFn={props.toggleFn}
                data={props.data}
                >
                    Expanded {props.index + 1}
            </Expander>

        </Fragment>
    );
}


export default GridItem;