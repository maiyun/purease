[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueObject

# Interface: IVueObject

Defined in: [purease.ts:1130](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1130)

## Methods

### createApp()

> **createApp**(`opt`): [`IVApp`](IVApp.md)

Defined in: [purease.ts:1131](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1131)

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `list?`): `any`

Defined in: [purease.ts:1139](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1139)

#### Parameters

##### tag

`string`

##### props?

`any`[] | `Record`\<`string`, `any`\>

##### list?

`any`[]

#### Returns

`any`

***

### reactive()

> **reactive**\<`T`\>(`obj`): `T`

Defined in: [purease.ts:1133](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1133)

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`T`

#### Returns

`T`

***

### ref()

> **ref**\<`T`\>(`obj`): `object`

Defined in: [purease.ts:1132](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1132)

#### Type Parameters

##### T

`T` *extends* `string` \| `number`

#### Parameters

##### obj

`T`

#### Returns

`object`

##### value

> **value**: `T`

***

### watch()

> **watch**(`v`, `cb`, `opt`): `void`

Defined in: [purease.ts:1134](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1134)

#### Parameters

##### v

`any`

##### cb

(`n`, `o`) => `void` \| `Promise`\<`void`\>

##### opt

`Record`\<`string`, `string` \| `boolean`\>

#### Returns

`void`
