[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:1111](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1111)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1113](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1113)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:1115](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1115)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:1116](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1116)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:1112](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1112)

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

Defined in: [purease.ts:1114](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1114)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:1117](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1117)

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`
