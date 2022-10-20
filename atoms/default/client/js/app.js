// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import {gsap, Sine} from "gsap";


import Grid from "./ImageGrid";
import { Provider } from "react-redux";
import store from "./store";

const g = gsap;
const tmp = Sine;

render( 
    <Provider store={store} >
    <Grid />
    </Provider>
, document.getElementById('root'));
