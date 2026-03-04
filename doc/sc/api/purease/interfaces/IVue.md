[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:1374](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1374)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1375](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1375)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1376](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1376)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1377](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1377)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1381](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1381)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:1382](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1382)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1383](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1383)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:1384](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1384)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:1385](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1385)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1386](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1386)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1390](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1390)

#### Parameters

##### o

`any`

##### cb

(`n`, `o`) => `void`

##### opt?

###### deep?

`boolean`

###### immediate?

`boolean`

#### Returns

`void`

## Methods

### $emit()

> **$emit**(`name`, ...`arg`): `void`

Defined in: [purease.ts:1378](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1378)

#### Parameters

##### name

`string`

##### arg

...`any`

#### Returns

`void`

***

### $forceUpdate()

> **$forceUpdate**(): `void`

Defined in: [purease.ts:1379](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1379)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1380](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1380)

#### Returns

`Promise`\<`void`\>
