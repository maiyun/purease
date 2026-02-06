[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:1182](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1182)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:1195](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1195)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:1185](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1185)

***

### version

> **version**: `string`

Defined in: [purease.ts:1193](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1193)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:1183](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1183)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:1184](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1184)

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

Defined in: [purease.ts:1186](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1186)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:1187](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1187)

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

Defined in: [purease.ts:1188](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1188)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:1190](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1190)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:1191](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1191)

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

Defined in: [purease.ts:1192](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1192)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:1189](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1189)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`
