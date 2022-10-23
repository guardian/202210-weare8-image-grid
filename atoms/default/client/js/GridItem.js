import gsap from "gsap/gsap-core";
import { Component, render, h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Expander from "./Expander";
import { IconSound, IconText, IconVideo } from "./icons";


const GridItem = (props) => {
    const expanderRef = useRef(null);

    const getIcon = () => {
        if (props.data.audio) {
            return <IconSound />;
        } else if (props.data.video) {
            return <IconVideo />;
        } else {
            return <IconText />
        }
    }
    const getTileBody = () => {
        switch (props.data.type) {
            case 'image':
                return (
                    <a ref={elRef} 
                    onMouseLeave={handleScaleDown}
                    onMouseOver={handleScaleUp} 
                    className="bg container" style={`background-image: linear-gradient(0deg, #0009, transparent 65%), url(<%= path %>/${props.data.bg})`} href="#">
                        <div>
                            <h2>{props.data.content} {getIcon()}</h2>
                        </div>
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
                            <div>
                                <h2>{props.data.playerTitle} {getIcon()}</h2>
                            </div>                            
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
                            <div>
                                <h2>{props.data.playerTitle} {getIcon()}</h2>
                            </div>
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
            <li className={`${props.className} 
                tile-type-${props.data.type}
                ${(!props.data.audio && !props.data.video)? 'text-only' :'has-media'}
                `} {...props} 
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