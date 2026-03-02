[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueObject

# Interface: IVueObject

Defined in: [purease.ts:1211](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1211)

## Methods

### createApp()

> **createApp**(`opt`): [`IVApp`](IVApp.md)

Defined in: [purease.ts:1212](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1212)

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `children?`): `any`

Defined in: [purease.ts:1224](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1224)

#### Parameters

##### tag

`any`

##### props?

`Record`\<`string`, `any`\> | `null`

##### children?

`any`

#### Returns

`any`

***

### markRaw()

> **markRaw**\<`T`\>(`obj`): `T`

Defined in: [purease.ts:1215](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1215)

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`T`

#### Returns

`T`

***

### reactive()

> **reactive**\<`T`\>(`obj`): `T`

Defined in: [purease.ts:1214](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1214)

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

Defined in: [purease.ts:1213](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1213)

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

### resolveComponent()

> **resolveComponent**(`name`): `any`

Defined in: [purease.ts:1225](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1225)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### watch()

> **watch**(`v`, `cb`, `opt?`): `void`

Defined in: [purease.ts:1216](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1216)

#### Parameters

##### v

`any`

##### cb

(`n`, `o`) => `void` \| `Promise`\<`void`\>

##### opt?

###### deep?

`boolean`

###### immediate?

`boolean`

#### Returns

`void`
