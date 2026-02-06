[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPage

# Abstract Class: AbstractPage

Defined in: [purease.ts:89](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L89)

总大页面

## Constructors

### Constructor

> **new AbstractPage**(`opt`): `AbstractPage`

Defined in: [purease.ts:107](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L107)

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

Defined in: [purease.ts:377](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L377)

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

### captchaInfo

> **captchaInfo**: `object`

Defined in: [purease.ts:239](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L239)

验证码窗口

#### now

> **now**: `string`

#### objects

> **objects**: `Record`\<`string`, \{ `cb`: (`opt`) => `void`; `instance`: `any`; \}\>

#### show

> **show**: `boolean`

***

### dialogInfo

> **dialogInfo**: `object`

Defined in: [purease.ts:197](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L197)

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

Defined in: [purease.ts:410](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L410)

是否显示加载框

***

### windowHeight

> **windowHeight**: `number` = `0`

Defined in: [purease.ts:402](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L402)

整个窗口的高度

***

### windowWidth

> **windowWidth**: `number` = `0`

Defined in: [purease.ts:399](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L399)

整个窗口的宽度

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: [purease.ts:162](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L162)

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

Defined in: [purease.ts:95](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L95)

获取系统当前语言

##### Returns

`string`

***

### localePath

#### Get Signature

> **get** **localePath**(): `string`

Defined in: [purease.ts:103](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L103)

获取语言包路径，可能为空

##### Returns

`string`

***

### narrow

#### Get Signature

> **get** **narrow**(): `boolean`

Defined in: [purease.ts:405](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L405)

窗口宽度是否小于等于 800 像素

##### Returns

`boolean`

***

### nextTick

#### Get Signature

> **get** **nextTick**(): () => `Promise`\<`void`\>

Defined in: [purease.ts:155](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L155)

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: [purease.ts:148](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L148)

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

## Methods

### alert()

> **alert**(`content`, `type`): `void`

Defined in: [purease.ts:385](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L385)

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

Defined in: [purease.ts:354](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L354)

弹出一个询问框

#### Parameters

##### opt

`string` | [`IConfirmOptions`](../interfaces/IConfirmOptions.md)

#### Returns

`Promise`\<`number` \| `boolean`\>

***

### dialog()

> **dialog**(`opt`): `Promise`\<`string`\>

Defined in: [purease.ts:212](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L212)

弹出一个框框

#### Parameters

##### opt

`string` | [`IDialogOptions`](../interfaces/IDialogOptions.md)

#### Returns

`Promise`\<`string`\>

***

### hideCaptcha()

> **hideCaptcha**(): `void`

Defined in: [purease.ts:337](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L337)

仅 CF 模式会调用

#### Returns

`void`

***

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:122](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L122)

入口方法，会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:137](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L137)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUpdate()

> **onBeforeUpdate**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:129](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L129)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onReady()

> **onReady**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:125](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L125)

完全加载完成后执行，不会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:141](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L141)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUpdated()

> **onUpdated**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:133](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L133)

#### Returns

`void` \| `Promise`\<`void`\>

***

### showCaptcha()

> **showCaptcha**(`opt`): `Promise`\<`false` \| [`ICaptchaResultEvent`](../../control/interfaces/ICaptchaResultEvent.md)\>

Defined in: [purease.ts:258](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L258)

弹出验证码确认框，确认后可立即提交，可用于登录、发验证码按钮等地方
请勿开启 loading

#### Parameters

##### opt

[`IShowCaptchaOptions`](../interfaces/IShowCaptchaOptions.md)

参数

#### Returns

`Promise`\<`false` \| [`ICaptchaResultEvent`](../../control/interfaces/ICaptchaResultEvent.md)\>

验证是否通过

***

### showLnav()

> **showLnav**(): `void`

Defined in: [purease.ts:426](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L426)

显示 lnav

#### Returns

`void`

***

### toTop()

> **toTop**(): `void`

Defined in: [purease.ts:413](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L413)

滚动到顶部

#### Returns

`void`

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: [purease.ts:185](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L185)

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
