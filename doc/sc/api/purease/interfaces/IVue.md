[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: purease.ts:773

Vue 实例

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: purease.ts:774

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: purease.ts:775

***

### $el

> **$el**: `HTMLElement`

Defined in: purease.ts:776

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: purease.ts:780

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: purease.ts:781

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: purease.ts:782

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: purease.ts:783

***

### $root

> **$root**: `IVue`

Defined in: purease.ts:784

***

### $slots

> **$slots**: `object`

Defined in: purease.ts:785

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: purease.ts:789

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

Defined in: purease.ts:777

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

Defined in: purease.ts:778

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: purease.ts:779

#### Returns

`Promise`\<`void`\>
