[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: purease.ts:967

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: purease.ts:979

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: purease.ts:970

***

### version

> **version**: `string`

Defined in: purease.ts:977

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: purease.ts:968

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: purease.ts:969

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

Defined in: purease.ts:971

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: purease.ts:972

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

Defined in: purease.ts:973

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: purease.ts:974

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: purease.ts:975

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

Defined in: purease.ts:976

#### Returns

`void`
