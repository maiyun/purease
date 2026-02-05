[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [tool.ts:921](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L921)

## Properties

### body?

> `optional` **body**: `FormData`

Defined in: [tool.ts:924](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L924)

***

### credentials?

> `optional` **credentials**: `boolean`

Defined in: [tool.ts:922](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L922)

***

### end()?

> `optional` **end**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:933](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L933)

#### Returns

`void` \| `Promise`\<`void`\>

***

### error()?

> `optional` **error**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:936](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L936)

#### Returns

`void` \| `Promise`\<`void`\>

***

### headers?

> `optional` **headers**: `HeadersInit`

Defined in: [tool.ts:927](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L927)

***

### load()?

> `optional` **load**: (`res`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:935](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L935)

#### Parameters

##### res

`any`

#### Returns

`void` \| `Promise`\<`void`\>

***

### method?

> `optional` **method**: `"GET"` \| `"POST"`

Defined in: [tool.ts:923](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L923)

***

### progress()?

> `optional` **progress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:934](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L934)

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

Defined in: [tool.ts:926](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L926)

***

### start()?

> `optional` **start**: (`total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:932](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L932)

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [tool.ts:925](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L925)

***

### uploadEnd()?

> `optional` **uploadEnd**: () => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:931](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L931)

#### Returns

`void` \| `Promise`\<`void`\>

***

### uploadProgress()?

> `optional` **uploadProgress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: [tool.ts:930](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L930)

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

Defined in: [tool.ts:929](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L929)

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>
