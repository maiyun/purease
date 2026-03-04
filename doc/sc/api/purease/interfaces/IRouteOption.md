[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IRouteOption

# Interface: IRouteOption

Defined in: [purease.ts:1461](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1461)

单条路由选项

## Properties

### children?

> `optional` **children**: `IRouteOption`[]

Defined in: [purease.ts:1471](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1471)

子路由

***

### component?

> `optional` **component**: `Record`\<`string`, `any`\> \| () => `Promise`\<`Record`\<`string`, `any`\>\>

Defined in: [purease.ts:1467](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1467)

Vue 组件对象或异步加载函数，可用 routeComponent() 或 routeLoad() 生成

***

### meta?

> `optional` **meta**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1473](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1473)

路由元信息

***

### name?

> `optional` **name**: `string`

Defined in: [purease.ts:1465](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1465)

路由名称

***

### path

> **path**: `string`

Defined in: [purease.ts:1463](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1463)

路由路径

***

### props?

> `optional` **props**: `boolean` \| `Record`\<`string`, `any`\> \| (`to`) => `Record`\<`string`, `any`\>

Defined in: [purease.ts:1475](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1475)

是否将路由参数作为 props 传入组件

***

### redirect?

> `optional` **redirect**: `string`

Defined in: [purease.ts:1469](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1469)

重定向目标
