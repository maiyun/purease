[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueObject

# Interface: IVueObject

Defined in: [purease.ts:1095](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1095)

## Methods

### createApp()

> **createApp**(`opt`): [`IVApp`](IVApp.md)

Defined in: [purease.ts:1096](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1096)

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `list?`): `any`

Defined in: [purease.ts:1104](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1104)

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

Defined in: [purease.ts:1098](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1098)

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

Defined in: [purease.ts:1097](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1097)

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

Defined in: [purease.ts:1099](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1099)

#### Parameters

##### v

`any`

##### cb

(`n`, `o`) => `void` \| `Promise`\<`void`\>

##### opt

`Record`\<`string`, `string` \| `boolean`\>

#### Returns

`void`
