[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:974](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L974)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:987](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L987)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:977](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L977)

***

### version

> **version**: `string`

Defined in: [purease.ts:985](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L985)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:975](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L975)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:976](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L976)

##### Parameters

###### name

`string`

###### config

`any`

##### Returns

`this`

***

### directive()

#### Call Signature

> **directive**(`name`): `any`

Defined in: [purease.ts:978](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L978)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:979](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L979)

##### Parameters

###### name

`string`

###### config

`any`

##### Returns

`this`

***

### mixin()

> **mixin**(`mixin`): `this`

Defined in: [purease.ts:980](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L980)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:982](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L982)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:983](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L983)

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`this`

***

### unmount()

> **unmount**(): `void`

Defined in: [purease.ts:984](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L984)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:981](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L981)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`
