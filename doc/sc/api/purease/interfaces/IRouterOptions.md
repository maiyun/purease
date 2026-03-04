[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IRouterOptions

# Interface: IRouterOptions

Defined in: [purease.ts:1488](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1488)

路由配置选项

## Properties

### base?

> `optional` **base**: `string`

Defined in: [purease.ts:1492](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1492)

基础路径，history 模式下不传则自动从页面 URL 推断

***

### mode?

> `optional` **mode**: `"hash"` \| `"history"`

Defined in: [purease.ts:1490](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1490)

路由模式，默认 hash

***

### routes

> **routes**: [`IRouteOption`](IRouteOption.md)[]

Defined in: [purease.ts:1494](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1494)

路由列表
