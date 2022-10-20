import gsap from "gsap/gsap-core";
import { Sine, Back } from "gsap/gsap-core";
import { Component, render, h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import AudioPlayer from "/shared/js/AudioPlayer";


const Expander = (props) => {

    const [expanderHeight, setExpanderHeight] = useState();
    const expanderRef = useRef(null);
    const closeRef = useRef(null);

    useEffect(()=>{
        // set initial state
        gsap.set(expanderRef.current,{height: '0%', autoAlpha: 0, scale: .8});
        gsap.set(closeRef.current,{autoAlpha: 0, scale: 0});
    },[]);

    useEffect(()=>{
        // expand/collapse animation
        if (props.expanded) {
            gsap.to(expanderRef.current,{duration: 0.8, autoAlpha: 1, scale: 1, height: 'auto', ease: Sine.easeInOut});
            gsap.to(closeRef.current,{duration: 0.4, autoAlpha: 1, scale: 1, ease: Back.easeOut, delay: 0.7});
        } else {
            gsap.to(expanderRef.current,{duration: 1, autoAlpha: 0, scale: 0.8, height: 0, ease: Sine.easeInOut});
            gsap.to(closeRef.current,{duration: 0.4, autoAlpha: 0, scale: 0, ease: Back.easeIn});
        }
    },[props.expanded]);

    useEffect(()=>{
        //  stop audio on collapse
        if (!props.expanded) {
            setStopPlay(stopPlay+1);
        }
    },[props.expanded])

    const [stopPlay, setStopPlay] = useState(0);

    const handleClose = (e) => {
        e.preventDefault();
        props.toggleFn(props.index)
    }

    const handleFocus = () => {
        gsap.to(closeRef.current,{duration: 0.3, scale: 1.1, ease: Back.easeOut});
    }
    const handleBlur = () => {
        gsap.to(closeRef.current,{duration: 0.3, scale: 1, ease: Back.easeOut});
    }

    return (
        <div {...props} ref={expanderRef}>
            <a href="#" 
                className="close" 
                onMouseLeave={handleBlur} 
                onMouseOver={handleFocus} 
                onClick={handleClose} 
                ref={closeRef}
                ariaLabel="close panel"
                ariaRole="button"
                ></a>
            {props.data.type.indexOf('image') >= 0 && props.data.audio == '' &&
            <div className="container" dangerouslySetInnerHTML={{__html: props.data.expander}}>
                
            </div>
            }
            {props.data.type.indexOf('image') >= 0 && props.data.audio != '' &&
            <div className="container flex-col align-center">
                <AudioPlayer stopPlay={stopPlay} src={`<%= path %>/${props.data.audio}.mp3`} />
                <div className="pt-4" dangerouslySetInnerHTML={{__html: props.data.expander}} />
                
            </div>
            }
            {props.data.type === 'audio' && 
            <div className="container d-flex d-center">
                <AudioPlayer stopPlay={stopPlay} title={props.data.playerTitle} src={`<%= path %>/${props.data.audio}.mp3`} subs={`<%= path %>/${props.data.audio}.vtt`} />
            </div>
            }
        </div>
    );
}


export default Expander;