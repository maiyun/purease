[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IRouteOption

# Interface: IRouteOption

Defined in: [purease.ts:1498](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1498)

单条路由选项

## Properties

### children?

> `optional` **children**: `IRouteOption`[]

Defined in: [purease.ts:1508](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1508)

子路由

***

### component?

> `optional` **component**: `Record`\<`string`, `any`\> \| () => `Promise`\<`Record`\<`string`, `any`\>\>

Defined in: [purease.ts:1504](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1504)

Vue 组件对象或异步加载函数，可用 routeComponent() 或 routeLoad() 生成

***

### meta?

> `optional` **meta**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1510](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1510)

路由元信息

***

### name?

> `optional` **name**: `string`

Defined in: [purease.ts:1502](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1502)

路由名称

***

### path

> **path**: `string`

Defined in: [purease.ts:1500](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1500)

路由路径

***

### props?

> `optional` **props**: `boolean` \| `Record`\<`string`, `any`\> \| (`to`) => `Record`\<`string`, `any`\>

Defined in: [purease.ts:1512](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1512)

是否将路由参数作为 props 传入组件

***

### redirect?

> `optional` **redirect**: `string`

Defined in: [purease.ts:1506](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1506)

重定向目标
