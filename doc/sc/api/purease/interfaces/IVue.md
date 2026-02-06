[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:1094](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1094)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1095](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1095)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1096](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1096)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1097](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1097)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1101](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1101)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:1102](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1102)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1103](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1103)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:1104](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1104)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:1105](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1105)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1106](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1106)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1110](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1110)

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

Defined in: [purease.ts:1098](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1098)

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

Defined in: [purease.ts:1099](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1099)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1100](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1100)

#### Returns

`Promise`\<`void`\>
