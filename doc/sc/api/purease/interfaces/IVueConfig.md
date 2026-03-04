[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:1397](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1397)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1399](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1399)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:1401](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1401)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:1402](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1402)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:1398](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1398)

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

Defined in: [purease.ts:1400](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1400)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:1403](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1403)

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`
