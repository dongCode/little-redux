import { createStore } from "./index.js";

let addAction = {
    type: 'add',
    num: 1
}
let reducer = (state, action) => {
    switch(action.type) {
        case 'add':
            return state + action.num
        default:
            return 0 
    }
}
let redux = createStore(reducer)

let state = redux.getState()

console.log(state) // 0

const unsubscribe = redux.subscribe(() => {
    console.log('subscribe', redux.getState())
})

redux.dispatch(addAction)

unsubscribe()

redux.dispatch(addAction)

console.log(redux.getState())