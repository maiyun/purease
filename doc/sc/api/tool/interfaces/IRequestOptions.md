[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [tool.ts:959](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L959)

## Properties

### body?

> `optional` **body**: `FormData`

Defined in: [tool.ts:962](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L962)

***

### credentials?

> `optional` **credentials**: `boolean`

Defined in: [tool.ts:960](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L960)

***

### end()?

> `optional` **end**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:971](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L971)

#### Returns

`void` \| `Promise`\<`void`\>

***

### error()?

> `optional` **error**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:974](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L974)

#### Returns

`void` \| `Promise`\<`void`\>

***

### headers?

> `optional` **headers**: `HeadersInit`

Defined in: [tool.ts:965](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L965)

***

### load()?

> `optional` **load**: (`res`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:973](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L973)

#### Parameters

##### res

`any`

#### Returns

`void` \| `Promise`\<`void`\>

***

### method?

> `optional` **method**: `"GET"` \| `"POST"`

Defined in: [tool.ts:961](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L961)

***

### progress()?

> `optional` **progress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:972](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L972)

#### Parameters

##### loaded

`number`

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>

***

### responseType?

> `optional` **responseType**: `XMLHttpRequestResponseType`

Defined in: [tool.ts:964](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L964)

***

### start()?

> `optional` **start**: (`total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:970](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L970)

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [tool.ts:963](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L963)

***

### uploadEnd()?

> `optional` **uploadEnd**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:969](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L969)

#### Returns

`void` \| `Promise`\<`void`\>

***

### uploadProgress()?

> `optional` **uploadProgress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:968](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L968)

#### Parameters

##### loaded

`number`

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>

***

### uploadStart()?

> `optional` **uploadStart**: (`total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:967](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L967)

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>
