[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: purease.ts:781

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: purease.ts:782

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: purease.ts:783

***

### $el

> **$el**: `HTMLElement`

Defined in: purease.ts:784

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: purease.ts:788

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: purease.ts:789

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: purease.ts:790

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: purease.ts:791

***

### $root

> **$root**: `IVue`

Defined in: purease.ts:792

***

### $slots

> **$slots**: `object`

Defined in: purease.ts:793

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: purease.ts:797

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

Defined in: purease.ts:785

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

Defined in: purease.ts:786

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: purease.ts:787

#### Returns

`Promise`\<`void`\>
