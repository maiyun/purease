[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractRouterPage

# Abstract Class: AbstractRouterPage

Defined in: [purease.ts:517](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L517)

路由页面基类

## Extends

- [`AbstractPanel`](AbstractPanel.md)

## Constructors

### Constructor

> **new AbstractRouterPage**(): `AbstractRouterPage`

#### Returns

`AbstractRouterPage`

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`constructor`](AbstractPanel.md#constructor)

## Properties

### rootPage

> **rootPage**: [`AbstractPage`](AbstractPage.md) & `Record`\<`string`, `any`\>

Defined in: [purease.ts:472](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L472)

获取总大页面对象

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`rootPage`](AbstractPanel.md#rootpage)

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: [purease.ts:477](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L477)

获取语言内容

##### Returns

> (`key`, `data?`): `string`

###### Parameters

###### key

`string`

###### data?

`string`[]

###### Returns

`string`

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`l`](AbstractPanel.md#l)

***

### meta

#### Get Signature

> **get** **meta**(): `Record`\<`string`, `any`\>

Defined in: [purease.ts:525](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L525)

路由元数据

##### Returns

`Record`\<`string`, `any`\>

***

### nextTick

#### Get Signature

> **get** **nextTick**(): () => `Promise`\<`void`\>

Defined in: [purease.ts:493](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L493)

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`nextTick`](AbstractPanel.md#nexttick)

***

### query

#### Get Signature

> **get** **query**(): `Record`\<`string`, `string`\>

Defined in: [purease.ts:520](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L520)

路由参数

##### Returns

`Record`\<`string`, `string`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: [purease.ts:486](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L486)

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`refs`](AbstractPanel.md#refs)

## Methods

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:461](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L461)

入口方法

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`main`](AbstractPanel.md#main)

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:463](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L463)

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`onBeforeUnmount`](AbstractPanel.md#onbeforeunmount)

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:467](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L467)

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`onUnmounted`](AbstractPanel.md#onunmounted)

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: [purease.ts:503](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L503)

监视变动

#### Type Parameters

##### T

`T` *extends* `AbstractRouterPage`

##### TK

`TK` *extends* `string` \| `number` \| `symbol`

##### TR

`TR`

#### Parameters

##### name

监视的属性

`TK` | () => `TR`

##### cb

(`val`, `old`) => `void` \| `Promise`\<`void`\>

回调

##### opt

参数

###### deep?

`boolean`

###### immediate?

`boolean`

#### Returns

> (): `void`

##### Returns

`void`

#### Inherited from

[`AbstractPanel`](AbstractPanel.md).[`watch`](AbstractPanel.md#watch)
