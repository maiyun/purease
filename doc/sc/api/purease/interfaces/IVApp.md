[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:1121](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1121)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:1134](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1134)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:1124](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1124)

***

### version

> **version**: `string`

Defined in: [purease.ts:1132](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1132)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:1122](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1122)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:1123](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1123)

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

Defined in: [purease.ts:1125](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1125)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:1126](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1126)

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

Defined in: [purease.ts:1127](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1127)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:1129](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1129)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:1130](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1130)

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

Defined in: [purease.ts:1131](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1131)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:1128](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1128)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`
