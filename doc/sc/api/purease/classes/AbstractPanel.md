[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPanel

# Abstract Class: AbstractPanel

Defined in: [purease.ts:433](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L433)

大页面的内嵌页面

## Constructors

### Constructor

> **new AbstractPanel**(): `AbstractPanel`

#### Returns

`AbstractPanel`

## Properties

### rootPage

> **rootPage**: [`AbstractPage`](AbstractPage.md) & `Record`\<`string`, `any`\>

Defined in: [purease.ts:447](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L447)

获取总大页面对象

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: [purease.ts:452](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L452)

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

Defined in: [purease.ts:468](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L468)

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: [purease.ts:461](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L461)

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

## Methods

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:436](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L436)

入口方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:438](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L438)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:442](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L442)

#### Returns

`void` \| `Promise`\<`void`\>

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: [purease.ts:478](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L478)

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
