[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:1337](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1337)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1338](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1338)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1339](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1339)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1340](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1340)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1344](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1344)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:1345](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1345)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1346](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1346)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:1347](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1347)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:1348](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1348)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1349](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1349)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1353](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1353)

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

Defined in: [purease.ts:1341](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1341)

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

Defined in: [purease.ts:1342](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1342)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1343](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1343)

#### Returns

`Promise`\<`void`\>
