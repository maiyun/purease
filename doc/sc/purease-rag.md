
quick-start.md
---

# 快速开始

## 安装

首先设置 Purease 模块的加载路径，然后使用 script 模块加载。

**index.html**

```html
<script type="importmap">
{
    "imports": {
        "purease": "https://cdn.jsdelivr.net/npm/purease@1.x.x/dist/index.js"
    }
}
</script>
<script type="module" src="index.js"></script>
```

也可以携带参数和全局变量。

```html
<script>
purease = {
    'config': {
        'cdn': 'https://cdn.jsdelivr.net',
    },
    'global': {},
};
</script>
```

**index.js**

```typescript
import * as purease from 'purease';
class Page extends clickgo.AbstractPage {
    public async main(): Promise<void> {
        // --- 代码写在此处 ---
    }
}
purease.launcher(Page);
```

## 代码提示

安装 Purease 模块后，即可获得代码提示。

```sh
$ npm i purease --save-dev
```
control/index.md
---

[**Documents for purease**](../index.md)

***

[Documents for purease](../index.md) / control

# control

## Interfaces

- [ICaptchaResultEvent](interfaces/ICaptchaResultEvent.md)
- [IDateChangedEvent](interfaces/IDateChangedEvent.md)
- [IDatepanelChangedEvent](interfaces/IDatepanelChangedEvent.md)
- [IDatepanelRangeEvent](interfaces/IDatepanelRangeEvent.md)
- [IDatepanelSelectedEvent](interfaces/IDatepanelSelectedEvent.md)
- [IDlistChangedEvent](interfaces/IDlistChangedEvent.md)
- [ISelectChangedEvent](interfaces/ISelectChangedEvent.md)
- [ISpaHideEvent](interfaces/ISpaHideEvent.md)
- [ISpaShowEvent](interfaces/ISpaShowEvent.md)
- [ISwitchChangeEvent](interfaces/ISwitchChangeEvent.md)
- [ITextBeforechangeEvent](interfaces/ITextBeforechangeEvent.md)

## Type Aliases

- [IDlistClickEvent](type-aliases/IDlistClickEvent.md)

## Variables

- [common](variables/common.md)
- [list](variables/list.md)

control/interfaces/ICaptchaResultEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ICaptchaResultEvent

# Interface: ICaptchaResultEvent

Defined in: control.ts:209

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:210

#### result

> **result**: `number`

#### token

> **token**: `string`

control/interfaces/IDateChangedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDateChangedEvent

# Interface: IDateChangedEvent

Defined in: control.ts:176

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:177

#### value?

> `optional` **value**: `number`

control/interfaces/IDatepanelChangedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDatepanelChangedEvent

# Interface: IDatepanelChangedEvent

Defined in: control.ts:191

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:192

#### value?

> `optional` **value**: `number`

control/interfaces/IDatepanelRangeEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDatepanelRangeEvent

# Interface: IDatepanelRangeEvent

Defined in: control.ts:184

## Extends

- `ICustomEvent`

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:185

#### end

> **end**: `number`

#### start

> **start**: `number`

***

### go

> **go**: `boolean`

Defined in: control.ts:115

#### Inherited from

`ICustomEvent.go`

***

### preventDefault()

> **preventDefault**: () => `void`

Defined in: control.ts:116

#### Returns

`void`

#### Inherited from

`ICustomEvent.preventDefault`

control/interfaces/IDatepanelSelectedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDatepanelSelectedEvent

# Interface: IDatepanelSelectedEvent

Defined in: control.ts:197

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:198

#### date

> **date**: `number`

#### day

> **day**: `number`

#### month

> **month**: `number`

#### str

> **str**: `string`

#### time

> **time**: `number`

#### year

> **year**: `number`

control/interfaces/IDlistChangedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDlistChangedEvent

# Interface: IDlistChangedEvent

Defined in: control.ts:130

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:131

#### index

> **index**: `number`

#### label

> **label**: `string`

#### value

> **value**: `string`

control/interfaces/ISelectChangedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ISelectChangedEvent

# Interface: ISelectChangedEvent

Defined in: control.ts:158

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:159

#### index

> **index**: `number`

#### label

> **label**: `string`

#### value

> **value**: `string`

control/interfaces/ISpaHideEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ISpaHideEvent

# Interface: ISpaHideEvent

Defined in: control.ts:149

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:150

#### next

> **next**: `string`

#### path

> **path**: `string`

control/interfaces/ISpaShowEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ISpaShowEvent

# Interface: ISpaShowEvent

Defined in: control.ts:142

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:143

#### path

> **path**: `string`

#### prev

> **prev**: `string`

control/interfaces/ISwitchChangeEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ISwitchChangeEvent

# Interface: ISwitchChangeEvent

Defined in: control.ts:168

## Extends

- `ICustomEvent`

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:169

#### value

> **value**: `boolean`

***

### go

> **go**: `boolean`

Defined in: control.ts:115

#### Inherited from

`ICustomEvent.go`

***

### preventDefault()

> **preventDefault**: () => `void`

Defined in: control.ts:116

#### Returns

`void`

#### Inherited from

`ICustomEvent.preventDefault`

control/interfaces/ITextBeforechangeEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ITextBeforechangeEvent

# Interface: ITextBeforechangeEvent

Defined in: control.ts:121

## Extends

- `ICustomEvent`

## Properties

### detail

> **detail**: `object`

Defined in: control.ts:122

#### change?

> `optional` **change**: `string`

#### value

> **value**: `string`

***

### go

> **go**: `boolean`

Defined in: control.ts:115

#### Inherited from

`ICustomEvent.go`

***

### preventDefault()

> **preventDefault**: () => `void`

Defined in: control.ts:116

#### Returns

`void`

#### Inherited from

`ICustomEvent.preventDefault`

control/type-aliases/IDlistClickEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDlistClickEvent

# Type Alias: IDlistClickEvent

> **IDlistClickEvent** = [`IDlistChangedEvent`](../interfaces/IDlistChangedEvent.md)

Defined in: control.ts:138

control/variables/common.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / common

# Variable: common

> `const` **common**: `object`

Defined in: control.ts:6

通用的一些方法和 computed

## Type Declaration

### computed

> **computed**: `object`

#### computed.alignHComp()

> **alignHComp**: (`this`) => `string` \| `undefined`

获取 alignH 的 css 属性模式，请确保 $props.alignH 存在

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

`string` \| `undefined`

#### computed.alignVComp()

> **alignVComp**: (`this`) => `string` \| `undefined`

获取 alignH 的 css 属性模式，请确保 props.alignH 存在

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

`string` \| `undefined`

#### computed.isRtl()

> **isRtl**: (`this`) => `boolean`

是否是 rtl 模式

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

`boolean`

#### computed.l()

> **l**: (`this`) => (`key`, `data?`) => `string`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`key`, `data?`): `string`

###### Parameters

###### key

`string`

###### data?

`string`[]

###### Returns

`string`

#### computed.parentByName()

> **parentByName**: (`this`) => (`controlName`) => `Record`\<`string`, `any`\> \| `null`

根据 control name 查询上层控件

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`controlName`): `Record`\<`string`, `any`\> \| `null`

###### Parameters

###### controlName

`string`

###### Returns

`Record`\<`string`, `any`\> \| `null`

#### computed.propArray()

> **propArray**: (`this`) => (`name`) => `any`[]

获取 props 中的 array 类型的值

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `any`[]

###### Parameters

###### name

`string`

###### Returns

`any`[]

#### computed.propBoolean()

> **propBoolean**: (`this`) => (`name`) => `boolean`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `boolean`

###### Parameters

###### name

`string`

###### Returns

`boolean`

#### computed.propInt()

> **propInt**: (`this`) => (`name`) => `number`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `number`

###### Parameters

###### name

`string`

###### Returns

`number`

#### computed.propNumber()

> **propNumber**: (`this`) => (`name`) => `number`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `number`

###### Parameters

###### name

`string`

###### Returns

`number`

control/variables/list.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / list

# Variable: list

> `const` **list**: `Record`\<`string`, \{\[`key`: `string`\]: `any`; `computed?`: `Record`\<`string`, `any`\>; `data?`: () => `Record`\<`string`, `any`\>; `props?`: `Record`\<`string`, \{ `default`: `any`; \}\>; `template`: `string`; \}\> = `{}`

Defined in: control.ts:99

dom/functions/bindDown.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / bindDown

# Function: bindDown()

> **bindDown**\<`T`\>(`oe`, `opt`): `void`

Defined in: dom.ts:208

绑定按下以及弹起事件，touch 和 mouse 只会绑定一个

## Type Parameters

### T

`T` *extends* `TouchEvent` \| `MouseEvent`

## Parameters

### oe

`T`

MouseEvent | TouchEvent

### opt

[`IBindDownOptions`](../interfaces/IBindDownOptions.md)\<`T`\>

回调选项

## Returns

`void`

dom/functions/findParentByClass.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / findParentByClass

# Function: findParentByClass()

> **findParentByClass**(`el`, `name`): `HTMLElement` \| `null`

Defined in: dom.ts:105

通过 class 名查找上层所有标签是否存在

## Parameters

### el

`HTMLElement`

当前标签

### name

`string`

要查找的 class 名

## Returns

`HTMLElement` \| `null`

dom/functions/findParentByTag.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / findParentByTag

# Function: findParentByTag()

> **findParentByTag**(`el`, `name`): `HTMLElement` \| `null`

Defined in: dom.ts:168

通过 tagname 查找上层所有标签是否存在

## Parameters

### el

`HTMLElement`

当前标签

### name

`string`

要查找的 tagname 名，小写，如 table

## Returns

`HTMLElement` \| `null`

dom/functions/hasTouchButMouse.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / hasTouchButMouse

# Function: hasTouchButMouse()

> **hasTouchButMouse**(`e`): `boolean`

Defined in: dom.ts:84

判断当前的事件是否是含有 touch 的设备触发的，如果当前就是 touch 则直接返回 false（false 代表 OK，true 代表 touch 设备却触发了 mouse 事件）

## Parameters

### e

`TouchEvent` | `PointerEvent` | `MouseEvent`

## Returns

`boolean`

dom/functions/hidePop.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / hidePop

# Function: hidePop()

> **hidePop**(`pop?`): `void`

Defined in: dom.ts:36

隐藏正在显示的中的 pop

## Parameters

### pop?

`HTMLElement`

## Returns

`void`

dom/functions/index.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / index

# Function: index()

> **index**(`el`): `number`

Defined in: dom.ts:190

判断一个元素是当前同级的第几位

## Parameters

### el

`HTMLElement`

要判断的元素

## Returns

`number`

dom/functions/isRtl.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / isRtl

# Function: isRtl()

> **isRtl**(): `boolean`

Defined in: dom.ts:332

判断是否是 rtl 布局

## Returns

`boolean`

dom/functions/showPop.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / showPop

# Function: showPop()

> **showPop**(`e`, `pop`): `void`

Defined in: dom.ts:20

将 pop 显示出来

## Parameters

### e

`MouseEvent`

### pop

`HTMLElement`

## Returns

`void`

dom/index.md
---

[**Documents for purease**](../index.md)

***

[Documents for purease](../index.md) / dom

# dom

## Interfaces

- [IBindDownOptions](interfaces/IBindDownOptions.md)

## Type Aliases

- [TDomBorder](type-aliases/TDomBorder.md)

## Functions

- [bindDown](functions/bindDown.md)
- [findParentByClass](functions/findParentByClass.md)
- [findParentByTag](functions/findParentByTag.md)
- [hasTouchButMouse](functions/hasTouchButMouse.md)
- [hidePop](functions/hidePop.md)
- [index](functions/index.md)
- [isRtl](functions/isRtl.md)
- [showPop](functions/showPop.md)

dom/interfaces/IBindDownOptions.md
---

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

dom/type-aliases/TDomBorder.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / TDomBorder

# Type Alias: TDomBorder

> **TDomBorder** = `"lt"` \| `"t"` \| `"tr"` \| `"r"` \| `"rb"` \| `"b"` \| `"bl"` \| `"l"` \| `""`

Defined in: dom.ts:339

方向类型，从左上开始

index.md
---

**Documents for purease**

***

# Documents for purease

## Modules

- [control](control/index.md)
- [dom](dom/index.md)
- [purease](purease/index.md)
- [tool](tool/index.md)

purease/classes/AbstractPage.md
---

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

purease/classes/AbstractPanel.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPanel

# Abstract Class: AbstractPanel

Defined in: purease.ts:313

大页面的内嵌页面

## Constructors

### Constructor

> **new AbstractPanel**(): `AbstractPanel`

#### Returns

`AbstractPanel`

## Properties

### rootPage

> **rootPage**: [`AbstractPage`](AbstractPage.md) & `Record`\<`string`, `any`\>

Defined in: purease.ts:327

获取总大页面对象

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: purease.ts:332

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

### nextTick

#### Get Signature

> **get** **nextTick**(): () => `Promise`\<`void`\>

Defined in: purease.ts:348

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: purease.ts:341

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

## Methods

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:316

入口方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:318

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: purease.ts:322

#### Returns

`void` \| `Promise`\<`void`\>

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: purease.ts:358

监视变动

#### Type Parameters

##### T

`T` *extends* `AbstractPanel`

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

purease/functions/debug.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / debug

# Function: debug()

> **debug**(`message?`, ...`optionalParams?`): `void`

Defined in: purease.ts:752

打印调试信息，线上环境不会打印

## Parameters

### message?

`any`

参数

### optionalParams?

...`any`[]

参数

## Returns

`void`

purease/functions/display.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / display

# Function: display()

> **display**(`message?`, ...`optionalParams?`): `void`

Defined in: purease.ts:765

向控制台直接显示内容，一般情况下禁止使用

## Parameters

### message?

`any`

参数

### optionalParams?

...`any`[]

参数

## Returns

`void`

purease/functions/getCdn.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / getCdn

# Function: getCdn()

> **getCdn**(): `string`

Defined in: purease.ts:399

获取当前 cdn 前缀

## Returns

`string`

purease/functions/getDirname.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / getDirname

# Function: getDirname()

> **getDirname**(`importUrl?`): `string`

Defined in: purease.ts:376

获取当前所在目录（参数留空获取 Purease 所在的目录，不以 / 结尾

## Parameters

### importUrl?

`string`

## Returns

`string`

purease/functions/launcher.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / launcher

# Function: launcher()

> **launcher**\<`T`\>(`page`, `options`): `void`

Defined in: purease.ts:404

运行当前页面

## Type Parameters

### T

`T` *extends* [`AbstractPage`](../classes/AbstractPage.md)

## Parameters

### page

(`opt`) => `T`

### options

#### debug?

`boolean`

生产环境请不要开启，默认不开启，开启后将加载 debug 版框架

#### locale?

`string`

设定当前的程序语言

#### localePath?

`string`

设定语言包所在路径，无所谓是否 / 结尾

#### panels?

`object`[]

要加载的子 panels

## Returns

`void`

purease/index.md
---

[**Documents for purease**](../index.md)

***

[Documents for purease](../index.md) / purease

# purease

## Classes

- [AbstractPage](classes/AbstractPage.md)
- [AbstractPanel](classes/AbstractPanel.md)

## Interfaces

- [IConfirmOptions](interfaces/IConfirmOptions.md)
- [IDialogOptions](interfaces/IDialogOptions.md)
- [IVApp](interfaces/IVApp.md)
- [IVNode](interfaces/IVNode.md)
- [IVue](interfaces/IVue.md)
- [IVueConfig](interfaces/IVueConfig.md)
- [IVueObject](interfaces/IVueObject.md)

## Type Aliases

- [IVueOptionMergeFunction](type-aliases/IVueOptionMergeFunction.md)

## Variables

- [global](variables/global.md)
- [vue](variables/vue.md)

## Functions

- [debug](functions/debug.md)
- [display](functions/display.md)
- [getCdn](functions/getCdn.md)
- [getDirname](functions/getDirname.md)
- [launcher](functions/launcher.md)

## References

### control

Re-exports [control](../control/index.md)

***

### dom

Re-exports [dom](../dom/index.md)

***

### tool

Re-exports [tool](../tool/index.md)

purease/interfaces/IConfirmOptions.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IConfirmOptions

# Interface: IConfirmOptions

Defined in: purease.ts:861

Confirm 选项

## Properties

### cancel?

> `optional` **cancel**: `boolean`

Defined in: purease.ts:866

是否显示取消按钮，默认不显示

***

### content

> **content**: `string`

Defined in: purease.ts:864

支持 html

***

### title?

> `optional` **title**: `string`

Defined in: purease.ts:862

purease/interfaces/IDialogOptions.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IDialogOptions

# Interface: IDialogOptions

Defined in: purease.ts:851

Dialog 选项

## Properties

### buttons?

> `optional` **buttons**: `string`[]

Defined in: purease.ts:855

***

### content

> **content**: `string`

Defined in: purease.ts:854

支持 html

***

### select()?

> `optional` **select**: (`button`) => `boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

Defined in: purease.ts:857

#### Parameters

##### button

`string`

#### Returns

`boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

***

### title?

> `optional` **title**: `string`

Defined in: purease.ts:852

purease/interfaces/IVApp.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: purease.ts:835

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: purease.ts:847

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: purease.ts:838

***

### version

> **version**: `string`

Defined in: purease.ts:845

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: purease.ts:836

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: purease.ts:837

##### Parameters

###### name

`string`

###### config

`any`

##### Returns

`this`

***

### directive()

#### Call Signature

> **directive**(`name`): `any`

Defined in: purease.ts:839

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: purease.ts:840

##### Parameters

###### name

`string`

###### config

`any`

##### Returns

`this`

***

### mixin()

> **mixin**(`mixin`): `this`

Defined in: purease.ts:841

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: purease.ts:842

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: purease.ts:843

#### Type Parameters

##### T

`T`

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`this`

***

### unmount()

> **unmount**(): `void`

Defined in: purease.ts:844

#### Returns

`void`

purease/interfaces/IVNode.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVNode

# Interface: IVNode

Defined in: purease.ts:798

Vue 节点

## Indexable

\[`key`: `string`\]: `any`

## Properties

### children

> **children**: `object` & `IVNode`[]

Defined in: purease.ts:799

#### Type Declaration

##### default

> **default**: () => `IVNode`[] \| `undefined`

***

### props

> **props**: `Record`\<`string`, `any`\>

Defined in: purease.ts:803

***

### type

> **type**: `symbol` \| `Record`\<`string`, `any`\>

Defined in: purease.ts:804

purease/interfaces/IVue.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: purease.ts:773

Vue 实例

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: purease.ts:774

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: purease.ts:775

***

### $el

> **$el**: `HTMLElement`

Defined in: purease.ts:776

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: purease.ts:780

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: purease.ts:781

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: purease.ts:782

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: purease.ts:783

***

### $root

> **$root**: `IVue`

Defined in: purease.ts:784

***

### $slots

> **$slots**: `object`

Defined in: purease.ts:785

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: purease.ts:789

#### Parameters

##### o

`any`

##### cb

(`n`, `o`) => `void`

##### opt?

###### deep?

`boolean`

###### immediate?

`boolean`

#### Returns

`void`

## Methods

### $emit()

> **$emit**(`name`, ...`arg`): `void`

Defined in: purease.ts:777

#### Parameters

##### name

`string`

##### arg

...`any`

#### Returns

`void`

***

### $forceUpdate()

> **$forceUpdate**(): `void`

Defined in: purease.ts:778

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: purease.ts:779

#### Returns

`Promise`\<`void`\>

purease/interfaces/IVueConfig.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: purease.ts:825

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: purease.ts:827

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: purease.ts:829

***

### performance

> **performance**: `boolean`

Defined in: purease.ts:830

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: purease.ts:826

#### Parameters

##### err

`unknown`

##### instance

[`IVue`](IVue.md) | `null`

##### info

`string`

#### Returns

`void`

***

### isCustomElement()

> **isCustomElement**(`tag`): `boolean`

Defined in: purease.ts:828

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: purease.ts:831

#### Parameters

##### msg

`string`

##### instance

[`IVue`](IVue.md) | `null`

##### trace

`string`

#### Returns

`void`

purease/interfaces/IVueObject.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueObject

# Interface: IVueObject

Defined in: purease.ts:809

## Methods

### createApp()

> **createApp**(`opt`): [`IVApp`](IVApp.md)

Defined in: purease.ts:810

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `list?`): `any`

Defined in: purease.ts:818

#### Parameters

##### tag

`string`

##### props?

`any`[] | `Record`\<`string`, `any`\>

##### list?

`any`[]

#### Returns

`any`

***

### reactive()

> **reactive**\<`T`\>(`obj`): `T`

Defined in: purease.ts:812

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`T`

#### Returns

`T`

***

### ref()

> **ref**\<`T`\>(`obj`): `object`

Defined in: purease.ts:811

#### Type Parameters

##### T

`T` *extends* `string` \| `number`

#### Parameters

##### obj

`T`

#### Returns

`object`

##### value

> **value**: `T`

***

### watch()

> **watch**(`v`, `cb`, `opt`): `void`

Defined in: purease.ts:813

#### Parameters

##### v

`any`

##### cb

(`n`, `o`) => `void` \| `Promise`\<`void`\>

##### opt

`Record`\<`string`, `string` \| `boolean`\>

#### Returns

`void`

purease/type-aliases/IVueOptionMergeFunction.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueOptionMergeFunction

# Type Alias: IVueOptionMergeFunction()

> **IVueOptionMergeFunction** = (`to`, `from`, `instance`) => `any`

Defined in: purease.ts:822

Vue 选项合并函数

## Parameters

### to

`unknown`

### from

`unknown`

### instance

[`IVue`](../interfaces/IVue.md)

## Returns

`any`

purease/variables/global.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / global

# Variable: global

> **global**: `any`

Defined in: purease.ts:390

用户定义的全局对象

purease/variables/vue.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / vue

# Variable: vue

> **vue**: [`IVueObject`](../interfaces/IVueObject.md)

Defined in: purease.ts:372

vue 对象

tool/functions/blob2DataUrl.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / blob2DataUrl

# Function: blob2DataUrl()

> **blob2DataUrl**(`blob`): `Promise`\<`string`\>

Defined in: tool.ts:646

将 blob 对象转换为 base64 url

## Parameters

### blob

`Blob`

对象

## Returns

`Promise`\<`string`\>

tool/functions/blob2Text.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / blob2Text

# Function: blob2Text()

> **blob2Text**(`blob`): `Promise`\<`string`\>

Defined in: tool.ts:627

将 blob 对象转换为 text

## Parameters

### blob

`Blob`

对象

## Returns

`Promise`\<`string`\>

tool/functions/clone.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / clone

# Function: clone()

> **clone**\<`T`\>(`obj`): `T`

Defined in: tool.ts:29

完整的克隆一份数组/对象

## Type Parameters

### T

`T`

## Parameters

### obj

`T`

要克隆的对象

## Returns

`T`

tool/functions/escapeHTML.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / escapeHTML

# Function: escapeHTML()

> **escapeHTML**(`html`): `string`

Defined in: tool.ts:249

转义 HTML

## Parameters

### html

`string`

HTML 字符

## Returns

`string`

tool/functions/fetch.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / fetch

# Function: fetch()

> **fetch**(`url`, `init?`): `Promise`\<`string` \| `Blob` \| `null`\>

Defined in: tool.ts:345

发起 fetch 请求

## Parameters

### url

`string`

网址

### init?

`RequestInit`

选项

## Returns

`Promise`\<`string` \| `Blob` \| `null`\>

文本或二进制数据，失败时返回 null

tool/functions/formatSecond.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / formatSecond

# Function: formatSecond()

> **formatSecond**(`second`): `string`

Defined in: tool.ts:662

将秒数格式化为 0:0:0 的字符串

## Parameters

### second

`number`

## Returns

`string`

tool/functions/formatTime.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / formatTime

# Function: formatTime()

> **formatTime**(`ts`, `tz?`): `object`

Defined in: tool.ts:675

将日期对象或毫秒级时间戳转换为字符串

## Parameters

### ts

时间戳或日期对象

`number` | `Date`

### tz?

`number`

传入要显示的时区，小时，如 8，默认以当前客户端时区为准

## Returns

`object`

### date

> **date**: `string`

### time

> **time**: `string`

### zone

> **zone**: `string`

tool/functions/get.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / get

# Function: get()

> **get**(`url`, `init?`, `opt?`): `Promise`\<`string` \| `Blob` \| `null`\>

Defined in: tool.ts:371

发起 GET 请求

## Parameters

### url

`string`

网址

### init?

`RequestInit`

选项

### opt?

选项

#### retry?

`number`

重试次数，默认 3 次

## Returns

`Promise`\<`string` \| `Blob` \| `null`\>

文本或二进制数据，失败时返回 null

tool/functions/getArray.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / getArray

# Function: getArray()

> **getArray**(`param`): `any`[]

Defined in: tool.ts:218

根据参数获取最终的数组型，可传入类似 [1,2,3] 或 1,2,3

## Parameters

### param

参数

`string` | `any`[]

## Returns

`any`[]

tool/functions/getBoolean.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / getBoolean

# Function: getBoolean()

> **getBoolean**(`param`): `boolean`

Defined in: tool.ts:192

根据参数获取最终的布尔值

## Parameters

### param

参数

`string` | `number` | `boolean` | `undefined`

## Returns

`boolean`

tool/functions/getClassPrototype.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / getClassPrototype

# Function: getClassPrototype()

> **getClassPrototype**(`obj`, `over`, `level`): `IClassPrototype`

Defined in: tool.ts:88

获取 class 的所有 method 和 get/set

## Parameters

### obj

`object`

实例化 class 对象

### over

`string`[] = `[]`

不传入此参数

### level

`number` = `0`

不传入此参数

## Returns

`IClassPrototype`

tool/functions/getDecimal.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / getDecimal

# Function: getDecimal()

> **getDecimal**(`number`): `number`

Defined in: tool.ts:240

获取数字的单纯小数点部分

## Parameters

### number

`number`

## Returns

`number`

tool/functions/getNumber.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / getNumber

# Function: getNumber()

> **getNumber**(`param`): `number`

Defined in: tool.ts:207

根据参数获取最终的数字型

## Parameters

### param

参数

`string` | `number`

## Returns

`number`

tool/functions/getResponseJson.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / getResponseJson

# Function: getResponseJson()

> **getResponseJson**(`url`, `init?`): `Promise`\<`any`\>

Defined in: tool.ts:423

发起 GET 请求并解析 JSON 响应

## Parameters

### url

`string`

网址

### init?

`RequestInit`

选项

## Returns

`Promise`\<`any`\>

JSON 数据，失败时返回 null

tool/functions/isDomain.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / isDomain

# Function: isDomain()

> **isDomain**(`domain`): `boolean`

Defined in: tool.ts:771

判断是否是域名

## Parameters

### domain

`string`

## Returns

`boolean`

bool

tool/functions/isEMail.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / isEMail

# Function: isEMail()

> **isEMail**(`email`): `boolean`

Defined in: tool.ts:746

是否是邮件地址

## Parameters

### email

`string`

## Returns

`boolean`

tool/functions/isIPv4.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / isIPv4

# Function: isIPv4()

> **isIPv4**(`ip`): `boolean`

Defined in: tool.ts:754

是否是 IPv4

## Parameters

### ip

`string`

## Returns

`boolean`

tool/functions/isIPv6.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / isIPv6

# Function: isIPv6()

> **isIPv6**(`ip`): `boolean`

Defined in: tool.ts:762

是否是 IPv6

## Parameters

### ip

`string`

## Returns

`boolean`

tool/functions/isPhoneCN.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / isPhoneCN

# Function: isPhoneCN()

> **isPhoneCN**(`p`): `boolean`

Defined in: tool.ts:781

判断手机号是否是 11 位，不做真实性校验

## Parameters

### p

`string`

手机号

## Returns

`boolean`

tool/functions/loadLink.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / loadLink

# Function: loadLink()

> **loadLink**(`url`, `pos`): `Promise`\<`boolean`\>

Defined in: tool.ts:870

加载 css 文件

## Parameters

### url

`string`

css 文件网址

### pos

`"before"` | `"after"`

## Returns

`Promise`\<`boolean`\>

加载是否成功

tool/functions/loadLinks.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / loadLinks

# Function: loadLinks()

> **loadLinks**(`urls`, `opt`): `Promise`\<`void`\>

Defined in: tool.ts:896

批量加载 css 文件

## Parameters

### urls

`string`[]

css 文件列表

### opt

选项

#### loaded?

(`url`, `state`) => `void`

## Returns

`Promise`\<`void`\>

tool/functions/loadScript.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / loadScript

# Function: loadScript()

> **loadScript**(`url`): `Promise`\<`boolean`\>

Defined in: tool.ts:818

加载脚本

## Parameters

### url

`string`

脚本网址

## Returns

`Promise`\<`boolean`\>

tool/functions/loadScripts.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / loadScripts

# Function: loadScripts()

> **loadScripts**(`urls`, `opt`): `Promise`\<`void`\>

Defined in: tool.ts:837

批量加载 js 文件

## Parameters

### urls

`string`[]

js 文件列表

### opt

选项

#### loaded?

(`url`, `state`) => `void`

## Returns

`Promise`\<`void`\>

tool/functions/parseUrl.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / parseUrl

# Function: parseUrl()

> **parseUrl**(`url`): [`IUrl`](../interfaces/IUrl.md)

Defined in: tool.ts:468

传输 url 并解析为 IUrl 对象

## Parameters

### url

`string`

url 字符串

## Returns

[`IUrl`](../interfaces/IUrl.md)

tool/functions/post.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / post

# Function: post()

> **post**(`url`, `data`, `init?`): `Promise`\<`string` \| `Blob` \| `null`\>

Defined in: tool.ts:398

发起 POST 请求

## Parameters

### url

`string`

网址

### data

数据

`Record`\<`string`, `any`\> | `FormData`

### init?

`RequestInit`

选项

## Returns

`Promise`\<`string` \| `Blob` \| `null`\>

文本或二进制数据，失败时返回 null

tool/functions/postResponseJson.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / postResponseJson

# Function: postResponseJson()

> **postResponseJson**(`url`, `data`, `init?`): `Promise`\<`any`\>

Defined in: tool.ts:446

发起 POST 请求并解析 JSON 响应

## Parameters

### url

`string`

网址

### data

数据

`Record`\<`string`, `any`\> | `FormData`

### init?

`RequestInit`

选项

## Returns

`Promise`\<`any`\>

JSON 数据，失败时返回 null

tool/functions/purify.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / purify

# Function: purify()

> **purify**(`text`): `string`

Defined in: tool.ts:789

去除 html 的空白符、换行以及注释

## Parameters

### text

`string`

要纯净的字符串

## Returns

`string`

tool/functions/queryParse.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / queryParse

# Function: queryParse()

> **queryParse**(`query`): `Record`\<`string`, `string` \| `string`[]\>

Defined in: tool.ts:715

将 query string 转换为对象

## Parameters

### query

`string`

要转换的字符串

## Returns

`Record`\<`string`, `string` \| `string`[]\>

tool/functions/queryStringify.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / queryStringify

# Function: queryStringify()

> **queryStringify**(`query`): `string`

Defined in: tool.ts:702

将对象转换为 query string

## Parameters

### query

`Record`\<`string`, `any`\>

要转换的对象

## Returns

`string`

tool/functions/rand.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / rand

# Function: rand()

> **rand**(`min`, `max`): `number`

Defined in: tool.ts:152

生成范围内的随机数

## Parameters

### min

`number`

最新范围

### max

`number`

最大范围

## Returns

`number`

tool/functions/random.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / random

# Function: random()

> **random**(`length`, `source`, `block`): `string`

Defined in: tool.ts:169

## Parameters

### length

`number` = `8`

### source

`string` = `RANDOM_LN`

### block

`string` = `''`

## Returns

`string`

tool/functions/request.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / request

# Function: request()

> **request**(`url`, `opt`): `Promise`\<`any`\>

Defined in: tool.ts:258

发起一个网络请求，若是返回值是 JSON 则自动解析，否则直接返回字符串

## Parameters

### url

`string`

网址

### opt

[`IRequestOptions`](../interfaces/IRequestOptions.md)

选项

## Returns

`Promise`\<`any`\>

tool/functions/sleep.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / sleep

# Function: sleep()

> **sleep**(`ms`): `Promise`\<`boolean`\>

Defined in: tool.ts:139

等待毫秒

## Parameters

### ms

`number` = `0`

等待的毫秒，默认 0

## Returns

`Promise`\<`boolean`\>

tool/functions/urlAtom.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / urlAtom

# Function: urlAtom()

> **urlAtom**(`url`): `string`

Defined in: tool.ts:610

处理 URL 中的 .. / . 等

## Parameters

### url

`string`

## Returns

`string`

tool/functions/urlResolve.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / urlResolve

# Function: urlResolve()

> **urlResolve**(`from`, `to`): `string`

Defined in: tool.ts:551

将相对路径根据基准路径进行转换

## Parameters

### from

`string`

基准路径

### to

`string`

相对路径

## Returns

`string`

tool/index.md
---

[**Documents for purease**](../index.md)

***

[Documents for purease](../index.md) / tool

# tool

## Interfaces

- [IRequestOptions](interfaces/IRequestOptions.md)
- [IUrl](interfaces/IUrl.md)

## Variables

- [RANDOM\_L](variables/RANDOM_L.md)
- [RANDOM\_LN](variables/RANDOM_LN.md)
- [RANDOM\_LU](variables/RANDOM_LU.md)
- [RANDOM\_LUN](variables/RANDOM_LUN.md)
- [RANDOM\_LUNS](variables/RANDOM_LUNS.md)
- [RANDOM\_N](variables/RANDOM_N.md)
- [RANDOM\_U](variables/RANDOM_U.md)
- [RANDOM\_UN](variables/RANDOM_UN.md)
- [RANDOM\_V](variables/RANDOM_V.md)

## Functions

- [blob2DataUrl](functions/blob2DataUrl.md)
- [blob2Text](functions/blob2Text.md)
- [clone](functions/clone.md)
- [escapeHTML](functions/escapeHTML.md)
- [fetch](functions/fetch.md)
- [formatSecond](functions/formatSecond.md)
- [formatTime](functions/formatTime.md)
- [get](functions/get.md)
- [getArray](functions/getArray.md)
- [getBoolean](functions/getBoolean.md)
- [getClassPrototype](functions/getClassPrototype.md)
- [getDecimal](functions/getDecimal.md)
- [getNumber](functions/getNumber.md)
- [getResponseJson](functions/getResponseJson.md)
- [isDomain](functions/isDomain.md)
- [isEMail](functions/isEMail.md)
- [isIPv4](functions/isIPv4.md)
- [isIPv6](functions/isIPv6.md)
- [isPhoneCN](functions/isPhoneCN.md)
- [loadLink](functions/loadLink.md)
- [loadLinks](functions/loadLinks.md)
- [loadScript](functions/loadScript.md)
- [loadScripts](functions/loadScripts.md)
- [parseUrl](functions/parseUrl.md)
- [post](functions/post.md)
- [postResponseJson](functions/postResponseJson.md)
- [purify](functions/purify.md)
- [queryParse](functions/queryParse.md)
- [queryStringify](functions/queryStringify.md)
- [rand](functions/rand.md)
- [random](functions/random.md)
- [request](functions/request.md)
- [sleep](functions/sleep.md)
- [urlAtom](functions/urlAtom.md)
- [urlResolve](functions/urlResolve.md)

tool/interfaces/IRequestOptions.md
---

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

tool/interfaces/IUrl.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / IUrl

# Interface: IUrl

Defined in: tool.ts:927

网址对象

## Properties

### auth

> **auth**: `string` \| `null`

Defined in: tool.ts:928

***

### hash

> **hash**: `string` \| `null`

Defined in: tool.ts:929

***

### host

> **host**: `string` \| `null`

Defined in: tool.ts:930

***

### hostname

> **hostname**: `string` \| `null`

Defined in: tool.ts:931

***

### pass

> **pass**: `string` \| `null`

Defined in: tool.ts:932

***

### path

> **path**: `string` \| `null`

Defined in: tool.ts:933

***

### pathname

> **pathname**: `string`

Defined in: tool.ts:934

***

### port

> **port**: `string` \| `null`

Defined in: tool.ts:936

***

### protocol

> **protocol**: `string` \| `null`

Defined in: tool.ts:935

***

### query

> **query**: `string` \| `null`

Defined in: tool.ts:937

***

### user

> **user**: `string` \| `null`

Defined in: tool.ts:938

tool/variables/RANDOM_L.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_L

# Variable: RANDOM\_L

> `const` **RANDOM\_L**: `"abcdefghijklmnopqrstuvwxyz"` = `'abcdefghijklmnopqrstuvwxyz'`

Defined in: tool.ts:161

tool/variables/RANDOM_LN.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LN

# Variable: RANDOM\_LN

> `const` **RANDOM\_LN**: `string`

Defined in: tool.ts:164

tool/variables/RANDOM_LU.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LU

# Variable: RANDOM\_LU

> `const` **RANDOM\_LU**: `string`

Defined in: tool.ts:165

tool/variables/RANDOM_LUN.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LUN

# Variable: RANDOM\_LUN

> `const` **RANDOM\_LUN**: `string`

Defined in: tool.ts:166

tool/variables/RANDOM_LUNS.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LUNS

# Variable: RANDOM\_LUNS

> `const` **RANDOM\_LUNS**: `string`

Defined in: tool.ts:168

tool/variables/RANDOM_N.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_N

# Variable: RANDOM\_N

> `const` **RANDOM\_N**: `"0123456789"` = `'0123456789'`

Defined in: tool.ts:159

tool/variables/RANDOM_U.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_U

# Variable: RANDOM\_U

> `const` **RANDOM\_U**: `"ABCDEFGHIJKLMNOPQRSTUVWXYZ"` = `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`

Defined in: tool.ts:160

tool/variables/RANDOM_UN.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_UN

# Variable: RANDOM\_UN

> `const` **RANDOM\_UN**: `string`

Defined in: tool.ts:163

tool/variables/RANDOM_V.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_V

# Variable: RANDOM\_V

> `const` **RANDOM\_V**: `"ACEFGHJKLMNPRSTWXY34567"` = `'ACEFGHJKLMNPRSTWXY34567'`

Defined in: tool.ts:167
