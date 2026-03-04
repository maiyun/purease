[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / routeLoad

# Function: routeLoad()

> **routeLoad**(`dir`, `code?`): () => `Promise`\<`Record`\<`string`, `any`\>\>

Defined in: [purease.ts:616](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L616)

异步加载路由页面组件（layout.html + code.js + style.css）

## Parameters

### dir

`string`

页面目录的完整 URL，可用 getDirname(import.meta.url) + '/pages/xxx' 获取

### code?

() => `Promise`\<\{ `default`: () => [`AbstractPanel`](../classes/AbstractPanel.md); \}\>

代码加载函数（可选），如 () => import('./pages/xxx/code.js')

## Returns

> (): `Promise`\<`Record`\<`string`, `any`\>\>

### Returns

`Promise`\<`Record`\<`string`, `any`\>\>
