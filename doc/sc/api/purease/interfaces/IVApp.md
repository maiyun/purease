[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:1156](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1156)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:1169](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1169)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:1159](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1159)

***

### version

> **version**: `string`

Defined in: [purease.ts:1167](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1167)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:1157](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1157)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:1158](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1158)

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

Defined in: [purease.ts:1160](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1160)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:1161](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1161)

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

Defined in: [purease.ts:1162](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1162)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:1164](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1164)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:1165](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1165)

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

Defined in: [purease.ts:1166](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1166)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:1163](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1163)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`
