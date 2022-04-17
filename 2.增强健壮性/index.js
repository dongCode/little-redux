// preloadedState 支持可以注入状态
export const createStore = (reducer, preloadedState) => {
  let currentState = preloadedState;
  let listeners = [];
  const getState = () => {
    return currentState;
  };
  const subscribe = (fn) => {
    listeners.push(fn);
    return () => {
      // listeners = listeners.filter(i => i !== fn)
      const index = listeners.indexOf(fn);
      listeners.splice(index, 1);
    };
  };
  const dispatch = (action) => {
    // 防止多次dispatch请求同时改状态，一定是前面的dispatch结束之后，才dispatch下一个
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }

    try {
      isDispatching = true;
      currentState = reducer(currentState, action); // 覆盖原来的state
    } finally {
      isDispatching = false;
    }
    currentState = reducer(currentState, action);
    listeners.forEach((fn) => fn());
    return currentState;
  };
  // 初始化
  dispatch({ type: "init" });
  return {
    getState,
    dispatch,
    subscribe,
  };
};
