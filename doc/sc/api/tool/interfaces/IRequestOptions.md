[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [tool.ts:926](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L926)

## Properties

### body?

> `optional` **body**: `FormData`

Defined in: [tool.ts:929](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L929)

***

### credentials?

> `optional` **credentials**: `boolean`

Defined in: [tool.ts:927](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L927)

***

### end()?

> `optional` **end**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:938](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L938)

#### Returns

`void` \| `Promise`\<`void`\>

***

### error()?

> `optional` **error**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:941](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L941)

#### Returns

`void` \| `Promise`\<`void`\>

***

### headers?

> `optional` **headers**: `HeadersInit`

Defined in: [tool.ts:932](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L932)

***

### load()?

> `optional` **load**: (`res`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:940](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L940)

#### Parameters

##### res

`any`

#### Returns

`void` \| `Promise`\<`void`\>

***

### method?

> `optional` **method**: `"GET"` \| `"POST"`

Defined in: [tool.ts:928](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L928)

***

### progress()?

> `optional` **progress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:939](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L939)

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

Defined in: [tool.ts:931](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L931)

***

### start()?

> `optional` **start**: (`total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:937](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L937)

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [tool.ts:930](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L930)

***

### uploadEnd()?

> `optional` **uploadEnd**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:936](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L936)

#### Returns

`void` \| `Promise`\<`void`\>

***

### uploadProgress()?

> `optional` **uploadProgress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:935](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L935)

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

Defined in: [tool.ts:934](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L934)

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>
