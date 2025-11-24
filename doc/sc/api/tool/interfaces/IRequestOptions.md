[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: tool.ts:941

## Properties

### body?

> `optional` **body**: `FormData`

Defined in: tool.ts:944

***

### credentials?

> `optional` **credentials**: `boolean`

Defined in: tool.ts:942

***

### end()?

> `optional` **end**: () => `void` \| `Promise`\<`void`\>

Defined in: tool.ts:953

#### Returns

`void` \| `Promise`\<`void`\>

***

### error()?

> `optional` **error**: () => `void` \| `Promise`\<`void`\>

Defined in: tool.ts:956

#### Returns

`void` \| `Promise`\<`void`\>

***

### headers?

> `optional` **headers**: `HeadersInit`

Defined in: tool.ts:947

***

### load()?

> `optional` **load**: (`res`) => `void` \| `Promise`\<`void`\>

Defined in: tool.ts:955

#### Parameters

##### res

`any`

#### Returns

`void` \| `Promise`\<`void`\>

***

### method?

> `optional` **method**: `"GET"` \| `"POST"`

Defined in: tool.ts:943

***

### progress()?

> `optional` **progress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: tool.ts:954

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

Defined in: tool.ts:946

***

### start()?

> `optional` **start**: (`total`) => `void` \| `Promise`\<`void`\>

Defined in: tool.ts:952

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>

***

### timeout?

> `optional` **timeout**: `number`

Defined in: tool.ts:945

***

### uploadEnd()?

> `optional` **uploadEnd**: () => `void` \| `Promise`\<`void`\>

Defined in: tool.ts:951

#### Returns

`void` \| `Promise`\<`void`\>

***

### uploadProgress()?

> `optional` **uploadProgress**: (`loaded`, `total`) => `void` \| `Promise`\<`void`\>

Defined in: tool.ts:950

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

Defined in: tool.ts:949

#### Parameters

##### total

`number`

#### Returns

`void` \| `Promise`\<`void`\>
