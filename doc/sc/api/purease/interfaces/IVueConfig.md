[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:1232](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1232)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1234](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1234)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:1236](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1236)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:1237](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1237)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:1233](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1233)

#### Parameters

##### err

`unknown`

##### instance

[`IVue`](IVue.md) | `null`

##### info

`string`

#### Returns

`void`

***

### isCustomElement()

> **isCustomElement**(`tag`): `boolean`

Defined in: [purease.ts:1235](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1235)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:1238](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1238)

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`
