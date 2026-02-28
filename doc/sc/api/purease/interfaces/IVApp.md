[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:1238](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1238)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:1251](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1251)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:1241](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1241)

***

### version

> **version**: `string`

Defined in: [purease.ts:1249](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1249)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:1239](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1239)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:1240](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1240)

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

Defined in: [purease.ts:1242](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1242)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:1243](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1243)

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

Defined in: [purease.ts:1244](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1244)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:1246](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1246)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:1247](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1247)

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

Defined in: [purease.ts:1248](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1248)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:1245](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1245)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`
