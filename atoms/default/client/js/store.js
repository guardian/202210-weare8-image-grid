const { createStore } = require("redux");

let initial = {
    dataLoaded: false
}

const rootReducer = (state = initial, action) => {
    if (action.type === 'INIT') {
        const data = {...action.payload, dataLoaded: true};
        action.payload.global.forEach(v => {
            data.global[v.key] = ' TRUE FALSE'.indexOf(v.content) > 0 ? 
                                (v.content === 'TRUE' ? true : false)
                                : v.content;
        });
        console.log(data)
        return data;
    }
    return state;
}

const url = 'https://interactive.guim.co.uk/docsdata/1z9X5nQRdR2-0s4yK16YwTsvEGQqQ0MrLDaYIOUa9WYI.json';

// export default fetch(`${url}?t=${new Date().getTime()}`)
// .then(resp=> resp.json())
// .then(data=> {
//     initial = data;
//     return createStore( rootReducer );
// })
// // .then(setTimeout(this.intro, 2000))
// // .then(this.intro)
// .catch(err => {
//     console.log(err);
//     return createStore( rootReducer );
// });
const store = createStore( rootReducer );

fetch(`${url}?t=${new Date().getTime()}`)
.then(resp=> resp.json())
.then(data=> {
    // initial = data.sheets;
    console.log("store resolved", data.sheets);
    store.dispatch({type:"INIT", payload: data.sheets});
})
// .then(setTimeout(this.intro, 2000))
// .then(this.intro)
.catch(err => {
    console.log(err);
    // return {};
});

export default store;