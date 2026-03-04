[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IRouterOptions

# Interface: IRouterOptions

Defined in: [purease.ts:1451](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1451)

路由配置选项

## Properties

### base?

> `optional` **base**: `string`

Defined in: [purease.ts:1455](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1455)

基础路径，history 模式下不传则自动从页面 URL 推断

***

### mode?

> `optional` **mode**: `"hash"` \| `"history"`

Defined in: [purease.ts:1453](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1453)

路由模式，默认 hash

***

### routes

> **routes**: [`IRouteOption`](IRouteOption.md)[]

Defined in: [purease.ts:1457](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1457)

路由列表
