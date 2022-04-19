# 中间件基

```javascript
const = {
    sex: 1
    {
        age: 2
        {
            name: 1
        }
    }
}
```

## 本质层层嵌套的 function compose

```javascript
const add = (a) => a + 1;
const log = (a) => console.log(a);
// 执行的前后想要打印日志
log("before");
add(2);
log("after");

// 封装成函数
const addAndLog = () => {
  log("before");
  add(2);
  log("after");
};

// 想要捕捉错误信息
const addAndLogAndError = () => {
  try {
    log("before");
    add(2);
    log("after");
  } catch (err) {
    log(err);
  }
};

//如果一直添加功能的话 这个函数会变的很大 不好维护

// 让我们 提取出中间部分的函数 一般叫做 next
const addAndLog = (next) => () => {
  log("before");
  next(2);
  log("after");
};

const addAndLogAndError = (next) => () => {
  try {
    next()
  } catch (err) {
    log(err);
  }
};

// 最终两者结合

const middleLogAndError = addAndLogAndError(addAndLog(add))

// addAndLog(add) 返回了 lambda

() => {
  log("before");
  add(2);
  log("after");
}
// 最终会形成
const middleLogAndError = () => {
  try {
    (
      () => {
        log("before");
        add(2);
        log("after");
      }
    )()
  } catch (err) {
    log(err);
  }
}

// 利用工具函数 compose

const compose = (arr, next) => {
    return arr.reduce((fn, current) => {
        return fn(current(next))
    })
}

// 利用函数的话

const middleLogAndError = compose(addAndLog,addAndLogAndError,add)


```
