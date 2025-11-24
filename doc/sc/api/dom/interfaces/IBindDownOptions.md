[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / IBindDownOptions

# Interface: IBindDownOptions\<T\>

Defined in: dom.ts:342

绑定鼠标事件选项

## Type Parameters

### T

`T` *extends* `MouseEvent` \| `TouchEvent`

## Properties

### down()?

> `optional` **down**: (`e`) => `void`

Defined in: dom.ts:343

#### Parameters

##### e

`T`

#### Returns

`void`

***

### end()?

> `optional` **end**: (`e`) => `void` \| `Promise`\<`void`\>

Defined in: dom.ts:350

#### Parameters

##### e

`T`

#### Returns

`void` \| `Promise`\<`void`\>

***

### move()?

> `optional` **move**: (`e`, `dir`) => `any`

Defined in: dom.ts:345

#### Parameters

##### e

`T`

##### dir

`"top"` | `"right"` | `"bottom"` | `"left"`

#### Returns

`any`

***

### start()?

> `optional` **start**: (`e`) => `any`

Defined in: dom.ts:344

#### Parameters

##### e

`T`

#### Returns

`any`

***

### up()?

> `optional` **up**: (`e`) => `void` \| `Promise`\<`void`\>

Defined in: dom.ts:349

#### Parameters

##### e

`T`

#### Returns

`void` \| `Promise`\<`void`\>
