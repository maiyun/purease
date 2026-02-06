[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:1120](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1120)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1121](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1121)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1122](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1122)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1123](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1123)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1127](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1127)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:1128](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1128)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1129](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1129)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:1130](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1130)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:1131](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1131)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1132](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1132)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1136](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1136)

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

Defined in: [purease.ts:1124](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1124)

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

Defined in: [purease.ts:1125](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1125)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1126](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1126)

#### Returns

`Promise`\<`void`\>
