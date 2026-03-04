[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IRouter

# Interface: IRouter

Defined in: [purease.ts:1479](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1479)

vue-router 实例

## Indexable

\[`key`: `string`\]: `any`

## Properties

### currentRoute

> **currentRoute**: `object`

Defined in: [purease.ts:1487](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1487)

#### value

> **value**: [`IRouteInfo`](IRouteInfo.md)

## Methods

### afterEach()

> **afterEach**(`hook`): () => `void`

Defined in: [purease.ts:1486](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1486)

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

Defined in: [purease.ts:1483](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1483)

#### Returns

`void`

***

### beforeEach()

> **beforeEach**(`guard`): () => `void`

Defined in: [purease.ts:1485](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1485)

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

Defined in: [purease.ts:1484](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1484)

#### Returns

`void`

***

### go()

> **go**(`delta`): `void`

Defined in: [purease.ts:1482](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1482)

#### Parameters

##### delta

`number`

#### Returns

`void`

***

### push()

> **push**(`to`): `Promise`\<`any`\>

Defined in: [purease.ts:1480](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1480)

#### Parameters

##### to

`string` | [`IRouteLocation`](IRouteLocation.md)

#### Returns

`Promise`\<`any`\>

***

### replace()

> **replace**(`to`): `Promise`\<`any`\>

Defined in: [purease.ts:1481](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1481)

#### Parameters

##### to

`string` | [`IRouteLocation`](IRouteLocation.md)

#### Returns

`Promise`\<`any`\>
