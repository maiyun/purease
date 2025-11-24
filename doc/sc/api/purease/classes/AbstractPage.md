[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPage

# Abstract Class: AbstractPage

Defined in: purease.ts:89

总大页面

## Constructors

### Constructor

> **new AbstractPage**(`opt`): `AbstractPage`

Defined in: purease.ts:107

#### Parameters

##### opt

###### locale?

`string`

设定当前的程序语言

###### localePath?

`string`

设定语言包所在路径，无所谓是否 / 结尾

#### Returns

`AbstractPage`

## Properties

### alertInfo

> **alertInfo**: `object`

Defined in: purease.ts:262

底部弹出提示框

#### content

> **content**: `string` = `''`

#### show

> **show**: `boolean` = `false`

#### timer

> **timer**: `number` = `0`

#### type

> **type**: `string` = `'default'`

***

### dialogInfo

> **dialogInfo**: `object`

Defined in: purease.ts:197

dialog 信息

#### buttons

> **buttons**: `string`[]

#### content

> **content**: `string`

#### select()?

> `optional` **select**: (`button`) => `void` \| `Promise`\<`void`\>

##### Parameters

###### button

`string`

##### Returns

`void` \| `Promise`\<`void`\>

#### show

> **show**: `boolean`

#### title

> **title**: `string`

***

### loading

> **loading**: `boolean` = `false`

Defined in: purease.ts:290

是否显示加载框

***

### windowHeight

> **windowHeight**: `number` = `0`

Defined in: purease.ts:287

整个窗口的高度

***

### windowWidth

> **windowWidth**: `number` = `0`

Defined in: purease.ts:284

整个窗口的宽度

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: purease.ts:162

获取语言内容

##### Returns

> (`key`, `data?`): `string`

###### Parameters

###### key

`string`

###### data?

`string`[]

###### Returns

`string`

***

### locale

#### Get Signature

> **get** **locale**(): `string`

Defined in: purease.ts:95

获取系统当前语言

##### Returns

`string`

***

### localePath

#### Get Signature

> **get** **localePath**(): `string`

Defined in: purease.ts:103

获取语言包路径，可能为空

##### Returns

`string`

***

### nextTick

#### Get Signature

> **get** **nextTick**(): () => `Promise`\<`void`\>

Defined in: purease.ts:155

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: purease.ts:148

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

## Methods

### alert()

> **alert**(`content`, `type`): `void`

Defined in: purease.ts:270

显示一个 alert，支持 html，请注意传入内容的安全

#### Parameters

##### content

`string`

##### type

`"default"` | `"primary"` | `"info"` | `"warning"` | `"danger"` | `"pe"`

#### Returns

`void`

***

### confirm()

> **confirm**(`opt`): `Promise`\<`number` \| `boolean`\>

Defined in: purease.ts:239

弹出一个询问框

#### Parameters

##### opt

`string` | [`IConfirmOptions`](../interfaces/IConfirmOptions.md)

#### Returns

`Promise`\<`number` \| `boolean`\>

***

### dialog()

> **dialog**(`opt`): `Promise`\<`string`\>

Defined in: purease.ts:212

弹出一个框框

#### Parameters

##### opt

`string` | [`IDialogOptions`](../interfaces/IDialogOptions.md)

#### Returns

`Promise`\<`string`\>

***

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:122

入口方法，会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:137

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUpdate()

> **onBeforeUpdate**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:129

#### Returns

`void` \| `Promise`\<`void`\>

***

### onReady()

> **onReady**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:125

完全加载完成后执行，不会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:141

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUpdated()

> **onUpdated**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:133

#### Returns

`void` \| `Promise`\<`void`\>

***

### showLnav()

> **showLnav**(): `void`

Defined in: purease.ts:306

显示 lnav

#### Returns

`void`

***

### toTop()

> **toTop**(): `void`

Defined in: purease.ts:293

滚动到顶部

#### Returns

`void`

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: purease.ts:185

监视变动

#### Type Parameters

##### T

`T` *extends* `AbstractPage`

##### TK

`TK` *extends* `string` \| `number` \| `symbol`

##### TR

`TR`

#### Parameters

##### name

监视的属性

`TK` | () => `TR`

##### cb

(`val`, `old`) => `void` \| `Promise`\<`void`\>

回调

##### opt

参数

###### deep?

`boolean`

###### immediate?

`boolean`

#### Returns

> (): `void`

##### Returns

`void`
