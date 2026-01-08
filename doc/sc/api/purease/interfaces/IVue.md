[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:910](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L910)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:911](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L911)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:912](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L912)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:913](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L913)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:917](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L917)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:918](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L918)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:919](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L919)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:920](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L920)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:921](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L921)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:922](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L922)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:926](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L926)

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

Defined in: [purease.ts:914](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L914)

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

Defined in: [purease.ts:915](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L915)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:916](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L916)

#### Returns

`Promise`\<`void`\>
