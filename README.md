### js 常用工具方法

### 安装
```sh
yarn add @gauseen/tools
```

### 使用
```js
import { typer } from '@gauseen/tools'
typer(66)  // number
```

### 脚本引入
```js
<script src="https://unpkg.com/@gauseen/tools"></script>

window.tools.typer(66)  // number
```

| 方法名 | 调用 | 参数类型 | 默认参数 | 说明 |
|-------|-------|---------|-------|-------|
| `typer` | `typer(value)` | `any` | - | 获取数据具体类型 |
| `isEmpty` | `isEmpty(value)` | `any` | - | 判断所有数据类型是否为空 |
| `forbidBodyScroll` | `forbidBodyScroll().actionForbid(isShowMask)` | `Boolean` | - | 禁止body滚动，解决弹出蒙层滑动穿透问题 |
| `setTitle` | `setTitle(title)` | `String` | - | 设置页面 title，单页面应用，兼容 title 问题 |
| `parseUrl` | ` parseUrl (url)` | `String or null` | `current url` | 解析链接中的数据 `http://example/api?name=hello&msg=world => { name: 'hello', msg: 'world' }` |
| `obj2Params` | ` obj2Params (obj)` | `Object or null` | - | 对象转 form 数据 `{ name: 'hello', msg: 'world' } => name=hello&msg=world` |
| `regTips` | ` regTips.verify('mobile', '17688888888')` | `type, value` | - | 正则判断 |
| `getVariableByDomain` | ` getVariableByDomain(options)` | `Object` | - | 根据不同域名，获取不同变量 |
| `Timejs` | ` Timejs (date).format()` | - | `new Date()&YYYY-MM-DD HH:mm:ss` | 日期格式化 |
| `throttle` | ` let fnThro = throttle(fun, delay)` | - | - | 节流函数(初始执行一次，一定时间内必定执行一次) |
| `debounce` | ` let fnDebo = debounce(fun, delay)` | - | - | 防抖函数(一定时间内不再次调用，执行一次) |
| `threshold` | ` let fnThre = threshold(fun, delay)` | - | - | 禁止频繁操作函数(第一次立即执行，delay 毫秒之后执行一次) |
| `mergerOfSimilarItems` | ` mergerOfSimilarItems (arr, standardProps, mergeProps)` | - | - | 合并同类项 |
