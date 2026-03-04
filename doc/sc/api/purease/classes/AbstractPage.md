[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPage

# Abstract Class: AbstractPage

Defined in: [purease.ts:121](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L121)

总大页面

## Constructors

### Constructor

> **new AbstractPage**(`opt`): `AbstractPage`

Defined in: [purease.ts:139](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L139)

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

Defined in: [purease.ts:409](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L409)

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

Defined in: [purease.ts:271](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L271)

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

Defined in: [purease.ts:229](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L229)

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

Defined in: [purease.ts:442](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L442)

是否显示加载框

***

### windowHeight

> **windowHeight**: `number` = `0`

Defined in: [purease.ts:434](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L434)

整个窗口的高度

***

### windowWidth

> **windowWidth**: `number` = `0`

Defined in: [purease.ts:431](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L431)

整个窗口的宽度

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: [purease.ts:194](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L194)

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

Defined in: [purease.ts:127](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L127)

获取系统当前语言

##### Returns

`string`

***

### localePath

#### Get Signature

> **get** **localePath**(): `string`

Defined in: [purease.ts:135](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L135)

获取语言包路径，可能为空

##### Returns

`string`

***

### narrow

#### Get Signature

> **get** **narrow**(): `boolean`

Defined in: [purease.ts:437](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L437)

窗口宽度是否小于等于 800 像素

##### Returns

`boolean`

***

### nextTick

#### Get Signature

> **get** **nextTick**(): () => `Promise`\<`void`\>

Defined in: [purease.ts:187](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L187)

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: [purease.ts:180](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L180)

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

***

### routeInfo

#### Get Signature

> **get** **routeInfo**(): [`IRouteInfo`](../interfaces/IRouteInfo.md) \| `undefined`

Defined in: [purease.ts:465](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L465)

获取 vue-router 的当前路由信息，需要开启 router

##### Returns

[`IRouteInfo`](../interfaces/IRouteInfo.md) \| `undefined`

## Methods

### alert()

> **alert**(`content`, `type`): `void`

Defined in: [purease.ts:417](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L417)

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

Defined in: [purease.ts:386](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L386)

弹出一个询问框

#### Parameters

##### opt

`string` | [`IConfirmOptions`](../interfaces/IConfirmOptions.md)

#### Returns

`Promise`\<`number` \| `boolean`\>

***

### dialog()

> **dialog**(`opt`): `Promise`\<`string`\>

Defined in: [purease.ts:244](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L244)

弹出一个框框

#### Parameters

##### opt

`string` | [`IDialogOptions`](../interfaces/IDialogOptions.md)

#### Returns

`Promise`\<`string`\>

***

### hideCaptcha()

> **hideCaptcha**(): `void`

Defined in: [purease.ts:369](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L369)

仅 CF 模式会调用

#### Returns

`void`

***

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:154](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L154)

入口方法，会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:169](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L169)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUpdate()

> **onBeforeUpdate**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:161](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L161)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onReady()

> **onReady**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:157](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L157)

完全加载完成后执行，不会阻塞加载进程

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:173](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L173)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUpdated()

> **onUpdated**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:165](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L165)

#### Returns

`void` \| `Promise`\<`void`\>

***

### routerBack()

> **routerBack**(): `void`

Defined in: [purease.ts:491](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L491)

路由后退

#### Returns

`void`

***

### routerForward()

> **routerForward**(): `void`

Defined in: [purease.ts:498](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L498)

路由前进

#### Returns

`void`

***

### routerPush()

> **routerPush**(`to`): `Promise`\<`any`\> \| `undefined`

Defined in: [purease.ts:476](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L476)

路由导航跳转，需要开启 router

#### Parameters

##### to

目标路由

`string` | [`IRouteLocation`](../interfaces/IRouteLocation.md)

#### Returns

`Promise`\<`any`\> \| `undefined`

***

### routerReplace()

> **routerReplace**(`to`): `Promise`\<`any`\> \| `undefined`

Defined in: [purease.ts:484](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L484)

路由导航替换（不留历史记录），需要开启 router

#### Parameters

##### to

目标路由

`string` | [`IRouteLocation`](../interfaces/IRouteLocation.md)

#### Returns

`Promise`\<`any`\> \| `undefined`

***

### showCaptcha()

> **showCaptcha**(`opt`): `Promise`\<`false` \| [`ICaptchaResultEvent`](../../control/interfaces/ICaptchaResultEvent.md)\>

Defined in: [purease.ts:290](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L290)

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

Defined in: [purease.ts:458](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L458)

显示 lnav

#### Returns

`void`

***

### toTop()

> **toTop**(): `void`

Defined in: [purease.ts:445](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L445)

滚动到顶部

#### Returns

`void`

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: [purease.ts:217](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L217)

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
