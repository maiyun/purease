[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueObject

# Interface: IVueObject

Defined in: [purease.ts:1156](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1156)

## Methods

### createApp()

> **createApp**(`opt`): [`IVApp`](IVApp.md)

Defined in: [purease.ts:1157](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1157)

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `list?`): `any`

Defined in: [purease.ts:1165](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1165)

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

Defined in: [purease.ts:1159](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1159)

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

Defined in: [purease.ts:1158](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1158)

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

Defined in: [purease.ts:1160](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1160)

#### Parameters

##### v

`any`

##### cb

(`n`, `o`) => `void` \| `Promise`\<`void`\>

##### opt

`Record`\<`string`, `string` \| `boolean`\>

#### Returns

`void`
