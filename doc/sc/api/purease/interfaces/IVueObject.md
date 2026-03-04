[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueObject

# Interface: IVueObject

Defined in: [purease.ts:1373](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1373)

## Methods

### computed()

> **computed**\<`T`\>(`fn`): `object`

Defined in: [purease.ts:1378](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1378)

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

() => `T`

#### Returns

`object`

##### value

> `readonly` **value**: `T`

***

### createApp()

> **createApp**(`opt`): [`IVApp`](IVApp.md)

Defined in: [purease.ts:1374](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1374)

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `children?`): `any`

Defined in: [purease.ts:1389](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1389)

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

### inject()

> **inject**\<`T`\>(`key`, `defaultValue?`): `T`

Defined in: [purease.ts:1380](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1380)

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string` | `symbol`

##### defaultValue?

`T`

#### Returns

`T`

***

### markRaw()

> **markRaw**\<`T`\>(`obj`): `T`

Defined in: [purease.ts:1377](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1377)

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`T`

#### Returns

`T`

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `void`

Defined in: [purease.ts:1379](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1379)

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string` | `symbol`

##### value

`T`

#### Returns

`void`

***

### reactive()

> **reactive**\<`T`\>(`obj`): `T`

Defined in: [purease.ts:1376](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1376)

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

Defined in: [purease.ts:1375](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1375)

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

Defined in: [purease.ts:1390](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1390)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### watch()

> **watch**(`v`, `cb`, `opt?`): `void`

Defined in: [purease.ts:1381](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1381)

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
