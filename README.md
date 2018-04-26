### js 常用工具方法

| 方法名 | 调用 | 参数类型 | 默认参数 | 说明 |
|-------|-------|---------|-------|-------|
| `getType` | `getType(value)` | `any` | - | 获取数据具体类型 |
| `isEmpty` | `isEmpty(value)` | `any` | - | 判断所有数据类型是否为空 |
| `forbidBodyScroll` | `forbidBodyScroll().actionForbid(isShowMask)` | `Boolean` | - | 禁止body滚动，解决弹出蒙层滑动穿透问题 |
| `setTitle` | `setTitle(title)` | `String` | - | 设置页面 title，单页面应用，兼容 title 问题 |
| `parseUrl` | ` parseUrl (url)` | `String|null` | 当前 `url` | 解析链接中的数据 `http://example/api?name=hello&msg=world => { name: 'hello', msg: 'world' }` |
| `obj2Params` | ` obj2Params (obj)` | `Object|null` | - | 对象转 form 数据 `{ name: 'hello', msg: 'world' } => name=hello&msg=world` |
| `regTips` | ` regTips.verify('mobile', '17688888888')` | `type, value` | - | 正则判断 |
| `configENV` | ` configENV (config)` | `Object` | - | 判断当前 `url` 所用变量 |
| `Timejs` | ` Timejs (date).format()` | - | `new Date()|YYYY-MM-DD HH:mm:ss` | 日期格式化 |
