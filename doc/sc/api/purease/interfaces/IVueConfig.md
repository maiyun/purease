[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:962](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L962)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:964](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L964)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:966](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L966)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:967](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L967)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:963](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L963)

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

Defined in: [purease.ts:965](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L965)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:968](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L968)

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`
