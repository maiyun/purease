[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IRouter

# Interface: IRouter

Defined in: [purease.ts:1516](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1516)

vue-router 实例

## Indexable

\[`key`: `string`\]: `any`

## Properties

### currentRoute

> **currentRoute**: `object`

Defined in: [purease.ts:1524](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1524)

#### value

> **value**: [`IRouteInfo`](IRouteInfo.md)

## Methods

### afterEach()

> **afterEach**(`hook`): () => `void`

Defined in: [purease.ts:1523](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1523)

#### Parameters

##### hook

(`to`, `from`) => `any`

#### Returns

> (): `void`

##### Returns

`void`

***

### back()

> **back**(): `void`

Defined in: [purease.ts:1520](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1520)

#### Returns

`void`

***

### beforeEach()

> **beforeEach**(`guard`): () => `void`

Defined in: [purease.ts:1522](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1522)

#### Parameters

##### guard

(`to`, `from`, `next?`) => `any`

#### Returns

> (): `void`

##### Returns

`void`

***

### forward()

> **forward**(): `void`

Defined in: [purease.ts:1521](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1521)

#### Returns

`void`

***

### go()

> **go**(`delta`): `void`

Defined in: [purease.ts:1519](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1519)

#### Parameters

##### delta

`number`

#### Returns

`void`

***

### push()

> **push**(`to`): `Promise`\<`any`\>

Defined in: [purease.ts:1517](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1517)

#### Parameters

##### to

`string` | [`IRouteLocation`](IRouteLocation.md)

#### Returns

`Promise`\<`any`\>

***

### replace()

> **replace**(`to`): `Promise`\<`any`\>

Defined in: [purease.ts:1518](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1518)

#### Parameters

##### to

`string` | [`IRouteLocation`](IRouteLocation.md)

#### Returns

`Promise`\<`any`\>
