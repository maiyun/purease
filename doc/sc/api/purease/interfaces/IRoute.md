[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IRoute

# Interface: IRoute

Defined in: [router.ts:5](https://github.com/maiyun/purease/blob/master/dist/router.ts#L5)

Route configuration

## Properties

### component

> **component**: `any`

Defined in: [router.ts:12](https://github.com/maiyun/purease/blob/master/dist/router.ts#L12)

组件加载器
可以直接返回组件对象，或者返回 Promise<组件对象>

***

### meta?

> `optional` **meta**: `Record`\<`string`, `any`\>

Defined in: [router.ts:16](https://github.com/maiyun/purease/blob/master/dist/router.ts#L16)

元数据

***

### name?

> `optional` **name**: `string`

Defined in: [router.ts:14](https://github.com/maiyun/purease/blob/master/dist/router.ts#L14)

路由名称

***

### path

> **path**: `string`

Defined in: [router.ts:7](https://github.com/maiyun/purease/blob/master/dist/router.ts#L7)

路径
