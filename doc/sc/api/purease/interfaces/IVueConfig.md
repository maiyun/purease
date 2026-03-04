[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:1434](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1434)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1436](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1436)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:1438](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1438)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:1439](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1439)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:1435](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1435)

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

Defined in: [purease.ts:1437](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1437)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:1440](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1440)

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`
