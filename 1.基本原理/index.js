
// preloadedState 
export const createStore = (reducer) => {
    let state
    let listeners = []
    const getState = () => {
        return state
    }
    const subscribe = (fn) => {
        listeners.push(fn)
        return () => {
            // listeners = listeners.filter(i => i !== fn)
            const index = listeners.indexOf(fn)
            listeners.splice(index, 1)
        }
    }
    const  dispatch = (action) => {
        state = reducer(state,action)
        listeners.forEach(fn => fn())
        return state
    }
    // 初始化
    dispatch({type: 'init'})
    return {
        getState,
        dispatch,
        subscribe
    }
}