[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:1407](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1407)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:1420](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1420)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:1410](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1410)

***

### version

> **version**: `string`

Defined in: [purease.ts:1418](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1418)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:1408](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1408)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:1409](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1409)

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

Defined in: [purease.ts:1411](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1411)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:1412](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1412)

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

Defined in: [purease.ts:1413](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1413)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:1415](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1415)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:1416](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1416)

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

Defined in: [purease.ts:1417](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1417)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:1414](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1414)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`
