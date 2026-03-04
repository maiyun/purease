[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueObject

# Interface: IVueObject

Defined in: [purease.ts:1410](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1410)

## Methods

### computed()

> **computed**\<`T`\>(`fn`): `object`

Defined in: [purease.ts:1415](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1415)

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

Defined in: [purease.ts:1411](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1411)

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `children?`): `any`

Defined in: [purease.ts:1426](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1426)

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

Defined in: [purease.ts:1417](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1417)

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

Defined in: [purease.ts:1414](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1414)

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

Defined in: [purease.ts:1416](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1416)

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

Defined in: [purease.ts:1413](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1413)

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

Defined in: [purease.ts:1412](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1412)

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

Defined in: [purease.ts:1427](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1427)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### watch()

> **watch**(`v`, `cb`, `opt?`): `void`

Defined in: [purease.ts:1418](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1418)

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
