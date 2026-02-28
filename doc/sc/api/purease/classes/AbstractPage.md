[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPage

# Abstract Class: AbstractPage

Defined in: [purease.ts:114](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L114)

总大页面

## Constructors

### Constructor

> **new AbstractPage**(`opt`): `AbstractPage`

Defined in: [purease.ts:132](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L132)

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

Defined in: [purease.ts:402](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L402)

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

Defined in: [purease.ts:264](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L264)

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

Defined in: [purease.ts:222](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L222)

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

Defined in: [purease.ts:435](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L435)

是否显示加载框

***

### windowHeight

> **windowHeight**: `number` = `0`

Defined in: [purease.ts:427](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L427)

整个窗口的高度

***

### windowWidth

> **windowWidth**: `number` = `0`

Defined in: [purease.ts:424](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L424)

整个窗口的宽度

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: [purease.ts:187](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L187)

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

Defined in: [purease.ts:120](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L120)

获取系统当前语言

##### Returns

`string`

***

### localePath

#### Get Signature

> **get** **localePath**(): `string`

Defined in: [purease.ts:128](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L128)

获取语言包路径，可能为空

##### Returns

`string`

***

### narrow

#### Get Signature

> **get** **narrow**(): `boolean`

Defined in: [purease.ts:430](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L430)

窗口宽度是否小于等于 800 像素

##### Returns

`boolean`

***

### nextTick

#### Get Signature

> **get** **nextTick**(): () => `Promise`\<`void`\>

Defined in: [purease.ts:180](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L180)

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: [purease.ts:173](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L173)

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

## Methods

### alert()

> **alert**(`content`, `type`): `void`

Defined in: [purease.ts:410](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L410)

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

Defined in: [purease.ts:379](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L379)

弹出一个询问框

#### Parameters

##### opt

`string` | [`IConfirmOptions`](../interfaces/IConfirmOptions.md)

#### Returns

`Promise`\<`number` \| `boolean`\>

***

### dialog()

> **dialog**(`opt`): `Promise`\<`string`\>

Defined in: [purease.ts:237](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L237)

弹出一个框框

#### Parameters

##### opt

`string` | [`IDialogOptions`](../interfaces/IDialogOptions.md)

#### Returns

`Promise`\<`string`\>

***

### hideCaptcha()

> **hideCaptcha**(): `void`

Defined in: [purease.ts:362](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L362)

仅 CF 模式会调用

#### Returns

`void`

***

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:147](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L147)

入口方法，会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:162](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L162)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUpdate()

> **onBeforeUpdate**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:154](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L154)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onReady()

> **onReady**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:150](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L150)

完全加载完成后执行，不会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:166](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L166)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUpdated()

> **onUpdated**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:158](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L158)

#### Returns

`void` \| `Promise`\<`void`\>

***

### showCaptcha()

> **showCaptcha**(`opt`): `Promise`\<`false` \| [`ICaptchaResultEvent`](../../control/interfaces/ICaptchaResultEvent.md)\>

Defined in: [purease.ts:283](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L283)

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

Defined in: [purease.ts:451](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L451)

显示 lnav

#### Returns

`void`

***

### toTop()

> **toTop**(): `void`

Defined in: [purease.ts:438](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L438)

滚动到顶部

#### Returns

`void`

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: [purease.ts:210](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L210)

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
