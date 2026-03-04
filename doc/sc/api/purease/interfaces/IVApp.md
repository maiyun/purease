[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:1444](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1444)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:1457](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1457)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:1447](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1447)

***

### version

> **version**: `string`

Defined in: [purease.ts:1455](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1455)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:1445](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1445)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:1446](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1446)

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

Defined in: [purease.ts:1448](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1448)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:1449](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1449)

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

Defined in: [purease.ts:1450](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1450)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:1452](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1452)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:1453](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1453)

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

Defined in: [purease.ts:1454](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1454)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:1451](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1451)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`
