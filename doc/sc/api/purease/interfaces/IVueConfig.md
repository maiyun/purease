[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:1172](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1172)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1174](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1174)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:1176](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1176)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:1177](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1177)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:1173](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1173)

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

Defined in: [purease.ts:1175](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1175)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:1178](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1178)

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`
