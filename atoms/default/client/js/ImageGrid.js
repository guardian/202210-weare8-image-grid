// import "./../../css/image_grid.scss";

import gsap from "gsap/gsap-core";
import { Sine } from "gsap/gsap-core";
import { Component, render, h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useSelector } from "react-redux";
import RelatedContent from "../../../../shared/js/RelatedContent";
import Footer from "./Footer";

import GridItem from "./GridItem";

import Header from "./Header";

const ImageGrid  = (props) => {



    const handleTileExpand = (index) => {
        expandState[index] = !expandState[index];
        if (currentExpanded !== null && currentExpanded != index) expandState[currentExpanded] = 0;
        setCurrentExpanded(index);
        setExpandState(expandState.slice());
    }

    const [expandState, setExpandState] = useState( new Array(10).fill(0,0,10));
    const [currentExpanded, setCurrentExpanded] = useState(null);

    const cards = useSelector(state => {
        // console.log(state, state.cards);
        return state.cards || [];
    });
    const related = useSelector(state => {
        // console.log(state, state.cards);
        return state.related || [];
    });

    const dataLoaded = useSelector(s=>s.dataLoaded);

    const globalData = useSelector(s=> s.dataLoaded ? s.global : {related:""});
    
    useEffect(()=>{
        
        if (dataLoaded) {
            gsap.to('#root', {autoAlpha: 1, ease: Sine.easeOut, delay: 1});
            // gsap.from('.hero',{scale: 2, delay: 1})
            gsap.from('.grid-container li', {alpha: 0, y: "50", stagger: 0.1, ease: Sine.easeOut, delay: 1.3});
        }
    },[dataLoaded]);

    const gridItems = cards.map((card, i)=> {

        for (let prop in card) {
            if (card[prop] !== '' && 'FALSE TRUE'.indexOf(card[prop]) >= 0) {
                card[prop] = card[prop] === 'FALSE' ? false : true;
            } 
        }

        const content = card.content !== '' ? card.content : `Grid item ${i}`;
        const classNames = [
            'grid-item',
            card.classes,
            card.type
        ];
        if (card.expandable) classNames.push('expandable');
        if (expandState[i]) classNames.push('active');

        return <GridItem className={classNames.join(' ')} key={i} index={i} onClick={ card.expandable? (e) => {e.preventDefault();handleTileExpand(i)} : false} expanded={expandState[i]} toggleFn={handleTileExpand} data={card}>{content}</GridItem>;
    });

    return (
        <Fragment>
            <Header />
        
            <div className="grid" >
                <ul className="grid-container">
                    {gridItems}
                </ul>
            </div>
            
            <Footer />

            <div id="Footer" className="container max-container">
                <div dangerouslySetInnerHTML={{__html: globalData.related}}></div>
            <RelatedContent cards={related} />

            </div>
        </Fragment>
    )
}

export default ImageGrid;