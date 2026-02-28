[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:1175](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1175)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1176](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1176)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1177](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1177)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1178](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1178)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1182](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1182)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:1183](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1183)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1184](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1184)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:1185](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1185)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:1186](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1186)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1187](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1187)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1191](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1191)

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

Defined in: [purease.ts:1179](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1179)

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

Defined in: [purease.ts:1180](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1180)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1181](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1181)

#### Returns

`Promise`\<`void`\>
