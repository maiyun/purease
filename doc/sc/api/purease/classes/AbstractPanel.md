[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPanel

# Abstract Class: AbstractPanel

Defined in: [purease.ts:505](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L505)

大页面的内嵌页面

## Constructors

### Constructor

> **new AbstractPanel**(): `AbstractPanel`

#### Returns

`AbstractPanel`

## Properties

### rootPage

> **rootPage**: [`AbstractPage`](AbstractPage.md) & `Record`\<`string`, `any`\>

Defined in: [purease.ts:519](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L519)

获取总大页面对象

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: [purease.ts:524](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L524)

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

***

### nextTick

#### Get Signature

> **get** **nextTick**(): () => `Promise`\<`void`\>

Defined in: [purease.ts:540](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L540)

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: [purease.ts:533](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L533)

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

***

### routeInfo

#### Get Signature

> **get** **routeInfo**(): [`IRouteInfo`](../interfaces/IRouteInfo.md) \| `undefined`

Defined in: [purease.ts:564](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L564)

获取 vue-router 的当前路由信息，需要开启 router

##### Returns

[`IRouteInfo`](../interfaces/IRouteInfo.md) \| `undefined`

## Methods

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:508](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L508)

入口方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:510](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L510)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:514](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L514)

#### Returns

`void` \| `Promise`\<`void`\>

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: [purease.ts:550](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L550)

监视变动

#### Type Parameters

##### T

`T` *extends* `AbstractPanel`

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
