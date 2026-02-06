[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:1146](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1146)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1148](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1148)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:1150](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1150)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:1151](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1151)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:1147](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1147)

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

Defined in: [purease.ts:1149](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1149)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:1152](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1152)

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`
