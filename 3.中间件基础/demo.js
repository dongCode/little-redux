import { createStore } from "./index.js";

let addAction = {
  type: "add",
  num: 1,
};

let reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + action.num;
    default:
      return 0;
  }
};


let redux = createStore(reducer);



let state = redux.getState();



console.log(state); // 0



const unsubscribe = redux.subscribe(() => {
  console.log("subscribe", redux.getState());
});

// 需要记录每次dispatch前后的状态变化
console.log("没有中间件的功能 prev state", redux.getState());
redux.dispatch(addAction);
console.log("没有中间件的功能 next state", redux.getState());


// 记录每次出错的原因
try {
  redux.dispatch(addAction);
} catch (err) {
  console.error("错误信息: ", err);
}

// 实现两个功能可以重写 dispatch
const next = redux.dispatch;
// 重写 dispatch方法
redux.dispatch = (action) => {
  try {
    console.log("固定死的dispatch prev state", redux.getState());
    next(action);
    console.log("固定死的dispatch next state", redux.getState());
  } catch (err) {
    console.error("错误信息: ", err);
  }
};

redux.dispatch(addAction);


// 中间件就是对 dispatch 方法的扩展
// 提取 打印日志的功能
let loggerMiddleware = (action) => {
  console.log("prev state", redux.getState());
  next(action);
  console.log("next state", redux.getState());
};

// 写死了 loggerMiddleware 需要支持扩展 动态传入
let errorMiddle = (action) => {
  try {
    loggerMiddleware(action);
  } catch (error) {
    console.error("error:", error);
  }
};


// 支持传入 中间件函数 next
errorMiddle = (next) => (action) => {
    try {
        // loggerMiddleware(action);
        console.log('动态传入 errorMiddle')
        next(action)
    } catch (error) {
        console.error("error:", error);

    }
}   


// 支持传入
loggerMiddleware = (next) => (action) => {
    console.log("动态传入 prev state", redux.getState());
    next(action);
    console.log("next state", redux.getState());
}

redux.dispatch = errorMiddle(loggerMiddleware(next))

unsubscribe();

redux.dispatch(addAction);

console.log(redux.getState());
