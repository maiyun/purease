[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:1059](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1059)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1060](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1060)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1061](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1061)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1062](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1062)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1066](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1066)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:1067](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1067)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1068](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1068)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:1069](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1069)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:1070](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1070)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1071](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1071)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1075](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1075)

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

Defined in: [purease.ts:1063](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1063)

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

Defined in: [purease.ts:1064](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1064)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1065](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1065)

#### Returns

`Promise`\<`void`\>
