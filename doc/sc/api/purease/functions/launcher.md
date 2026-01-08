[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / launcher

# Function: launcher()

> **launcher**\<`T`\>(`page`, `options`): `void`

Defined in: [purease.ts:522](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L522)

运行当前页面

## Type Parameters

### T

`T` *extends* [`AbstractPage`](../classes/AbstractPage.md)

## Parameters

### page

(`opt`) => `T`

### options

#### debug?

`boolean`

生产环境请不要开启，默认不开启，开启后将加载 debug 版框架

#### locale?

`string`

设定当前的程序语言

#### localePath?

`string`

设定语言包所在路径，无所谓是否 / 结尾

#### panels?

`object`[]

要加载的子 panels

## Returns

`void`
