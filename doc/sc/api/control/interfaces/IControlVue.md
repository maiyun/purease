[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IControlVue

# Interface: IControlVue

Defined in: [control.ts:11](https://github.com/maiyun/purease/blob/master/dist/control.ts#L11)

Vue 实例

## Extends

- [`IVue`](../../purease/interfaces/IVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:913](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L913)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$attrs`](../../purease/interfaces/IVue.md#attrs)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:914](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L914)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$data`](../../purease/interfaces/IVue.md#data)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:915](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L915)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$el`](../../purease/interfaces/IVue.md#el)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:919](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L919)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$options`](../../purease/interfaces/IVue.md#options)

***

### $parent

> **$parent**: [`IVue`](../../purease/interfaces/IVue.md) \| `null`

Defined in: [purease.ts:920](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L920)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$parent`](../../purease/interfaces/IVue.md#parent)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:921](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L921)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$props`](../../purease/interfaces/IVue.md#props)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & [`IVue`](../../purease/interfaces/IVue.md)\>

Defined in: [purease.ts:922](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L922)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$refs`](../../purease/interfaces/IVue.md#refs)

***

### $root

> **$root**: [`IVue`](../../purease/interfaces/IVue.md)

Defined in: [purease.ts:923](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L923)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$root`](../../purease/interfaces/IVue.md#root)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:924](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L924)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](../../purease/interfaces/IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](../../purease/interfaces/IVNode.md)[] \| `undefined`

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$slots`](../../purease/interfaces/IVue.md#slots)

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:928](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L928)

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

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$watch`](../../purease/interfaces/IVue.md#watch)

***

### alignHComp

> **alignHComp**: `string` \| `undefined`

Defined in: [control.ts:26](https://github.com/maiyun/purease/blob/master/dist/control.ts#L26)

获取 alignH 的 css 属性模式，请确保 $props.alignH 存在

***

### alignVComp

> **alignVComp**: `string` \| `undefined`

Defined in: [control.ts:28](https://github.com/maiyun/purease/blob/master/dist/control.ts#L28)

获取 alignH 的 css 属性模式，请确保 props.alignH 存在

***

### isRtl

> **isRtl**: `boolean`

Defined in: [control.ts:30](https://github.com/maiyun/purease/blob/master/dist/control.ts#L30)

是否是 rtl 模式

***

### l()

> **l**: (`key`, `data?`) => `string`

Defined in: [control.ts:24](https://github.com/maiyun/purease/blob/master/dist/control.ts#L24)

获取语言包内容

#### Parameters

##### key

`string`

##### data?

`string`[]

#### Returns

`string`

***

### parentByName()

> **parentByName**: (`controlName`) => `IControlVue` \| `null`

Defined in: [control.ts:22](https://github.com/maiyun/purease/blob/master/dist/control.ts#L22)

根据 control name 查询上层控件

#### Parameters

##### controlName

`string`

#### Returns

`IControlVue` \| `null`

***

### propArray()

> **propArray**: (`name`) => `any`[]

Defined in: [control.ts:20](https://github.com/maiyun/purease/blob/master/dist/control.ts#L20)

获取 props 中的 array 类型的值

#### Parameters

##### name

`string`

#### Returns

`any`[]

***

### propBoolean()

> **propBoolean**: (`name`) => `boolean`

Defined in: [control.ts:14](https://github.com/maiyun/purease/blob/master/dist/control.ts#L14)

获取 props 中的 boolean 类型的值

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### propInt()

> **propInt**: (`name`) => `number`

Defined in: [control.ts:18](https://github.com/maiyun/purease/blob/master/dist/control.ts#L18)

获取 props 中的 int 类型的值

#### Parameters

##### name

`string`

#### Returns

`number`

***

### propNumber()

> **propNumber**: (`name`) => `number`

Defined in: [control.ts:16](https://github.com/maiyun/purease/blob/master/dist/control.ts#L16)

获取 props 中的 number 类型的值

#### Parameters

##### name

`string`

#### Returns

`number`

## Methods

### $emit()

> **$emit**(`name`, ...`arg`): `void`

Defined in: [purease.ts:916](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L916)

#### Parameters

##### name

`string`

##### arg

...`any`

#### Returns

`void`

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$emit`](../../purease/interfaces/IVue.md#emit)

***

### $forceUpdate()

> **$forceUpdate**(): `void`

Defined in: [purease.ts:917](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L917)

#### Returns

`void`

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$forceUpdate`](../../purease/interfaces/IVue.md#forceupdate)

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:918](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L918)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$nextTick`](../../purease/interfaces/IVue.md#nexttick)
