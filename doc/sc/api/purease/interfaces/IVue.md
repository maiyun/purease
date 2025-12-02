[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: purease.ts:905

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: purease.ts:906

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: purease.ts:907

***

### $el

> **$el**: `HTMLElement`

Defined in: purease.ts:908

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: purease.ts:912

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: purease.ts:913

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: purease.ts:914

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: purease.ts:915

***

### $root

> **$root**: `IVue`

Defined in: purease.ts:916

***

### $slots

> **$slots**: `object`

Defined in: purease.ts:917

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: purease.ts:921

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

Defined in: purease.ts:909

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

Defined in: purease.ts:910

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: purease.ts:911

#### Returns

`Promise`\<`void`\>
