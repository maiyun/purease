
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
        "purease": "https://cdn.jsdelivr.net/npm/purease@x.x.x/dist/index.js"
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

布局代码直接写在 `body` 内即可，例如：

```html
<body>
<pe-banner class="index" direction="v" style="height: 600px;">
    <div class="pe-btitle">I'm glad to see you</div>
    <div class="pe-bnote">With Purease, you can quickly build a versatile, minimalist webpage.</div>
    <div class="pe-layout pe-gap-s" style="align-items: center;">
        <a class="pe-button pe-plain" href="./">Download</a>
        <a class="pe-button pe-dark" href="./">Download</a>
    </div>
</pe-banner>
</body>
```

- 注意：html 元素需要增加 `style="visibility: hidden; overflow: hidden;"` 样式，防止还未加载完之前显示错版页面。

**index.js**

```ts
import * as purease from 'purease';
class Page extends clickgo.AbstractPage {
    public async main(): Promise<void> {
        // --- 代码写在此处 ---
    }
}
purease.launcher(Page);
```

根据情况可以多个页面共用同一个 Page（即载入同一个定义了 Page 类的 js 文件）。

## 代码提示

安装 Purease 模块后，即可获得代码提示。

```sh
$ npm i purease --save-dev
```
combo-page.md
---

# 组合式页面

一般情况下，定义的单 Page 类可以在一个或多个页面共用，但比如 header、footer 等可能是额外定义的公共页面和类，然后引入进来，此时需要用组合式页面的方案。

## 定义公共页面

每张网页只能有最多一个 Page 类，因此公共页面需要使用 Panel。

我们先定义要公用的 footer，首先创建 `footer.html`（或你项目自定义的如在 Kebab 下即创建 `footer.ejs`），然后在 `footer` 内写入 HTML 内容（不要带 `html`、`body`、`head` 等标签），例如：

```html
<script>
purease.global = {
    ...purease.global,
    'footerInfo': '222'
};
</script>
<style>
.teststyle {
    color: var(--danger);
}
</style>
<pe-footer>
    <div class="pe-footer-list pe-footer-end">
        <div class="pe-footer-logo"></div>
    </div>
    <div class="pe-footer-list">
        <div class="pe-footer-title">List 1</div>
        <a href="./">Page 1</a>
    </div>
    <div class="pe-footer-list">
        <div class="pe-footer-title">List 2</div>
        <a href="./" target="_blank">Page 1<pe-icon></pe-icon></a>
        <a href="./">Page 2</a>
    </div>
    <div class="pe-footer-list">
        <div class="pe-footer-title">List 3</div>
        <a href="./">Page 1</a>
    </div>
    <template v-slot:bottom>
        <div class="pe-footer-bottom-row">
            <div class="pe-alayout" style="gap: 10px; align-items: center;">
                <div>This is some footer information</div>
                <div>Note2</div>
            </div>
        </div>
        <div class="pe-footer-bottom-row teststyle">
            <div class="pe-layout">Item1</div>
            <div class="pe-layout">Item3</div>
            <div class="pe-layout">{{text}}</div>
        </div>
    </template>
</pe-footer>
```

若不需要 script 和 style 可以不写。

> global 数据也是与当前页面的 global 合并的，所以要注意不能重名

> style 的类属性也是全局的，因此不能和全局类属性重名

对应的 footer.ts 编写示例：

```ts
import * as purease from 'purease';

export default class extends purease.AbstractPanel {

    public text = 'Item4';

    public async main(): Promise<void> {
        await purease.tool.sleep(2000);
        this.text = 'Test';
    }

}
```

## 定义主页面

需要在主页面中引入公共页面，我们先定义主页面的布局，例如 `index.ejs` 文件：

```html
<!DOCTYPE HTML>
<html style="visibility: hidden; overflow: hidden;">
<head>
<title>Control - Purease Test</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<script type="importmap">
{
    "imports": {
        "purease": "https://cdn.jsdelivr.net/npm/purease@x.x.x/dist/index.js"
    }
}
</script>
<script>
purease = {
    'config': {
        'cdn': 'https://cdn.jsdelivr.net',
    },
    'global': {},
};
</script>
<script type="module" src="./index.js"></script>
</head>
<body>
<div id="header"><!-- 此处可动态引入 header 的公共页面，可参看下方 footer 处用 ejs 的形式动态引入的示例 --></div>
<pe-banner class="pe-grey" direction="v" style="height: 350px;">
    <div class="pe-btitle">The main page</div>
    <div class="pe-bnote">Hello world!</div>
</pe-banner>
<!-- 其他主页面元素 -->
<div id="footer"><%- footer %></div>
</body>
</html>
```

其中，`footer` 变量是已经传给了 ejs 库的 `footer.ejs` 的布局内容，接下来我们编写 `index.ts` 示例：

```ts
import * as purease from 'purease';
import footer from './footer.js';

class Page extends purease.AbstractPage {

    public test = 0;

    public main(): void {
        purease.display('Inited.', purease);
    }

    public onReady(): void {
        purease.display('onReady', purease);
    }

}

purease.launcher(Page, {
    'debug': true,
    'locale': 'sc',
    'localePath': purease.getDirname(import.meta.url) + '/locale',
    'panels': [
        {
            'selector': '#footer',
            'panel': footer,
        }
    ]
});
```

也就是需要在主页面的代码中先 import 公共页面的 js 文件，然后在 `launcher` 方法中配置 `panels` 数组，`selector` 参数对应 dom 选择器定义公共页面在主页面的中的位置。
global-style.md
---

# 全局样式

## 变量

### 基础颜色

- `--main`: 基础颜色
- `--pe`: 主题色，默认值为 `var(--main)`
- `--pe-color`: 基础文字颜色
- `--pe-disabled-color`: 禁用状态文字颜色
- `--pe-note-color`: 备注/说明文字颜色
- `--pe-inote-color`: 强调备注文字颜色
- `--pe-fcolor`: 前景色（浅色/白色）

### 主题色衍生

- `--pe-hover`: 主题色 hover 状态（增加白色 10%）
- `--pe-active`: 主题色 active 状态（增加黑色 10%）
- `--pe-focus`: 主题色 focus 状态（增加黑色 5%）
- `--pe-bg`: 主题色浅色背景（增加白色 85%）

### 背景颜色

- `--pe-grey`: 通常用于浅色背景或 hover 效果
- `--pe-grey-hover`: 灰色 hover 效果
- `--pe-dark`: 超深背景色
- `--pe-input-bg`: 输入型控件的默认底色
- `--pe-input-hover-bg`: 输入型控件的 hover 底色

### 边框与阴影

- `--pe-border`: 常规边框颜色
- `--pe-border-plain`: 浅边框颜色（用于组件内部的轻边框）
- `--pe-shadow`: 小阴影
- `--pe-shadow-d`: 小阴影 dark 版
- `--pe-pop-shadow`: 弹出层阴影
- `--pe-outline-shadow`: active 状态的类似 outline 边框阴影

### 动画与过渡

- `--pe-cubic`: 三次贝塞尔缓动函数
- `--pe-transition`: 全局过渡动画（应用于 all，时长 0.3s）

### 圆角

- `--pe-radius`: 标准圆角（5px）
- `--pe-radius-l`: 较大圆角（10px）
- `--pe-radius-xl`: 超大圆角（30px，小屏 20px）

### 字体

- `--pe-font-life`: 生活/衬线字体族
- `--pe-font-comm`: 常用/无衬线字体族

### 内边距

- `--pe-padding-l`: 大内边距（60px，小屏 40px）
- `--pe-padding`: 标准内边距（40px，小屏 30px）
- `--pe-padding-s`: 小内边距（20px，小屏 14px）
- `--pe-padding-xs`: 超小内边距（15px，小屏 12px）
- `--pe-padding-xxs`: 极小内边距（8px，小屏 4px）

### 间距

- `--pe-gap-m`: 中间距（40px）
- `--pe-gap-s`: 小间距（20px）
- `--pe-gap-xs`: 超小间距（10px）
- `--pe-gap-xxs`: 极小间距（5px）

### 字号

- `--pe-size-xxxl`: 超大字号（42px，小屏 32px）
- `--pe-size-xxl`: 较大字号（32px，小屏 22px）
- `--pe-size-xl`: 大字号（26px，小屏 20px）
- `--pe-size-l`: 中大字号（22px，小屏 18px）
- `--pe-size`: 标准字号（16px，小屏 14px）
- `--pe-size-s`: 小字号（14px，小屏 13px）
- `--pe-size-xs`: 超小字号（12px）

### 状态颜色: 成功

- `--success`: 成功颜色
- `--success-hover`: 成功 hover 状态
- `--success-active`: 成功 active 状态
- `--success-bg`: 成功浅色背景

### 状态颜色: 信息

- `--info`: 信息颜色
- `--info-hover`: 信息 hover 状态
- `--info-active`: 信息 active 状态
- `--info-bg`: 信息浅色背景

### 状态颜色: 警告

- `--warning`: 警告颜色
- `--warning-hover`: 警告 hover 状态
- `--warning-active`: 警告 active 状态
- `--warning-bg`: 警告浅色背景

### 状态颜色: 危险

- `--danger`: 危险颜色
- `--danger-hover`: 危险 hover 状态
- `--danger-active`: 危险 active 状态
- `--danger-bg`: 危险浅色背景

### Header 相关

- `--pe-headerheight`: Header 高度（70px，小 header 50px，双行 120px）
- `--pe-windowwidth`: 窗口宽度
- `--pe-windowheight`: 窗口高度

## 样式

### 通用样式

- `.pe-disabled`: 禁用状态，添加 pointer-events: none、灰色文字、禁止用户选择

### html 标签样式

- `.pe-full`: 全屏模式，html 和 body 最小高度为 100%
- `.pe-speed-fast`: 快速动画模式，过渡时间 0.15s
- `.pe-speed-imme`: 即时模式，禁用所有过渡动画

### 文字样式

- `.pe-btitle`: 超大标题，字号 var(--pe-size-xxxl)
- `.pe-title`: 大标题，字号 var(--pe-size-xxl)
- `.pe-bnote`: 大备注，字号 var(--pe-size-xl)
- `.pe-note`: 备注，字号 var(--pe-size-l)，颜色为备注色
- `.pe-gnote`: 灰色备注，字号 var(--pe-size-l)

### 内边距

- `.pe-padding-lr`: 左右内边距，padding-left/right: var(--pe-padding)
- `.pe-lpadding-lr`: 左右大内边距，padding-left/right: var(--pe-padding-l)
- `.pe-padding`: 全方向内边距，padding: var(--pe-padding)
- `.pe-padding-s`: 小内边距，padding: var(--pe-padding-s)
- `.pe-padding-xs`: 超小内边距，padding: var(--pe-padding-xs)
- `.pe-padding-xxs`: 极小内边距，padding: var(--pe-padding-xxs)

### 间距

- `.pe-gap`: 中间距，gap: var(--pe-gap-m)
- `.pe-gap-s`: 小间距，gap: var(--pe-gap-s)
- `.pe-gap-xs`: 超小间距，gap: var(--pe-gap-xs)

### 字号

- `.pe-size-xxxl`: 超大字号，font-size: var(--pe-size-xxxl)
- `.pe-size-xxl`: 较大字号，font-size: var(--pe-size-xxl)
- `.pe-size-xl`: 大字号，font-size: var(--pe-size-xl)
- `.pe-size-l`: 中大字号，font-size: var(--pe-size-l)
- `.pe-size`: 标准字号，font-size: var(--pe-size)
- `.pe-size-s`: 小字号，font-size: var(--pe-size-s)
- `.pe-size-xs`: 超小字号，font-size: var(--pe-size-xs)

### 字体样式

- `.pe-bold`: 加粗文字，font-weight: 700

## 全局

- `a` 标签已经被全局设置为 `display: inline-flex;`，所以居中只能用 `justify-content: center;`，不能用 `text-align: center;`。
simple-control.md
---

# 简单控件

## pop

弹出层。通常用于显示下拉菜单、日期选择等内容的容器。

### 样式

浮动弹出容器，采用固定定位。矩形设计，带圆角边框和阴影，背景为白色。支持通过 pe-show 类控制显示/隐藏状态（opacity 和 transform 过渡效果），通过 pe-pshow 类控制物理显示（display 属性）。

### 示例

```html
<div class="pe-pop" ref="pop">
    <pe-text v-if="propBoolean('search')" v-model="searchValue" :placeholder="l('search')" plain></pe-text>
    <pe-dlist :data="searchComp" :modelValue="value" @update:modelValue="onModelValue" @click="click" plain></pe-dlist>
</div>
```

## content

内容容器。限制最大宽度并居中显示内部元素。

### 样式

横向布局容器，宽度 100% 占满父元素。设置 max-width 为 1600px 限制最大宽度，margin 自动平均分配实现水平居中。用于页面内容区域，确保在大屏幕上内容宽度适宜。

### 示例

```html
<div class="pe-layout pe-content pe-padding-lr pe-gap-s" style="flex-direction: column; align-items: center;">
    <div>Default</div>
    <div class="pe-layout pe-gap-xs" style="flex-wrap: wrap;">
        <pe-tag :close="tagclose">Default</pe-tag>
        <pe-tag :close="tagclose" type="primary">Primary</pe-tag>
    </div>
    <div>Plain</div>
    <div class="pe-layout pe-gap-xs" style="flex-wrap: wrap;">
        <pe-tag :close="tagclose" plain>Default</pe-tag>
        <pe-tag :close="tagclose" type="primary" plain>Primary</pe-tag>
    </div>
    <div>Size</div>
    <div class="pe-layout pe-gap-xs" style="align-items: center;">
        <pe-tag :close="tagclose" type="primary" plain size="l">l</pe-tag>
    </div>
</div>
```

## article

文章容器。用于展示文章内容，适配排版。

### 样式

文章内容展示容器，采用竖排布局。增大行高至 2 提升阅读舒适度。段落 `<p>` 元素首行缩进 2em 符合中文排版习惯。链接为行内元素展示，保留下划线。

### 示例

```html
<div class="pe-content pe-padding pe-article">
    <p> ... </p>
    ...
</div>
```

## layout

布局容器。Flex 布局基础容器。

### 样式

基础弹性布局容器，使用 Flex 模型实现响应式排列。默认水平排列，子元素可通过 flex 属性灵活分配宽度。

### 示例

```html
<div class="pe-layout pe-gap-s" style="justify-content: center; align-items: center;">
    <a class="pe-button" href="./">Discuss</a>
    <a class="pe-button pe-pgrey" href="./">Discuss2</a>
    <a class="pe-button pe-grey" href="./">Discuss3</a>
    <a class="pe-button pe-pgrey pe-padding-xxs" href="./">xs</a>
</div>
```

## layoutlist

横向两列列表布局。两个子元素各占 50% 宽度。

### 样式

水平两列均等分布局。使用 Flex 模型，每个子元素 flex: 1 自动平均分配宽度。常用于对比展示、列表并排显示等场景。

### 示例

```html
<div class="pe-layoutlist">
    <div>
        <a class="pe-menu-item" href="./">111342342</a>
        <a class="pe-menu-item" href="./">222</a>
    </div>
    <div>
        <a class="pe-menu-item" href="./">333</a>
        <a class="pe-menu-item" href="./">444</a>
    </div>
</div>
```

## grid

网格布局。使用 CSS Grid 实现网格布局。

### 样式

使用 CSS Grid 模型实现网格布局。提供底层网格容器，具体的行列配置由使用者通过 style 属性或 CSS 类自定义，灵活适应各种网格场景。

### 示例

```html
<div class="pe-grid pe-gap" style="grid-template-columns: repeat(3, 1fr);">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
```

## igrid

信息网格。两列网格，第一列自适应宽度，第二列占剩余宽度。

### 样式

两列 Grid 布局，第一列宽度自适应内容（auto），第二列占据剩余空间（1fr）。列间距使用 gap 变量提供统一间距。常用于显示标签-值、属性-内容等信息对。

### 示例

```html
<div class="pe-igrid" style="width: 100%; max-width: 600px;">
    <div class="pe-padding-s">1</div>
    <div class="pe-padding-s">2</div>
    <div class="pe-padding-s">3</div>
    <div class="pe-padding-s">4</div>
    <div class="pe-padding-s">5</div>
    <div class="pe-padding-s">6</div>
</div>
```

## align-center-desktop

对齐容器。仅在 desktop 模式下使内部元素垂直居中。

### 样式

简单的对齐工具类，设置 align-items: center 实现 Flex 容器内子元素垂直居中。通常与其他布局类组合使用。

### 示例

```html
<div class="pe-alayout pe-content pe-padding-lr pe-gap pe-align-center-desktop">
    <pe-group style="flex: 1;"> ... </pe-group>
    <pe-group style="flex: 1;" class="pe-point"> ... </pe-group>
    <pe-group style="flex: 1;"> ... </pe-group>
</div>
```

## button

按钮控件。不用类属性则为白底色，白色背景下将看不到按钮轮廓。

### 类属性

#### pe-plain

朴素

#### pe-pwhite

朴素白

#### pe-pgrey

朴素灰，常用

#### pe-grey

灰底

#### pe-dark

深色模式

#### pe-blod

边框加粗，仅限 pe-plain、pe-pwhite、pe-pgrey 模式下

### 样式

交互式按钮，采用行内 Flex 布局。圆角矩形设计，内部水平和垂直居中排列内容。默认样式为白色背景，带边框和阴影，悬停时背景变浅。支持多种样式模式：pe-plain 朴素模式仅显示边框和文字（颜色为主题色）；pe-pwhite 朴素白模式用于深色背景；pe-pgrey 朴素灰模式带浅色背景；pe-grey 灰底模式；pe-dark 深色模式背景为主题色。焦点/按下状态显示轮廓阴影。支持 pe-bold 类实现加粗边框效果。

### 示例

```html
<a class="pe-button pe-plain pe-bold" href="./">OK</a>
<div class="pe-button pe-grey" @click="changeNBottom">{{nbottom ? '' : '!'}}Bottom</div>
<div class="pe-button pe-pgrey" @click="dptime = !dptime">{{dptime ? '' : '!'}}time</div>
<div class="pe-button pe-dark">Login</div>
<a class="pe-button pe-plain pe-disabled" href="./">Discuss4</a>
```

## block

内容块。居中显示的大内容块，通常用于营销页面。

### 类属性

#### pe-grey

灰色背景

### 样式

大块内容展示区域，文字居中排列。上下内边距 140px，内部采用纵向 Flex 布局，gap 20px 分隔各元素。适用于营销页面的区块设计、功能介绍等场景。支持通过 pe-grey 类添加灰色背景。

### 示例

```html
<div class="pe-block pe-grey">
    <div class="pe-btitle">Rapid prototyping</div>
    <div class="pe-gnote">Web development shouldn't take up too much time</div>
    <div class="pe-layout pe-gap-s" style="justify-content: center;">
        <a class="pe-button pe-pgrey" href="./">Discuss</a>
        <a class="pe-button pe-pgrey" href="./">Discuss2</a>
        <a class="pe-button pe-pgrey" href="./">Discuss3</a>
    </div>
</div>
```

## alayout

响应式布局容器。根据屏幕大小自调整 flex-direction，大屏为横向，小屏为纵向。若无需根据屏幕大小调整勿使用本控件。

### 子类属性

#### pe-reverse

反向排列（小屏时顺序会回正）

### 样式

响应式自动布局容器，使用 Flex 模型。桌面端子元素水平并排显示，小屏设备下自动切换为纵向排列（flex-direction: column），各子元素竖直堆叠以适应屏幕宽度。支持 pe-reverse 类反向排列，小屏时仍为纵向但改变子元素顺序。

### 示例

```html
<div class="pe-block">
    <div class="pe-alayout pe-content pe-padding-lr pe-gap">
        <div class="pe-layout pe-gap-s" style="flex-direction: column; text-align: initial; justify-content: center; flex: 1;">
            <div class="pe-title">This is a title</div>
            <div class="pe-note">Hey, ok.</div>
        </div>
        <div class="pe-img infoimg" style="align-items: flex-end; justify-content: center; padding-bottom: 20px; flex: 1;">
            OK
        </div>
    </div>
</div>
<div class="pe-block pe-grey">
    <div class="pe-alayout pe-content pe-padding-lr pe-reverse pe-gap">
        <div class="pe-layout pe-gap-s" style="flex-direction: column; text-align: initial; justify-content: center; flex: 1;">
            <div class="pe-title">This is a title</div>
            <div class="pe-note">Hey, ok.</div>
        </div>
        <div class="pe-img pe-hover infoimg" style="flex: 1;"></div>
    </div>
</div>
```

## lralayout

左图右文布局。左侧图片固定宽度，右侧文本占剩余空间，小屏模式变为上下结构。可用于配合 box 控件展示小新闻卡片。

### 子类属性

#### pe-img

限定子 img 控件的宽度为 300px，高度为 150px

### 样式

水平图文混排布局。左侧图片固定宽度 300px、高度 150px，右侧内容区灵活占据剩余空间。采用 Flex 模型实现。小屏下自动调整为纵向排列，图片宽度变为自适应。

### 示例

```html
<a class="pe-box pe-lralayout" href="./" style="flex: 1;">
    <div class="pe-img boximg2"></div>
    <div class="pe-padding-s">
        <div class="pe-title">Article1</div>
        <div class="pe-note">Article note</div>
    </div>
</a>
```

## box

盒子容器。卡片式容器，带边框、背景、圆角和阴影效果。

### 类属性

#### pe-hover

悬停阴影效果

#### pe-thover

悬停上浮效果

### 样式

卡片样式容器，矩形设计带圆角边框。背景为白色，采用纵向 Flex 布局排列内容。支持 pe-hover 类添加悬停时增强阴影效果，或 pe-thover 类实现悬停上浮变换效果（Y 轴平移 -10px）。

### 示例

```html
<a class="pe-box pe-padding pe-gap-xs" href="./" style="justify-content: center; flex: 1;">
    <div class="pe-title">AAA</div>
    <div class="pe-note">1111111111</div>
</a>
<a class="pe-box pe-padding pe-hover pe-gap-xs" href="./" style="justify-content: center; flex: 1;">
    <div class="pe-title">Hover</div>
    <div class="pe-note">2222222222</div>
</a>
<a class="pe-box pe-thover" href="./" style="flex: 1;">
    <div class="pe-img boximg"></div>
    <div class="pe-padding-s">
        <div class="pe-title">Thover</div>
        <div class="pe-note">2222222222</div>
    </div>
</a>
```

## img

图片容器。背景图片容器，支持悬停放大效果。

### 类属性

#### pe-hover

悬停放大效果

### 样式

背景图片容器，采用 background-size: cover 实现内容填充。使用 Flex 布局。支持 pe-hover 类添加悬停放大效果，背景图片缩放从 100% 变为 120%，营造交互感。

### 示例

```html
<div class="pe-img pe-hover infoimg" style="flex: 1;"></div>
```

```scss
.infoimg {
    background-image: url(./bg.jpg); min-height: 300px;
}
```

## link

链接。带下划线的链接容器。

### 样式

文本链接样式，默认显示下划线。悬停时文字颜色变为主题色，带过渡动画效果。

### 示例

```html
<a class="pe-link" href="#">More details</a>
```

## stripe

条纹背景。为一个元素增加对角线条纹背景图案的装饰性作用。

### 样式

对角线条纹背景图案，使用 linear-gradient 实现。条纹方向 135 度，重复周期 6x6px。常用于强调区域或装饰元素。

### 示例

```html
<pe-setting :hover="settingHover" :plain="settingPlain" :light="settingLight">
    <pe-setting-item title="How are you" note="stripe" class="pe-stripe"></pe-setting-item>
</pe-setting>
```

## menudown

下拉菜单指示器。显示可下拉的箭头，悬停时展开菜单。

### 子类属性

#### pe-menu

菜单项容器

### 样式

行内 Flex 容器，显示可交互的文本和下拉箭头。使用 ::after 伪元素绘制 45 度旋转的小三角箭头，指向下方。悬停时箭头颜色变化，通过 pe-menu 子容器展示下拉菜单（transform 和 opacity 过渡效果）。

### 示例

```html
<div class="pe-menudown pe-padding-xs">
    Language
    <pe-menu>
        <div class="pe-layoutlist">
            <div>
                <a class="pe-menu-item" href="javascript:void(0);">简体中文</a>
                <a class="pe-menu-item" href="javascript:void(0);">繁體中文</a>
            </div>
            <div>
                <a class="pe-menu-item" href="javascript:void(0);">English</a>
                <a class="pe-menu-item pe-disabled" href="javascript:void(0);">Français</a>
            </div>
        </div>
    </pe-menu>
</div>
```

## hske

隐藏左侧面板控件。小屏下左侧面板隐藏。

### 子类属性

#### pe-hske-first

左侧面板

#### pe-hske-last

右侧面板

#### pe-hske-content

内容区域

#### pe-hske-bottom

底部区域

### 样式

响应式两部分布局。桌面端：左侧面板（1 倍宽）展示图片或信息，右侧面板（2 倍宽）为主内容区，内部纵向分为内容区和底部区域。小屏适配：左侧面板隐藏（width: 0），底部区域变为固定底部悬浮，右侧内容占满屏幕。

### 示例

```html
<div class="pe-hske">
    <div class="pe-hske-first">
        <div class="pe-hske-content"></div>
        <div class="pe-hske-bottom">
            <div>I'm glad to see you</div>
            <div>With Purease, you can quickly build a versatile, minimalist webpage.</div>
        </div>
    </div>
    <div class="pe-hske-last">
        <!-- 语言和注册 -->
        <div class="pe-layout pe-padding-s"> ... </div>
        <!-- 主面板 -->
        <div class="pe-layout" style="flex: 1; align-items: center; justify-content: center;"> ... </div>
    </div>
</div>
```

## crumb

面包屑导航。显示当前页面位置的导航链接。

### 子类属性

#### pe-crumb-item

面包屑项

### 样式

水平链接导航路径，使用 Flex 排列。各面包屑项之间用旋转 45 度的小三角箭头作为分隔符（::after 伪元素实现）。最后一项无分隔符。用于展示用户在网站中的当前位置。

### 示例

```html
<div class="pe-crumb">
    <a class="pe-crumb-item" href="./">Home</a>
    <div class="pe-crumb-item">Nav 9</div>
    <div class="pe-crumb-item">Sub 7</div>
    <div class="pe-crumb-item">Sub 9</div>
</div>
```

## tree

树形导航。层级结构的列表展示，会自动绑定展开/收起事件无需手动处理。通常在 lnav 的 left 插槽内使用。

### 子类属性

#### pe-tree-title

树标题

#### pe-tree-item

树项

#### pe-selected

选中状态，与 pe-tree-item 搭配使用

#### pe-tree-menu

树菜单容器

### 样式

树形结构导航，采用纵向 Flex 布局。包含可选的标题行（加粗）和多个树项。树项支持两种类型：普通文本项和可展开/收起的分支项。可展开项右侧显示旋转的三角箭头（::after 伪元素），点击展开时箭头旋转。悬停时树项背景和文字变为主题色。支持 pe-selected 类标记选中项。子菜单采用缩进布局，展开时显示，收起时隐藏。

### 示例

```html
<div class="pe-tree" style="min-width: 200px;">
    <a class="pe-tree-item" href="javascript:void(0);">Index</a>
    <div class="pe-tree-title">Part 1</div>
    <div class="pe-tree-item">Nav 1</div>
    <a class="pe-tree-item" href="javascript:void(0);">Nav 2</a>
    <div class="pe-tree-title">Part 2</div>
    <a class="pe-tree-item" href="javascript:void(0);">Nav 4</a>
    <div class="pe-tree-item">Nav 9</div>
    <div class="pe-tree-menu">
        <a class="pe-tree-item" href="javascript:void(0);">Sub 6</a>
        <div class="pe-tree-item">Sub 7</div>
        <div class="pe-tree-menu">
            <a class="pe-tree-item" href="javascript:void(0);">Sub 8</a>
        </div>
        <a class="pe-tree-item" href="javascript:void(0);">Sub 10</a>
    </div>
</div>
```

# 控件
---

## anchor
---

自动扫描左侧插槽内的标题（h2-h6），基于标题文本生成语义化的 slug 作为 id（如 `title-1`、`getting-started`），并设置滚动事件监听器用于实时更新当前选中的导航项。

### 参数

#### hr

`boolean` | `string`

是否给除第一个 h2 增加上边框、给 h3 增加上边框，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Anchor 锚点组件，采用左右分栏布局：左侧为内容区（弹性），右侧为固定宽度导航区（最小 200px），右侧导航根据实际内容会自动生成。

右侧导航采用粘性定位（sticky），始终保持在可视区域内，最大高度为视口高度减去顶部间距，超出部分可滚动查看。导航项垂直排列，左侧带 1px 边框线，根据标题层级（h2-h6）呈现递进缩进效果，选中项显示为加粗字体和主题色边框。当选中项变化时，导航区会自动滚动以确保选中项在可视范围内。

支持悬停高亮、点击平滑滚动、RTL 布局镜像翻转。在 800px 以下屏幕宽度时导航区自动隐藏。滚动事件采用 50ms 节流优化性能，组件卸载时自动清理事件监听器。

### 示例

```html
<pe-anchor>
    <h2>Getting Started</h2>
    <p>
        Test Test Test Test Test Test Test<br>
        Test Test Test Test Test Test Test<br>
        Test Test Test Test Test Test Test<br>
    </p>
    <h2>Installation</h2>
    <p>
        Test Test
    </p>
    <h2>Configuration</h2>
    <p>
        Test Test
    </p>
    <h2>API Reference</h2>
    <p>
        Test Test
    </p>
    <h3>Methods</h3>
    <p>
        Test Test
    </p>
    <h3>Events</h3>
    <p>
        Test Test
    </p>
</pe-anchor>
```

## banner
---

生成网页上半部分的横幅区域，会自动预留出顶部 header 的高度

### 参数

#### direction

`'h'` | `'v'`

布局流向，默认 `'h'`

### 类属性

#### pe-grey

淡灰底色

#### pe-grad

渐变底色

### 方法

### 插槽

### 样式

类似网页 Hero Section 布局，采用全宽横幅设计，背景支持图片平铺（cover）和渐变效果。顶部自动预留 header 高度，内容区居中对齐（最大宽度 1600px）。

内容区采用弹性布局，支持水平（h）和垂直（v）两种排列方向，子元素间距为 20px。提供 pe-grey（淡灰底色）和 pe-grad（渐变底色）两种预设样式类。

适用于页面顶部的大型展示区域，常用于放置标题、介绍文字等关键信息。

### 示例

```html
<pe-banner class="pe-grey" direction="v" style="height: 350px;">
    <div class="pe-btitle">Control</div>
    <div class="pe-bnote">Table, Datepanel, Date, Daterange</div>
</pe-banner>
```

## bar
---

条状导航控件

### 参数

#### logoHref

`string`

logo 图地址

#### theme

`'default'` | `'dark'`

主题风格，默认 default

### 类属性

### 方法

### 插槽

### 样式

类似 Bootstrap 的 Navbar，采用水平弹性布局，左侧可选配 logo（固定宽度 110px），右侧为导航项。提供 default 和 dark 两种主题，dark 主题使用主题色背景和白色文字。

导航项水平排列，每项带有固定内边距（0 20px）和高度（50px）。支持嵌套菜单，菜单项悬停时显示下拉内容。

在 800px 以下屏幕宽度时自动切换为垂直布局，导航项变为纵向堆叠。

### 示例

```html
<pe-bar :theme="dbottom" :logo-href="slogo ? 'javascript:void(0);' : undefined">
    <pe-bar-item>Sub1</pe-bar-item>
    <pe-bar-item>Sub2</pe-bar-item>
    <pe-bar-item>
        Sub3
        <pe-menu>
            <a class="pe-menu-item" href="./swipe.html">Swipe</a>
            <a class="pe-menu-item" href="./login.html">Login</a>
            <a class="pe-menu-item" href="./double.html">Double</a>
        </pe-menu>
    </pe-bar-item>
    <pe-bar-item>Sub4</pe-bar-item>
    <pe-bar-item>Sub5</pe-bar-item>
</pe-bar>
```

## bar-item
---

条状导航控件的子项，用于构建导航项

### 参数

#### href

`string` | `undefined`

链接地址

### 类属性

### 方法

### 插槽

### 样式

作为 pe-bar 的子组件，每个导航项呈现为固定高度（50px）的水平块，内边距为 0 30px。悬停时显示半透明白色背景。

支持嵌套下拉菜单，带菜单的项右侧显示小箭头图标（6x6px 斜边框）。悬停时箭头旋转，下拉菜单平滑展开。在 dark 主题下文字和箭头自动切换为白色。

在 800px 以下屏幕宽度时切换为纵向堆叠，下拉菜单变为手风琴式展开/收起。

### 示例

```html
<pe-bar :theme="dbottom" :logo-href="slogo ? 'javascript:void(0);' : undefined">
    <pe-bar-item>Sub1</pe-bar-item>
    <pe-bar-item>Sub2</pe-bar-item>
    <pe-bar-item>
        Sub3
        <pe-menu>
            <a class="pe-menu-item" href="./swipe.html">Swipe</a>
            <a class="pe-menu-item" href="./login.html">Login</a>
            <a class="pe-menu-item" href="./double.html">Double</a>
        </pe-menu>
    </pe-bar-item>
    <pe-bar-item>Sub4</pe-bar-item>
    <pe-bar-item>Sub5</pe-bar-item>
</pe-bar>
```


## btab
---

大 tab 控件，横向内容过多支持滚动，主要用于较大的块的内容切换，比如切换一个展示信息为另一页

### 参数

#### modelValue

`number`

选中的索引，默认 0

#### data

`string[]`

tab 数据列表，默认空数组

#### type

`'default'` | `'plain'` | `'light'`

类型，默认 default

### 类属性

### 方法

### 插槽

### 样式

类似移动端的 Segmented Control，横向标签过多时支持拖拽滚动。提供 default（灰色背景）、plain（透明背景）、light（圆角胶囊）三种样式类型。

选中项高亮显示主题色背景和白色文字（light 类型为白色背景+主题色文字+加粗）。内容可滚动时左右两侧显示渐变阴影提示。

支持鼠标拖拽和触摸滑动，适用于大块内容的切换场景。

### 示例

```html
<pe-btab :data="['Tab1', 'Tab2', 'Other', 'Hehe', 'Mutton', 'Kebab', 'ClickGo', 'Purease']" type="plain"></pe-btab>
```


## captcha
---

验证码控件，支持腾讯云和 Cloudflare 验证码

### 参数

#### factory

`'tc'` | `'cf'`

验证码服务商，默认 tc

- `tc`: 腾讯云验证码
- `cf`: Cloudflare 验证码

#### akey

`string`

验证码 key

### 类属性

### 方法

#### reset()

重置验证码使用状态

##### 返回值

`void`

### 插槽

### 事件

#### result(event)

验证结果事件

##### event

`ICaptchaResultEvent`

### 样式

类似谷歌 reCAPTCHA，呈现为带圆角和阴影的按钮样式。未初始化时显示虚线边框，腐讯云验证码（tc）显示实线边框和输入框背景。

支持三种状态：默认状态、验证失败（红色）、验证成功（绿色）。悬停时边框和文字变为主题色，点击时显示外轮阴影。

自动集成腐讯云和 Cloudflare 两种验证码服务，无需手动接入 SDK。

### 示例

```html
<pe-captcha factory="tc" :akey="captchaKey" @result="onCaptchaResult"></pe-captcha>
```

```typescript
class Page extends purease.AbstractPage {

    public onCaptchaResult(e: lControl.ICaptchaResultEvent) {
        if (e.detail.result === 1) {
            console.log('验证成功', e.detail.token);
        }
        else {
            console.log('验证失败');
        }
    }

}
```


## check
---

复选框控件，用于多选场景。

### 参数

#### modelValue

`boolean`

选中状态，默认 false

#### direction

`'h'` | `'v'`

布局流向，默认 h

### 方法

### 插槽

### 样式

类似 Ant Design 的 Checkbox，采用水平或垂直布局。复选框呈现为 22x22px 的圆角方块，带有边框和阴影，选中时显示主题色背景和白色勾选图标（SVG）。

复选框与文本标签的间距由 `--pe-gap-xs` 控制。悬停时复选框背景变浅，文本变为主题色；选中状态下悬停时复选框背景变深。聚焦或激活时显示外轮廓阴影。

支持键盘操作（tabindex），未选中时隐藏勾选图标。适用于表单、设置项等需要多选的场景。

### 示例

```html
<pe-check v-model="checked">同意用户协议</pe-check>
```


## circle
---

圆形容器控件，可用于指示点、图标等

### 参数

#### type

`'default'` | `'primary'` | `'info'` | `'warning'` | `'danger'` | `'pe'`

类型，默认 default

#### plain

`boolean`

是否朴素模式，默认 false

#### size

`'l'` | `'m'` | `'s'` | `'xs'` | `'xxs'`

尺寸，默认 xxs

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Avatar，呈现为圆形容器。提供 5 种尺寸（l/m/s/xs/xxs）和 6 种类型（default/primary/info/warning/danger/pe）。

带有微妙的径向渐变光效（左上角高亮）和阴影。plain 模式下显示为浅色背景+彩色边框，非 plain 模式为彩色背景+白色内容。

适用于指示点（如展示服务的可用状态）、图标、徽章等圆形元素的展示场景。

### 示例

```html
<pe-circle type="primary"></pe-circle>
<pe-circle type="warning" size="m">수</pe-circle>
```


## collapse
---

折叠面板容器控件，通过展开/折叠来显示或隐藏内容区域，支持手风琴模式。

### 参数

#### modelValue

`string` | `string[]`

当前展开的面板名称，手风琴模式下为字符串，普通模式下为字符串数组，默认空数组

#### accordion

`boolean`

是否为手风琴模式（同时只能展开一个面板），默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 Collapse 折叠面板组件，采用垂直堆叠布局。容器带 1px 边框、圆角和白色背景，内部面板项通过边框线分隔。

每个面板项（pe-collapse-item）包含标题区和内容区。标题区可点击切换展开状态，右侧带箭头图标指示当前状态。内容区展开时平滑过渡显示，收起时高度过渡为 0。

支持手风琴模式（同时只展开一个面板）、禁用状态、RTL 布局。响应式友好，在各种屏幕尺寸下保持良好的可用性。

### 示例

```html
<pe-collapse v-model="activeNames">
    <pe-collapse-item title="Panel 1" name="1">
        Content of panel 1
    </pe-collapse-item>
    <pe-collapse-item title="Panel 2" name="2">
        Content of panel 2
    </pe-collapse-item>
    <pe-collapse-item title="Panel 3" name="3" disabled>
        Content of panel 3 (disabled)
    </pe-collapse-item>
</pe-collapse>
```


## collapse-item
---

折叠面板子项控件，用于 pe-collapse 控件内部，表示单个可折叠的面板。

### 参数

#### name

`string`

面板唯一标识，用于控制展开状态，必填

#### title

`string`

面板标题文本，默认空

#### disabled

`boolean`

是否禁用该面板，禁用后无法点击展开/收起，默认 false

### 类属性

### 方法

### 插槽

#### title

标题区域自定义插槽，可替换默认标题文本

### 样式

折叠面板项包含标题区和内容区两部分。标题区水平布局，左侧为标题文本（可通过插槽自定义），右侧为箭头图标。

内容区高度通过 CSS transition 实现平滑过渡效果。展开时高度自适应内容，收起时高度为 0。箭头图标在展开时旋转 90 度。

禁用状态下标题颜色变浅，鼠标样式变为禁止，hover 效果取消。支持 RTL 布局镜像。

### 示例

```html
<pe-collapse-item title="Basic Panel" name="basic">
    This is the content of basic panel.
</pe-collapse-item>

<pe-collapse-item name="custom">
    <template v-slot:title>
        <pe-icon name="fa-solid fa-star"></pe-icon>
        Custom Title
    </template>
    This panel has a custom title with icon.
</pe-collapse-item>
```


## date
---

日期时间选择器控件，支持日期、时间和时区选择

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### modelValue

`number` | `undefined`

当前日期时间戳，毫秒

#### tz

`number` | `undefined`

时区，如 8，支持 v-model

#### yearmonth

`string`

年份月份的组合，如 200708，自动跳转到此页面但不选中，支持 v-model

#### hourminute

`string`

时分秒的字符串，跳转也自动选中，支持 v-model

#### start

`number` | `undefined`

限定可选的最小时间

#### end

`number` | `undefined`

限定可选的最大时间

#### date

`boolean`

是否显示日期，默认 true

#### time

`boolean`

是否显示时间，默认 true

#### zone

`boolean`

是否显示时区，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 DatePicker，采用弹性布局容器，带圆角边框和过渡动画。主体为横向排列的日期/时间显示区和清除按钮，右侧显示清除图标（悬停时完全不透明）。

点击触发弹出日期/时间选择面板，支持日期面板或时分秒列表双模式。时区选择以独立弹窗展示，包含时区和分钟偏移列表。所有交互元素均支持悬停高亮和按下反馈。

禁用状态下显示禁用样式，背景色和边框色使用主题变量。支持单独控制日期、时间、时区的显隐。

### 事件

#### changed(event)

日期时间改变事件

##### event

`IDateChangedEvent`

### 示例

```html
<pe-date v-model="dts" v-model:tz="dptz" :date="ddate" :time="dptime" :zone="dpzone" :disabled="dpdisabled" :start="dpstart ? 1704067200_000 : undefined" v-model:yearmonth="dpym" v-model:hourminute="dphm">
    <template v-if="dpbottom" v-slot="d">
        <div class="pe-layout" style="flex: 1; justify-content: center;">{{d.year}}</div>
    </template>
</pe-date>
```

## datepanel
---

日期面板控件，提供日历视图选择日期

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### readonly

`boolean`

是否只读，默认 false

#### plain

`boolean`

是否朴素模式，默认 false

#### modelValue

`number` | `undefined`

当前时间戳，毫秒

#### start

`number` | `undefined`

限定可选的最小时间

#### end

`number` | `undefined`

限定可选的最大时间

#### tz

`number` | `undefined`

时区，如 8，支持 v-model

#### yearmonth

`string`

年份月份的组合，如 200708，支持 v-model

#### hourminute

`string`

时分秒的字符串，支持 v-model

#### cursor

`string`

光标日期，如 `20070831`，支持 v-model

#### jump

`boolean`

是否跳转，默认 true

#### time

`boolean`

是否显示时间，默认 true

#### zone

`boolean`

是否显示时区，默认 false

#### range

`boolean`

是否范围选择，默认 false

#### clearbtn

`boolean`

是否显示清除按钮，默认 true

#### backbtn

`boolean`

是否显示返回按钮，默认 true

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Calendar 组件，采用弹性列布局。顶部为年月选择器和控制按钮（清空、返回、今天），中间为星期标题行，主体为 7×6 日期网格，底部可选时间和时区选择器。

日期单元格支持自定义内容插槽，选中项显示主题色背景和边框。范围选择模式下，区间内日期连续高亮显示，首尾日期边角圆角处理。悬停时单元格显示主题色边框，点击时带阴影反馈。

支持 plain 模式（无边框）和 disabled 禁用状态。非当月日期显示为禁用色。响应式友好，支持触摸交互。

### 事件

#### changed(event)

日期改变事件

##### event

`IDatepanelChangedEvent`

#### selected(event)

日期选中事件

##### event

`IDatepanelSelectedEvent`

#### range(event)

范围选择事件

##### event

`IDatepanelRangeEvent`

### 示例

```html
<pe-datepanel v-show="showTwoDatePanel" plain :tz="tzData" hourminute="235959" :time="propBoolean('time')" :modelValue="ts2" v-model:cursor="cursor" range :start="ts" :end="end" :clearbtn="false" :backbtn="false" ref="endpanel" @range="onRange" :yearmonth="endym" @update:yearmonth="endym=$event;onYmChange()" :jump="false">
    <template v-if="$slots['default']" v-slot="col">
        <slot :year="col.year" :month="col.month" :date="col.date" :day="col.day" :str="col.str" :time="col.time"></slot>
    </template>
</pe-datepanel>
```

## daterange
---

日期范围选择器控件，支持选择一个时间范围

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### modelValue

`number[]`

当前时间范围，数组 [开始时间戳, 结束时间戳]

#### tz

`number` | `undefined`

时区，如 8，支持 v-model

#### start

`number` | `undefined`

限定可选的最小时间

#### end

`number` | `undefined`

限定可选的最大时间

#### time

`boolean`

是否显示时间，默认 true

#### zone

`boolean`

是否显示时区，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 DateRangePicker，采用弹性布局容器。主体显示「开始日期 - 结束日期」格式，支持同时显示时间信息。右侧带清除按钮（悬停时不透明度提升）。

点击弹出双日期面板横向排列，左右面板间有分隔线。支持在两个面板间进行范围选择，选中区间以连续高亮显示。时区选择以独立弹窗展示列表选择器。

所有交互元素均有悬停和按下状态反馈。禁用状态下显示禁用样式。响应式下自动调整面板显示。

### 事件

### 示例

```html
<pe-daterange v-model="drts" v-model:tz="dptz" :time="dptime" :zone="dpzone" :disabled="dpdisabled" :start="dpstart ? 1706745600 : undefined">
    <template v-if="dpbottom" v-slot="d">
        <div class="pe-layout" style="flex: 1; justify-content: center;">{{d.year}}</div>
    </template>
</pe-daterange>
```


## dialog
---

对话框控件，用于显示信息并获取用户选择

### 参数

#### title

`string`

标题

#### content

`string`

内容

#### buttons

`string[]`

按钮列表，默认 ['OK']

#### show

`boolean`

是否显示，默认 false

### 类属性

### 方法

### 插槽

### 事件

#### select

按钮选择事件，返回选中按钮的索引

### 样式

类似系统原生 alert/confirm 对话框，采用居中模态层设计。背景为半透明白色遮罩，对话框带圆角、阴影和细边框。

对话框内部采用垂直布局，从上到下为：标题（灰色）、内容区、按钮组（右对齐）。最后一个按钮默认显示为深色按钮。

显示/隐藏时带有缩放动画，隐藏时对话框放大 1.3 倍并淡出。

### 示例

```html
<pe-dialog :show="customDialog" @select="customDialogSelect" title="Please input name">
    <pe-text style="width: 250px;" v-model="customDialogText"></pe-text>
</pe-dialog>
```


## dlist
---

数据列表控件，用于在有限的空间内展示大量选项

### 参数

#### modelValue

`string`

当前选中的值

#### data

`Array<Record<string, any>> | string[]`

数据列表，默认空数组，非 `string[]` 且非字段映射前的单项结构为：

```ts
{
    'label': string;
    'value': string;
    'children': Array<Record<string, any>> | string[];
    'title': string;
}
```

#### plain

`boolean`

是否朴素模式，默认 false

#### map

`Record<string, string>`

字段映射，包含 label, value, children, title

#### tree

`boolean`

是否树形模式，默认 false。为 true 时支持展开折叠子节点，为 false 时平铺展示所有节点

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 List 组件，采用垂直滚动列表布局。列表项带内边距和圆角，选中项和悬停项显示灰色背景，过渡动画流畅。

支持 plain 模式（无边框）和空状态提示（居中显示灰色文本）。禁用项不可交互。文本左对齐显示，默认带边框和圆角。

### 事件

#### changed(event)

值改变事件

##### event

`IDlistChangedEvent`

#### click(event)

点击事件

##### event

`IDlistClickEvent`

### 示例

基础用法：

```html
<pe-dlist :data="['a', 'b', 'c']" v-model="value"></pe-dlist>
```

平铺树形结构（默认展开所有节点）：

```html
<pe-dlist :data="treeData" v-model="value"></pe-dlist>
```

可展开折叠的树形结构：

```html
<pe-dlist :data="treeData" v-model="value" tree></pe-dlist>
```

```typescript
class Page extends purease.AbstractPage {

    public treeData = [
        { 'label': 'Item 1', 'value': 'item1' },
        {
            'label': 'Item 2',
            'value': 'item2',
            'children': [
                { 'label': 'Sub Item 2-1', 'value': 'item2-1' },
                {
                    'label': 'Sub Item 2-2',
                    'value': 'item2-2',
                    'children': [
                        { 'label': 'Deep Item 2-2-1', 'value': 'item2-2-1' }
                    ]
                }
            ]
        }
    ];

}
```


## drawer
---

抽屉控件，从侧边滑出的面板

### 参数

#### modelValue

`boolean`

是否显示，默认 false

#### title

`string`

标题，默认空

#### width

`string` | `number`

宽度，默认 35%

#### direction

`'h'` | `'v'`

布局方向，默认 h

#### gutter

`string`

间隔

#### alignH

`string` | `undefined`

水平对齐

#### alignV

`string` | `undefined`

垂直对齐

### 类属性

### 方法

### 插槽

#### footer

抽屉底部区域，用于放置操作按钮

### 样式

类似 Ant Design 的 Drawer 抽屉组件，从右侧滑出的面板。采用固定定位，全屏半透明遮罩（rgba(0,0,0,.3)）配合白色抽屉主体，带阴影效果。

抽屉主体包含标题栏（左对齐大字号标题+右上关闭按钮）、内容区（可滚动，支持横向/纵向布局和对齐方式）、可选底部操作区。关闭按钮悬停时显示灰色背景，聚焦时带轮廓阴影。

显示时从右侧平滑滑入，隐藏时滑出并移除交互。支持自定义宽度和内部间距。

### 示例

```html
<pe-drawer title="Drawer" gutter="10" v-model="drawer" direction="v" width="50%">
    <div>123</div>
    <div class="pe-button pe-pgrey" @click="drawer2 = true">456</div>
</pe-drawer>
```


## footer
---

生成网页底部区域

### 参数

#### dark

`boolean`

暗色主题，默认 false

### 类属性

### 子类属性

#### pe-footer-list

链接列表容器，可包含标题和链接元素。设置 flex 列向布局

#### pe-footer-title

链接列表的标题样式，用于显示列表分类名称，用于 `pe-footer-list` 之内。设置较大字号和下边距

#### pe-footer-end

标记列表为末尾位置，在响应式下会排序到最后，与 `pe-footer-list` 搭配使用。通常用于放置 logo 区域

#### pe-footer-logo

Logo 展示区域，使用背景图模式显示。响应式下会缩小尺寸

#### pe-footer-bottom

底部信息区域容器，用于承载底部插槽内容。字号较小，色调偏灰

#### pe-footer-bottom-row

底部行容器，用于排列底部信息项。采用居中对齐和 flex 换行布局

### 方法

### 插槽

#### bottom

底部区域，用于显示版权信息等

### 样式

类似现代网站的 Footer 布局，采用居中约束的弹性布局（最大宽度 1600px）。主体背景默认为灰色，dark 模式下为深色背景配白色文字。

内容区采用多列等宽布局，包含 logo 区域（背景图模式）、链接列表等。底部区域（bottom slot）居中显示版权等信息，字号较小且色调偏灰。链接在 dark 模式下为灰白色，悬停时变为纯白。

在 800px 以下屏幕切换为单列垂直布局，logo 区域居中显示并缩小。响应式间距调整保持视觉平衡。

### 示例

```html
<pe-footer dark>
    <div class="pe-footer-list pe-footer-end">
        <div class="pe-footer-logo"></div>
    </div>
    <div class="pe-footer-list">
        <div class="pe-footer-title">List 1</div>
        <a href="./">Page 1</a>
        <a href="./">Page 2</a>
        <a href="./">Page 3</a>
    </div>
    <div class="pe-footer-list">
        <div class="pe-footer-title">List 2</div>
        <a href="./" target="_blank">Page 1<pe-icon></pe-icon></a>
        <a href="./">Page 2</a>
        <a href="./">Page 3</a>
    </div>
    <div class="pe-footer-list">
        <div class="pe-footer-title">List 3</div>
        <a href="./">Page 1</a>
        <a href="./">Page 2</a>
        <a href="./">Page 3</a>
    </div>
    <template v-slot:bottom>
        <div class="pe-footer-bottom-row">
            <div class="pe-alayout pe-gap-xs" style="align-items: center;">
                <div>This is some footer information</div>
                <div>Note2</div>
            </div>
        </div>
        <div class="pe-footer-bottom-row">
            <div class="pe-layout">Item1</div>
            <div class="pe-layout">Item2</div>
            <div class="pe-layout">Item3</div>
            <div class="pe-layout">{{text}}</div>
        </div>
    </template>
</pe-footer>
```

## group
---

大卡片容器控件，用于组织和包裹相关内容

### 参数

### 类属性

#### pe-padtitle

让上方增加一块和 header 等高的 margin，通常用于没有使用 title 插槽的与有 title 的 group 对齐。使用 pe-padtitle 类的 group 禁止使用 title 插槽

#### pe-point

焦点模式，边框变的明显

### 方法

### 插槽

#### title

标题区域

#### bottom

底部区域

### 样式

类似 Bootstrap 的 Card 卡片组件，采用垂直弹性布局容器。带 1px 边框、圆角和柔和的双层阴影效果，背景为白色。

可选标题栏（title slot）显示为主题色背景、白色文字、居中加粗；主内容区带内边距且可弹性扩展；底部区域（bottom slot）采用横向弹性布局。

支持 point 模式（2px 主题色边框强调）和 padtitle 模式（标题外边距）。响应式友好，800px 以下自动调整间距。

### 示例

```html
<pe-group style="flex: 1;">
    <template v-slot:title>Best</template>
    111<br>
    222<br>
    333
    <template v-slot:bottom>
        <div class="pe-button pe-pgrey" style="flex: 1;">Buy</div>
    </template>
</pe-group>
```

## header
---

生成网页头部导航栏

### 参数

#### logoHref

`string`

点击 logo 后的跳转地址，一般为首页地址。logo 图自行用 css 设置，例如：

```scss
.pe-logo {
    background-image: url(../../doc/logo.png);
}
```

#### fixed

`boolean`

是否固定定位，默认 false

#### theme

`'default'` | `'rev'`

主题风格，默认 default，`rev`: 反差

#### line

`boolean`

是否显示底部线条，默认 false

### 类属性

### 方法

### 插槽

#### bottom

导航栏底部区域

#### right

导航栏右侧区域，用于放置操作按钮等

### 样式

类似 Element Plus 的 Header 组件，采用横向弹性布局。左侧为 logo 区域（背景图模式），右侧为导航区（左侧主导航+右侧操作区）。支持绝对定位或固定定位模式。

默认主题（default）滚动后显示半透明白色背景配毛玻璃效果（backdrop-filter blur），带柔和阴影。rev 主题在未滚动时文字为白色，滚动后切换为白色背景。可选底部 1px 边框线。

800px 以下切换为移动端模式：导航区变为全屏弹窗（半透明背景+毛玻璃），右上角显示汉堡菜单按钮。导航项和底部导航区变为纵向排列，支持滚动。

### 示例

```html
<pe-header logo-href="./" fixed>
    <a class="pe-header-item" href="./">Home</a>
    <pe-header-item>
        List
        <pe-menu>
            <a class="pe-menu-item" href="./swipe.html">Swipe</a>
            <a class="pe-menu-item" href="./login.html">Login</a>
            <a class="pe-menu-item" href="./lnav.html">Lnav</a>
        </pe-menu>
    </pe-header-item>
    <a class="pe-header-item" href="./swipe.html">Swipe</a>
    <pe-header-item>
        Double
        <pe-menu>
            <div class="pe-layoutlist">
                <div>
                    <a class="pe-menu-item" href="./">111342342342334</a>
                    <a class="pe-menu-item" href="./">222</a>
                </div>
                <div>
                    <a class="pe-menu-item" href="./">333</a>
                    <a class="pe-menu-item" href="./">444</a>
                </div>
            </div>
        </pe-menu>
    </pe-header-item>
    <a class="pe-header-item" href="./">About</a>
    <template v-slot:right>
        <a class="pe-header-item" href="./">OK</a>
        <pe-header-layout class="pe-gap-xs">
            <a class="pe-button pe-plain pe-bold" href="./">Hello</a>
        </pe-header-layout>
    </template>
</pe-header>
```

## header-item
---

头部导航栏的单个项目，为了 SEO 优化，链接模式可以直接用 a 标签加 `pe-header-item` 的 class。

### 参数

#### href

`string` | `undefined`

链接地址，如果未设置则作为下拉菜单触发器

### 类属性

### 方法

### 插槽

### 样式

类似 Bootstrap 的 Nav Link，作为 header 子项使用。采用横向弹性布局，固定高度 70px（小屏模式 50px），左右内边距 30px。

悬停时文字变为主题色。包含子菜单时右侧显示向下小箭头（悬停时箭头同步变色），悬停时子菜单从顶部平滑展开（透明度和位移过渡）。未滚动的 rev 主题下文字和箭头为白色。

800px 以下切换为纵向布局，子菜单变为展开/折叠模式（箭头旋转 90 度），高度自适应。1200px-800px 区间自动压缩左右内边距。

### 示例

```html
<pe-header logo-href="./" fixed>
    <a class="pe-header-item" href="./">Home</a>
    <pe-header-item>
        List
        <pe-menu>
            <a class="pe-menu-item" href="./swipe.html">Swipe</a>
            <a class="pe-menu-item" href="./login.html">Login</a>
        </pe-menu>
    </pe-header-item>
    <a class="pe-header-item" href="./swipe.html">Swipe</a>
    <pe-header-item>
        Double
        <pe-menu>
            <div class="pe-layoutlist">
                <div>
                    <a class="pe-menu-item" href="./">111342342342334</a>
                    <a class="pe-menu-item" href="./">222</a>
                </div>
                <div>
                    <a class="pe-menu-item" href="./">333</a>
                    <a class="pe-menu-item" href="./">444</a>
                </div>
            </div>
        </pe-menu>
    </pe-header-item>
</pe-header>
```

## header-layout
---

页面头部布局容器。通常在内部放置按钮等控件。

### 样式

采用横向弹性布局，高度 70px（移动端自适应高度，转为纵向布局），垂直居中对齐。移动端切换为纵向布局，自动取消固定高度，添加左右内边距保持间距。

### 示例

```html
<pe-header-layout class="pe-gap-xs">
    <div class="pe-button pe-pgrey">Button 1</div>
    <a class="pe-button pe-plain pe-bold">Sign In</a>
</pe-header-layout>
```


## icon
---

图标控件，用于显示各种图标。以 `fa-` 开头可使用 Font Awesome 图标

### 参数

#### name

`string`

图标名称，默认 link。如 `fa-solid fa-camera`。

- `link`: 右上角指向的箭头，表示外链打开
- `language`: 地球与文字符号结合，表示语言切换
- `backspace`: 左箭头加叉号，表示删除清除
- `switch`: 双向箭头指向左右，表示切换
- `eye`: 开放的眼睛轮廓，表示显示
- `eye-slash`: 眼睛加对角线，表示隐藏
- `back`: 左指向箭头，表示返回
- `arrow`: 小型右指向箭头，表示展开或前进
- `plus`: 加号，表示添加或新增
- `trash`: 垃圾桶，表示删除
- `drag`: 六点拖拽手柄，表示可拖拽

### 类属性

### 方法

### 插槽

### 样式

类似 Font Awesome 的图标组件，采用内联弹性布局居中对齐。默认尺寸 18×18px，左右间距 5px。内部 SVG 或图片元素同样带右间距。

图标以 SVG 路径形式内嵌（如 link、language 等），支持主题色继承和悬停状态。

### 示例

```html
<pe-icon name="language"></pe-icon>
<pe-icon name="eye"></pe-icon>
<pe-icon name="home"></pe-icon>
<pe-icon name="fa-solid fa-camera"></pe-icon>
```

## label
---

标签控件，支持普通文本、提示和日期显示模式

### 参数

#### mode

`'default'` | `'tip'` | `'mtip'` | `'date'`

显示模式，默认 default
- default: 普通文本模式
- tip: 提示模式
- mtip: 多行提示模式
- date: 日期模式

#### content

`string` | `number`

内容文本或秒级时间戳（当 mode 为 date 时为时间戳）

#### time

`boolean`

是否显示时间，默认 true（仅在 date 模式下有效）

#### date

`boolean`

是否显示日期，默认 true（仅在 date 模式下有效）

#### zone

`boolean`

是否显示时区，默认 false（仅在 date 模式下有效）

#### tz

`number` | `undefined`

时区偏移量，不设置则使用本地时区（仅在 date 模式下有效）

### 类属性

### 方法

### 插槽

### 样式

简洁的内联弹性布局标签。默认模式（default）为普通文本显示，tip 模式显示为注释色文字，mtip 模式在 tip 基础上增加顶部间距 10px。

date 模式支持格式化时间戳显示，根据 time、date、zone 参数动态组合输出格式。所有文字垂直居中对齐。

### 示例

```html
<pe-label mode="tip">Pwd</pe-label>
<pe-label content="这是一段文本"></pe-label>
<pe-label mode="date" content="1188565112" zone></pe-label>
```

## lnav
---

包含左侧导航栏的框架控件，支持响应式折叠

### 参数

### 类属性

### 方法

### 插槽

#### left

左侧栏内容区，通常用于放置导航菜单或侧栏内容

### 样式

适配 Web 应用的两栏式页面布局框架，由顶部 header、左侧导航栏和右侧主内容区三部分组成。采用横向弹性布局，顶部内边距等于 header 高度以避免重叠。左侧栏为粘性定位，宽度自定义，内部垂直可滚动；右侧主内容区弹性扩展，高度自适应，支持垂直滚动。左右分界线为 1px 边框。

在 800px 以下屏幕宽度时，左侧栏切换为全屏抽屉模式：固定定位覆盖整个视口，宽度 80%，右侧为半透明遮罩（rgba(0,0,0,.3)），栏体采用白色背景和投影效果；隐藏时通过 transform 将栏体向左平移移出屏幕，同时移除交互指针事件。

### 示例

```html
<pe-lnav>
    <template v-slot:left>
        <div class="pe-tree" style="min-width: 200px;">
            <a class="pe-tree-item" href="javascript:void(0);">Index</a>
            <div class="pe-tree-title">Part 1</div>
            <div class="pe-tree-item">Nav 1</div>
            <div class="pe-tree-menu">
                <a class="pe-tree-item" href="javascript:void(0);">Sub 1</a>
                <div class="pe-tree-item">Sub 2</div>
            </div>
        </div>
    </template>
    <!-- 右侧 -->
    <pe-banner class="pe-grad" direction="v" style="height: 250px; padding-top: 0;">
        <div class="pe-crumb">
            <a class="pe-crumb-item" href="./">Home</a>
            <div class="pe-crumb-item">Nav 9</div>
        </div>
        <div class="pe-btitle">Grad title</div>
        <div class="pe-bnote">Grad note Grad note Grad note Grad note Grad note Grad note Grad note</div>
    </pe-banner>
    <div class="pe-content">
        <!-- 右侧 content 内容 -->
        <pe-anchor>
            <h2>Title 1</h2>
            <p>
                Test Test Test Test Test Test Test<br>
                Test Test Test Test Test Test Test
            </p>
            <h2>Title 2</h2>
            <p>
                Test Test Test Test Test Test Test<br>
                Test Test Test Test Test Test Test
            </p>
        </pe-anchor>
    </div>
    <!-- 脚部 -->
    <div id="footer">
        <pe-footer>
            <div class="pe-footer-list pe-footer-end">
                <div class="pe-footer-logo"></div>
            </div>
            <div class="pe-footer-list">
                <div class="pe-footer-title">List 1</div>
                <a href="./">Page 1</a>
            </div>
            <div class="pe-footer-list">
                <div class="pe-footer-title">List 2</div>
                <a href="./" target="_blank">Page 1<pe-icon></pe-icon></a>
            </div>
            <div class="pe-footer-list">
                <div class="pe-footer-title">List 3</div>
                <a href="./">Page 1</a>
            </div>
            <template v-slot:bottom>
                <div class="pe-footer-bottom-row">
                    <div class="pe-layout">Item1</div>
                </div>
            </template>
        </pe-footer>
    </div>
</pe-lnav>
```

## menu
---

下拉菜单控件，通常配合 pe-header-item、pe-menudown 使用

### 参数

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Dropdown Menu，采用绝对定位的下拉菜单。白色背景、圆角、柔和阴影，初始状态透明且向下偏移 10px，悬停父级时平滑展开（不透明度和位移过渡）。

菜单项采用纵向排列，左右不等内边距，悬停时显示主题色背景和文字、圆角高亮。最小宽度 180px，单行不换行。rev 主题下无阴影。z-index 为 1。

### 示例

```html
<div class="pe-menudown pe-padding-xs">
    Language
    <pe-menu>
        <div class="pe-layoutlist">
            <div>
                <a class="pe-menu-item" href="javascript:void(0);">简体中文</a>
                <a class="pe-menu-item" href="javascript:void(0);">繁體中文</a>
            </div>
            <div>
                <a class="pe-menu-item" href="javascript:void(0);">English</a>
                <a class="pe-menu-item pe-disabled" href="javascript:void(0);">Français</a>
            </div>
        </div>
    </pe-menu>
</div>
```

## nboard
---

数字键盘控件，用于输入数字密码或验证码

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### custom

`string`

自定义按钮内容

#### buttons

`string[]`

底部按钮列表

#### size

`string` | `undefined`

尺寸大小，默认 m，可设置 xs、s

#### modelValue

`string`

当前输入的值

#### length

`number`

允许输入的长度，默认 6

#### split

`boolean`

是否分割显示每个数字，默认 false

### 类属性

### 方法

### 插槽

#### title

数字键盘顶部标题区域

### 样式

类似移动端数字键盘，采用垂直布局。顶部可选标题区（大字号，带内边距），输入框区域水平居中显示分格数字（可选 split 模式显示边框分隔），下方为 4×3 数字键盘网格（1-9、自定义键、0、退格）。

键盘按钮网格布局，带顶部和左右边框分隔线，悬停时灰色背景，按下时白色背景带阴影。底部可选操作按钮行（最后一个按钮主题色背景，悬停时变亮，按下时变暗带轮廓阴影）。

支持 plain 模式（无外边框）、size 尺寸调整（s/xs）。非 plain 模式下带圆角、边框和阴影，底部按钮右下角圆角。

### 事件

#### changed()

值改变事件

#### button(item)

底部按钮点击事件

##### item

`string`

### 示例

```html
<pe-nboard v-model="nboard" :disabled="nboardDisabled" :plain="nboardPlain" :split="nboardSplit" :custom="nboardCustom ? '#' : undefined" :buttons="nboardButtons ? ['Cancel', 'OK'] : []" @button="nboardButton" :size="nboardSize !== 'default' ? nboardSize : undefined">
    <template v-if="nboardTitle" v-slot:title>
        <span>This is a title</span>
    </template>
</pe-nboard>
```

```typescript
class Page extends purease.AbstractPage {

    public nboardButton(btn: string): void {
        this.alert(btn, 'pe');
    }

}
```

## page
---

分页控件，用于数据分页展示

### 参数

#### modelValue

`number`

当前页码，默认 1

#### max

`number`

最大页数，设置后将忽略 total 和 count 的自动计算，默认 0

#### total

`number`

总条数，用于自动计算最大页数，默认 0

#### count

`number`

每页显示条数，默认 10，支持 v-model

#### counts

`number[]`

每页条数选项，设置后会显示每页条数选择器

#### control

`number`

显示的页码控制数量，默认 10

### 类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 Pagination，采用居中排列的横向弹性布局。页码按钮为正方形（45×45px，移动端 40×40px），白色背景、圆角、边框和柔和阴影。

左右翻页按钮显示为旋转箭头（CSS 伪元素实现）。选中页码显示主题色背景和白色文字。悬停时灰色背景，聚焦/按下时白色背景带轮廓阴影。每页条数选择器无圆角阴影，左右内边距 15px。

底部可选总数提示文字，居中显示，顶部间距 10px。按钮间距 10px。

### 事件

#### change(page)

页码改变后事件

##### page

`number`

### 示例

```html
<pe-page v-model="p1" max="10" :control="control"></pe-page>
<pe-page v-model="p2" max="30" :control="control"></pe-page>
<pe-page v-model="p3" total="1282" :control="control"></pe-page>
```

## select
---

下拉选择控件

### 参数

#### modelValue

`string`

当前选中的值

#### data

`Array<string | { label?: string; value?: string; disabled?: boolean }>`

数据源，可以是字符串数组或对象数组也可以混用

#### disabled

`boolean`

是否禁用，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### search

`boolean`

是否显示搜索框，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Select 选择器，采用横向弹性布局。主体为圆角矩形输入框样式，带边框和阴影，背景色支持悬停变浅。聚焦/按下时显示轮廓阴影。

标签区域弹性扩展且左对齐，右侧显示向下小箭头（CSS 伪元素实现，旋转 45 度）。点击弹出下拉列表（dlist 组件），单行不换行。支持 search 模式（顶部搜索框+下拉列表），列表最大高度 350px 可滚动。

支持 plain 模式（无边框和阴影）。禁用状态下交互禁用。

### 事件

#### changed(event)

选中项改变事件

##### event

`ISelectChangedEvent`

### 示例

```html
<pe-select style="width: 200px;" v-model="dbottom" :data="['default', 'dark']"></pe-select>
```

## setting
---

设置容器控件，用于包裹设置项

### 参数

#### type

`string`

类型标识

#### hover

`boolean`

是否启用悬停效果，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### light

`boolean`

是否为亮色风格，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 iOS 设置界面的列表容器，采用垂直排列布局。默认圆角、边框和背景色，子项间带细分隔线。支持三种风格：默认（深色分隔线）、plain（无左右边框，直角）、light（浅色分隔线和边框）。

子项（setting-block/setting-item）非最后一项时显示底部分隔线。overflow hidden 保证圆角裁剪。

### 示例

```html
<pe-setting :hover="settingHover" :plain="settingPlain" :light="settingLight">
    <pe-setting-item title="How are you" note="Ok, I'm ok, you?" mark="New">END</pe-setting-item>
    <pe-setting-item title="How are you" note="Ok, I'm ok, you?">
        <pe-switch />
    </pe-setting-item>
    <pe-setting-item title="How are you" note="stripe" class="pe-stripe"></pe-setting-item>
    <pe-setting-item v-slot:left mark="#12">v-slot:left</pe-setting-item>
    <pe-setting-item title="How are you" note="No right" arrow></pe-setting-item>
</pe-setting>
```

## setting-block
---

设置区块控件，用于分组设置项

### 参数

#### hover

`boolean`

是否启用悬停效果，默认 false

### 类属性

### 方法

### 插槽

### 样式

设置项分组块，采用横向弹性布局居中对齐。带内边距，支持悬停时灰色背景高亮（通过 hover 类控制），过渡动画流畅。子项间带小间距（gap）。

### 示例

```html
<pe-setting light>
    <pe-setting-item nopadding nogap v-slot:left>
        <pe-setting-block style="flex: 1;" hover>1</pe-setting-block>
        <pe-setting-block style="flex: 1;" hover>2</pe-setting-block>
        <pe-setting-block style="flex: 1;" hover>3</pe-setting-block>
    </pe-setting-item>
</pe-setting>
```

## setting-item
---

设置项控件，用于显示单个设置项

### 参数

#### type

`string`

类型标识

#### direction

`'h'` | `'v'`

布局方向，h 为横向，v 为纵向，默认 h

#### arrow

`boolean`

是否显示右侧箭头，默认 false

#### mark

`string`

标记内容，显示在右侧

#### gap

`string`

右侧内容间距

#### alignH

`string` | `undefined`

水平对齐方式

#### alignV

`string`

垂直对齐方式，默认 center

#### nopadding

`boolean`

是否无内边距，默认 false

#### nogap

`boolean`

是否无间距，默认 false

#### title

`string`

标题文本

#### note

`string`

备注文本

### 类属性

### 方法

### 插槽

#### left

左侧区域，替代默认的 title/note 布局

### 样式

单个设置项，采用横向弹性布局。左侧为标题+备注区域（纵向排列，标题大字号，备注灰色小字号），右侧为操作区域（支持横向/纵向布局和对齐方式，可换行）。

可选右侧箭头指示器（反向 back 图标）或右上角标记（主题色背景、白色文字、左下圆角）。支持 nopadding（无内边距）和 nogap（无间距）模式。

父容器启用 hover 模式时，悬停显示灰色背景。背景色继承输入框背景色，相对定位便于标记绝对定位。

### 示例

```html
<pe-setting :hover="settingHover" :plain="settingPlain" :light="settingLight">
    <pe-setting-item title="How are you" note="Ok, I'm ok, you?" mark="New">END</pe-setting-item>
    <pe-setting-item title="How are you" note="Ok, I'm ok, you?">
        <pe-switch />
    </pe-setting-item>
    <pe-setting-item title="How are you" note="stripe" class="pe-stripe"></pe-setting-item>
    <pe-setting-item v-slot:left mark="#12">v-slot:left</pe-setting-item>
    <pe-setting-item title="How are you" note="No right" arrow></pe-setting-item>
</pe-setting>
```

## slider
---

滑块控件，支持单值和范围选择

### 参数

#### modelValue

`[number, number]`

当前值，数组格式，第一个元素为左侧值，第二个元素为右侧值（range 模式），默认 [0, 0]

#### min

`number`

最小值，默认 0

#### max

`number`

最大值，默认 100

#### range

`boolean`

是否为范围选择模式，默认 false

### 类属性

### 方法

### 样式

类似 Ant Design 的 Slider 滑块，采用相对定位的横向轨道（高度 6px，圆角 3px，带内阴影）。已选区域以主题色填充条覆盖。

滑块手柄为圆形按钮（22×22px，圆角 11px），白色背景、边框和阴影，通过 calc 定位（百分比偏移减去手柄半径）。悬停时放大 1.3 倍且变浅灰，聚焦/按下时放大并显示轮廓阴影。

范围模式下显示两个手柄和中间的填充条。所有交互元素均禁用用户选择，过渡动画流畅。

### 示例

```html
<pe-slider v-model="slider1"></pe-slider>
<div>min: 100, max: 500, {{slider2}}</div>
<pe-slider v-model="slider2" range min="100" max="500"></pe-slider>
```

## spa
---

单页应用容器控件，基于 hash 路由

### 参数

#### plain

`boolean`

是否为朴素风格，默认 false

#### full

`boolean`

是否全屏显示，默认 false

### 类属性

### 方法

### 样式

单页应用根容器，采用相对定位，overflow hidden，文本左对齐。默认带边框和圆角，白色背景（oklch 色彩空间）。

plain 模式下无边框和圆角。full 模式下切换为全屏固定定位（z-index 2）。子页面（spa-page）绝对定位叠加，通过显示/隐藏和过渡动画实现页面切换。

### 示例

```html
<pe-spa :plain="spaPlain" :full="spaFull" style="min-width: 400px; min-height: 700px;">
    <!-- 第一页 -->
    <pe-spa-page path="/">
        <pe-spa-header>Hello world</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
    <!-- 第二页 -->
    <pe-spa-page path="/2" @show="spaShow2" @hide="spaHide2">
        <pe-spa-header back>
            <pe-circle type="pe" size="s"></pe-circle>
            <div>The 2 Page</div>
        </pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
    <!-- 第三页 -->
    <pe-spa-page path="/3" grey>
        <pe-spa-header style="flex-direction: column;" note="the note text" back>The 3 Page</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```

## spa-content
---

SPA 内容区域控件，用于 pe-spa-page 内

### 参数

### 类属性

### 方法

### 样式

页面内容区域，采用纵向弹性布局，弹性扩展填充可用空间（flex: 1，height: 0），支持垂直滚动。

### 示例

```html
<pe-spa>
    <pe-spa-page path="/2" @show="spaShow2" @hide="spaHide2">
        <pe-spa-header back>
            <pe-circle type="pe" size="s"></pe-circle>
            <div>The 2 Page</div>
        </pe-spa-header>
        <pe-spa-content>
            test test<br><br>
            <div class="pe-button pe-pgrey">Button</div>
        </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```

## spa-footer
---

SPA 底部导航栏控件，用于 pe-spa-page 的底部

### 参数

#### modelValue

`string`

当前选中的导航项值

### 类属性

### 方法

### 样式

底部导航栏，采用横向弹性布局，背景色为输入框背景色。子项（spa-footer-icon）等宽分布，图标+文字纵向排列居中。

### 示例

```html
<pe-spa :plain="spaPlain" :full="spaFull" style="min-width: 400px; min-height: 700px;">
    <pe-spa-page path="/">
        <pe-spa-header>Hello world</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
        <pe-spa-footer>
            <pe-spa-footer-icon title="Full" v-model="spaFooter" value="1">
                <pe-icon name="eye"></pe-icon>
            </pe-spa-footer-icon>
            <pe-spa-footer-icon title="Text" v-model="spaFooter" value="2"></pe-spa-footer-icon>
            <pe-spa-footer-icon v-model="spaFooter" value="3">
                <pe-icon name="language"></pe-icon>
            </pe-spa-footer-icon>
        </pe-spa-footer>
    </pe-spa-page>
</pe-spa>
```

## spa-footer-icon
---

SPA 底部导航图标项

### 参数

#### title

`string`

图标标题文本

#### modelValue

`string`

当前选中的值

#### value

`string`

当前图标项的值

### 类属性

### 方法

### 样式

底部导航图标项，采用弹性扩展的纵向布局居中对齐。默认注释色文字，小字号，选中时变为主题色。内边距小，图标尺寸 24×24px。

禁用过渡动画（避免页面切换时闪烁）。支持 cursor pointer 和 user-select none。

### 示例

```html
<pe-spa plain full>
    <pe-spa-page path="/">
        <pe-spa-header>Hello world</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
        <pe-spa-footer>
            <pe-spa-footer-icon title="Full" v-model="spaFooter" value="1">
                <pe-icon name="eye"></pe-icon>
            </pe-spa-footer-icon>
            <pe-spa-footer-icon title="Text" v-model="spaFooter" value="2"></pe-spa-footer-icon>
            <pe-spa-footer-icon v-model="spaFooter" value="3">
                <pe-icon name="language"></pe-icon>
            </pe-spa-footer-icon>
        </pe-spa-footer>
    </pe-spa-page>
</pe-spa>
```

## spa-header
---

SPA 页面头部控件

### 参数

#### back

`boolean`

是否显示返回按钮，默认 false

#### note

`string`

备注文本，显示在默认插槽（通常是标题）后方

#### direction

`'h'` | `'v'`

布局流向，默认 `'h'`

### 类属性

### 方法

### 样式

页面头部标题栏，采用横向弹性布局居中对齐，高度 65px（移动端 50px），大字号，相对定位。左侧可选返回按钮（绝对定位左侧，垂直居中），标题居中，可选副标题（小字号注释色，单独居中）。

标题和备注行高为 1，间距小。移动端自动缩小高度保持紧凑。

### 示例

```html
<pe-spa>
    <pe-spa-page path="/2" @show="spaShow2" @hide="spaHide2">
        <pe-spa-header back>The 2 Page</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
    <pe-spa-page path="/3" grey>
        <pe-spa-header direction="v" note="the note text" back>The 3 Page</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```

## spa-page
---

SPA 单个页面控件

### 参数

#### path

`string`

页面路径，对应 hash 路由

#### grey

`boolean`

是否使用灰色背景，默认 false

### 类属性

### 方法

### 样式

单个页面容器，绝对定位填充整个父容器（0,0,100%,100%），白色背景（oklch 色彩空间），纵向弹性布局，带过渡动画。

grey 模式下背景变为灰色。显示状态（display）通过类控制：pe-display 时 display flex，否则 none。显示动画（show）通过透明度和水平位移实现（向右 10px 淡入）。

### 事件

#### show(event)

页面显示事件

##### event

`ISpaShowEvent`

#### hide(event)

页面隐藏事件

##### event

`ISpaHideEvent`

### 示例

```html
<pe-spa plain full>
    <pe-spa-page path="/" @show="spaShow" @hide="spaHide">
        <pe-spa-header back>The Page</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```

```typescript
class Page extends purease.AbstractPage {

    public spaShow(e: purease.control.ISpaShowEvent): void {
        purease.display('spaShow', e);
    }

    public spaHide(e: purease.control.ISpaHideEvent): void {
        purease.display('spaHide', e);
    }

}
```

## switch
---

开关控件

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### map

`{ 'true'?: boolean | string | number; 'false'?: boolean | string | number; }`

值映射对象，可以自定义开关的真假值，默认 {}

#### modelValue

`boolean` | `string` | `number`

当前值，默认 false

### 方法

### 样式

类似 Ant Design 的 Switch 开关，采用相对定位的圆角矩形轨道（宽度为高度 2 倍，默认灰色背景）。内部为绝对定位的圆形滑块（高度减去 6px，3px 边距，白色背景带阴影），位置和背景色过渡使用三次贝塞尔曲线。

选中状态下轨道变为主题色，滑块向右移动一个尺寸单位。悬停/聚焦/按下时轨道颜色加深。移动端自动缩小尺寸（35px 变为 25px）。

禁用状态下无交互和颜色变化。outline none。

### 事件

#### change(event)

值改变事件

##### event

`ISwitchChangeEvent`

### 示例

```html
<pe-switch v-model="switch1"></pe-switch>
<div>{{switch2}}</div>
<pe-switch v-model="switch2" :map="{'true':'a','false':'b'}"></pe-switch>
```

## tab
---

选项卡容器控件

### 参数

#### modelValue

`number`

当前选中的 tab 索引，默认 0

#### type

`'default'` | `'plain'` | `'light'` | `'rect'`

类型样式，默认 default

#### hover

`boolean`

是否悬停切换（鼠标悬停时切换），默认 false

### 类属性

### 方法

### 样式

类似 Ant Design 的 Tabs 选项卡，采用居中排列的横向弹性布局。默认类型底部带 1px 边框，选中项底部 3px 主题色边框（向下偏移 1px 覆盖容器边框）。未选中项为注释色。

plain 类型无底部边框。light 类型无底部边框且带 10px 间距，选中项显示主题色背景圆角。rect 类型为灰色背景容器（3px 内边距，圆角），底部无边框，选中项通过伪元素白色背景块平滑移动指示（CSS 变量控制位置和宽度）。

禁用用户选择，cursor default。

### 示例

```html
<pe-tab v-model="tab">
    <pe-tab-item>Tab1</pe-tab-item>
    <pe-tab-item>Tab2</pe-tab-item>
    <pe-tab-item>Tab3</pe-tab-item>
</pe-tab>
```

## tab-item
---

选项卡子项控件，与 pe-tab 配合使用

### 参数

### 类属性

### 方法

### 样式

选项卡子项，带内边距和过渡动画。默认类型底部 3px 透明边框（向下偏移 1px），选中时变为主题色边框，文字变主题色并加粗。

light 类型为小圆角按钮样式（小内边距，无边框），选中时主题色背景。rect 类型为小内边距+1px 透明边框，无偏移，z-index 1，选中时文字不加粗保持常规色。

### 示例

```html
<pe-tab type="light" :hover="tabHover">
    <pe-tab-item>Tab1</pe-tab-item>
    <pe-tab-item>Tab2</pe-tab-item>
    <pe-tab-item>Tab3</pe-tab-item>
</pe-tab>
```

## table
---

表格容器控件

### 参数

#### adaption

`boolean`

是否自适应布局（响应式，首列会在小屏模式下变为单独的行），默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

### 方法

### 样式

类似 Ant Design 的 Table 表格，采用纵向弹性布局容器。带圆角、边框和弹窗阴影，行间带细分隔线。首行圆角上半部分，末行圆角下半部分。

plain 模式下无外边框和阴影（仅底部 1px 边框），首行底部边框加粗。响应式友好。

### 示例

```html
<pe-table adaption plain>
    <pe-table-row>
        <pe-table-head>Title</pe-table-head>
        <pe-table-head>Head1</pe-table-head>
        <pe-table-head>Head2</pe-table-head>
    </pe-table-row>
    <pe-table-row v-for="i of 3">
        <pe-table-cell>Title</pe-table-cell>
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
    </pe-table-row>
    <pe-table-row title>
        <pe-table-cell>Sub title</pe-table-cell>
    </pe-table-row>
    <pe-table-row v-for="i of 2">
        <pe-table-cell>Title</pe-table-cell>
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
    </pe-table-row>
</pe-table>
```

## table-cell
---

表格单元格控件

### 参数

### 类属性

### 方法

### 样式

表格单元格，带小内边距，文本居中对齐。

### 示例

```html
<pe-table>
    <pe-table-row>
        <pe-table-cell>内容1</pe-table-cell>
        <pe-table-cell>内容2</pe-table-cell>
        <pe-table-cell>内容3</pe-table-cell>
    </pe-table-row>
</pe-table>
```

## table-head
---

表格表头单元格控件

### 参数

### 类属性

### 方法

### 样式

表格表头单元格，带小内边距、加粗文字，文本居中对齐。

### 示例

```html
<pe-table>
    <pe-table-row>
        <pe-table-head>Head1</pe-table-head>
        <pe-table-head>Head2</pe-table-head>
        <pe-table-head>Head3</pe-table-head>
    </pe-table-row>
    <pe-table-row v-for="i of 5">
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
        <pe-table-cell>Cell3</pe-table-cell>
    </pe-table-row>
</pe-table>
```

## table-row
---

表格行控件

### 参数

#### title

`boolean`

是否为标题行（表头行），默认 false

### 类属性

### 方法

### 样式

表格行，采用 CSS Grid 布局（列数通过 CSS 变量 --pe-cols 控制），输入框背景色，悬停时背景变浅，过渡动画流畅。

title 模式下首列文字加粗。表头行（table-header）粘性定位（top 为 header 高度）。移动端自适应模式（adaption）下，表头首列隐藏，行变为减一列的网格，首列跨越全部剩余列宽度。

### 示例

```html
<pe-table adaption plain>
    <pe-table-row>
        <pe-table-head>Title</pe-table-head>
        <pe-table-head>Head1</pe-table-head>
        <pe-table-head>Head2</pe-table-head>
    </pe-table-row>
    <pe-table-row v-for="i of 3">
        <pe-table-cell>Title</pe-table-cell>
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
    </pe-table-row>
    <pe-table-row title>
        <pe-table-cell>Sub title</pe-table-cell>
    </pe-table-row>
    <pe-table-row v-for="i of 2">
        <pe-table-cell>Title</pe-table-cell>
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
    </pe-table-row>
</pe-table>
```

## tag
---

标签控件，用于标记和分类；搭配 `plain` 参数和 `click` 事件可以做出标签选中效果

### 参数

#### type

`'default'` | `'primary'` | `'info'` | `'warning'` | `'danger'` | `'pe'`

类型样式，默认 default

#### plain

`boolean`

是否为朴素风格，默认 false

#### size

`'xs'` | `'s'` | `'m'` | `'l'`

尺寸大小，默认 m

#### close

`boolean`

是否显示关闭按钮，默认 false

### 类属性

### 方法

### 样式

类似 Element Plus 的 Tag 标签，采用内联弹性布局居中对齐，大圆角（radius-l），行高 1，过渡动画流畅。支持四种尺寸（xs/s/m/l）的内边距。

默认模式为实心风格（背景色+白色文字），支持 default/primary/info/warning/danger/pe/current 七种类型色。plain 模式为边框样式（边框色+文字色+浅色背景）。

可选关闭按钮（右侧 SVG 图标），悬停时变亮。实心模式下关闭按钮悬停显示半透明白色背景，按下显示半透明黑色背景。plain 模式下悬停/按下时关闭按钮显示对应类型色背景配白色填充。

### 事件

#### close

关闭按钮点击事件

### 示例

```html
<pe-tag type="pe" :plain="spaTag !== '1'" @click="spaTag = '1'">Tag 1</pe-tag>
<pe-tag type="pe" :plain="spaTag !== '2'" @click="spaTag = '2'">Tag 2</pe-tag>
<pe-tag type="pe" :plain="spaTag !== '3'" @click="spaTag = '3'">Tag 3</pe-tag>
<pe-tag type="pe" :plain="spaTag !== '4'" @click="spaTag = '4'">Tag 4</pe-tag>
<pe-tag type="pe" :plain="spaTag !== '5'" @click="spaTag = '5'">Tag 5</pe-tag>
<pe-tag type="pe" :plain="spaTag !== '6'" @click="spaTag = '6'">Tag 6</pe-tag>
<pe-tag type="pe" :plain="spaTag !== '7'" @click="spaTag = '7'">Tag 7</pe-tag>
```

```typescript
class Page extends purease.AbstractPage {

    public spaTag = '1';

}
```

## text
---

文本输入控件，支持单行、多行、密码和数字输入

### 参数

#### modelValue

`string`

当前输入的值

#### readonly

`boolean`

是否只读，默认 false

#### type

`'text'` | `'multi'` | `'password'` | `'number'`

输入框类型，默认 text
- `text`: 单行文本
- `multi`: 多行文本
- `password`: 密码
- `number`: 数字

#### placeholder

`string`

占位符文本

#### disabled

`boolean`

是否禁用，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### maxlength

`number`

最大字符长度限制，0 表示无限制，默认 0

#### max

`number` | `undefined`

最大值（仅在 type 为 number 时有效）

#### min

`number` | `undefined`

最小值（仅在 type 为 number 时有效）

### 类属性

### 方法

### 插槽

#### before

输入框前置插槽，用于在输入框左侧显示内容，通常用于插入控件

#### prepend

输入框预装插槽，用于在输入框左侧显示内容，与 before 的区别是有垂直居中和 padding

#### append

输入框追加插槽，用于在输入框右侧显示内容，与 after 的区别是有垂直居中和 padding

#### after

输入框后置插槽，用于在输入框右侧显示内容，通常用于插入控件

### 样式

类似 Ant Design 的 Input 输入框，采用横向弹性布局，圆角、边框和过渡动画。背景色支持悬停变浅，聚焦时白色背景带轮廓阴影。

input/textarea 元素去除默认样式，透明背景，弹性扩展（width 0），带小内边距，textarea 禁用 resize。支持 before/prepend/append/after 四个插槽（弹性布局），prepend 和 append 左对齐居中。

密码类型右侧显示眼睛图标切换显示/隐藏（悬停时不透明度提升）。plain 模式无边框。

### 事件

#### beforechange(event)

值改变前事件

##### event

`ITextBeforechangeEvent`

#### focus()

获得焦点事件

#### blur()

失去焦点事件

### 示例

```html
<pe-text style="width: 400px;" v-model="text"></pe-text>
<pe-text style="width: 400px;" v-model="text" plain></pe-text>
<pe-text style="width: 400px;" v-model="text">
    <template v-slot:prepend>Hello:</template>
    <template v-slot:append>KG</template>
</pe-text>
```

## uploader
---

图片上传控件，用于展示已上传的图片列表，支持删除、拖拽排序和上传进度显示。

### 参数

#### modelValue

`Array<string | { title?: string; src: string; }>`

已上传图片列表，可以是字符串数组或包含 title 和 src 的对象数组，默认 []

#### disabled

`boolean` | `string`

是否禁用，默认 false

#### length

`number` | `string`

最大数量限制，默认 6

#### drag

`boolean` | `string`

是否启用拖拽排序，默认 false

#### pre

`string`

图像 URL 前缀，默认空

#### multi

`boolean` | `string`

是否可多选上传，默认 false

#### progress

`number` | `undefined`

上传进度（0-100），undefined 表示不显示进度，显示加号图标

### 类属性

### 方法

### 事件

#### select

点击选择按钮时触发

#### remove

移除项时触发，可通过 `event.preventDefault()` 阻止默认移除行为

#### changed

列表变化时触发（移除或拖拽排序后）

### 插槽

### 样式

类似 Ant Design 的 Upload 图片墙，采用 flex 弹性布局横向排列，自动换行。每个图片项为 90×90px 的圆角方块，带 1px 边框。

已上传图片采用 cover 方式填充容器，可选显示顶部标题栏。悬停时底部显示操作栏（删除按钮、拖拽手柄），操作按钮带半透明黑色背景，悬停时加深。

选择按钮为虚线边框方块，居中显示加号图标。上传中时显示环形进度条和百分比文字。支持禁用状态（降低透明度、禁用交互）和 RTL 布局。

### 示例

```html
<pe-uploader v-model="images" @select="handleSelect" multi drag></pe-uploader>
```


## vnumber
---

验证码输入控件，用于输入数字验证码或密码类纯数字输入的场景

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### modelValue

`string`

当前输入的数字值

#### length

`number`

长度，默认 6

### 类属性

### 方法

### 样式

验证码输入框，采用横向弹性布局容器，圆角、边框和过渡动画。聚焦时显示轮廓阴影。内部隐藏实际 input（全尺寸绝对定位，不透明度 0，字号 1px，隐藏数字 spinner）。

数字格子横向排列（右侧细分隔线），固定尺寸（内边距 s × 2 + 字号），居中显示。当前输入位置显示下划线闪烁动画（CSS keyframes 控制透明度）。禁用用户选择，overflow hidden。

### 事件

#### changed()

值改变事件

### 示例

```html
<pe-vnumber v-model="vnumber" :disabled="vnumberDisabled"></pe-vnumber>
```
control/index.md
---

[**Documents for purease**](../index.md)

***

[Documents for purease](../index.md) / control

# control

## Interfaces

- [ICaptchaResultEvent](interfaces/ICaptchaResultEvent.md)
- [ICascaderChangedEvent](interfaces/ICascaderChangedEvent.md)
- [ICascaderOption](interfaces/ICascaderOption.md)
- [ICollapseChangeEvent](interfaces/ICollapseChangeEvent.md)
- [IControlVue](interfaces/IControlVue.md)
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
- [IUploaderRemoveEvent](interfaces/IUploaderRemoveEvent.md)

## Type Aliases

- [IDlistTapEvent](type-aliases/IDlistTapEvent.md)

## Variables

- [common](variables/common.md)
- [list](variables/list.md)

control/interfaces/ICaptchaResultEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ICaptchaResultEvent

# Interface: ICaptchaResultEvent

Defined in: [control.ts:258](https://github.com/maiyun/purease/blob/master/dist/control.ts#L258)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:259](https://github.com/maiyun/purease/blob/master/dist/control.ts#L259)

#### result

> **result**: `number`

#### token

> **token**: `string`

control/interfaces/ICascaderChangedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ICascaderChangedEvent

# Interface: ICascaderChangedEvent

Defined in: [control.ts:278](https://github.com/maiyun/purease/blob/master/dist/control.ts#L278)

Cascader 选中项变更事件

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:279](https://github.com/maiyun/purease/blob/master/dist/control.ts#L279)

#### labels

> **labels**: `string`[]

选中标签数组

#### value

> **value**: `string`[]

选中值数组

control/interfaces/ICascaderOption.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ICascaderOption

# Interface: ICascaderOption

Defined in: [control.ts:268](https://github.com/maiyun/purease/blob/master/dist/control.ts#L268)

Cascader 数据项类型

## Properties

### children?

> `optional` **children**: `ICascaderOption`[]

Defined in: [control.ts:274](https://github.com/maiyun/purease/blob/master/dist/control.ts#L274)

***

### disabled?

> `optional` **disabled**: `boolean`

Defined in: [control.ts:271](https://github.com/maiyun/purease/blob/master/dist/control.ts#L271)

***

### label?

> `optional` **label**: `string`

Defined in: [control.ts:269](https://github.com/maiyun/purease/blob/master/dist/control.ts#L269)

***

### leaf?

> `optional` **leaf**: `boolean`

Defined in: [control.ts:273](https://github.com/maiyun/purease/blob/master/dist/control.ts#L273)

是否为叶子节点，lazy 模式下用于判断是否需要加载子节点

***

### value?

> `optional` **value**: `string`

Defined in: [control.ts:270](https://github.com/maiyun/purease/blob/master/dist/control.ts#L270)

control/interfaces/ICollapseChangeEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / ICollapseChangeEvent

# Interface: ICollapseChangeEvent

Defined in: [control.ts:162](https://github.com/maiyun/purease/blob/master/dist/control.ts#L162)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:163](https://github.com/maiyun/purease/blob/master/dist/control.ts#L163)

#### value

> **value**: `string` \| `string`[]

control/interfaces/IControlVue.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IControlVue

# Interface: IControlVue

Defined in: [control.ts:11](https://github.com/maiyun/purease/blob/master/dist/control.ts#L11)

Vue 实例

## Extends

- [`IVue`](../../purease/interfaces/IVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1060](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1060)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$attrs`](../../purease/interfaces/IVue.md#attrs)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1061](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1061)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$data`](../../purease/interfaces/IVue.md#data)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1062](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1062)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$el`](../../purease/interfaces/IVue.md#el)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1066](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1066)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$options`](../../purease/interfaces/IVue.md#options)

***

### $parent

> **$parent**: [`IVue`](../../purease/interfaces/IVue.md) \| `null`

Defined in: [purease.ts:1067](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1067)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$parent`](../../purease/interfaces/IVue.md#parent)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1068](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1068)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$props`](../../purease/interfaces/IVue.md#props)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & [`IVue`](../../purease/interfaces/IVue.md)\>

Defined in: [purease.ts:1069](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1069)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$refs`](../../purease/interfaces/IVue.md#refs)

***

### $root

> **$root**: [`IVue`](../../purease/interfaces/IVue.md)

Defined in: [purease.ts:1070](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1070)

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$root`](../../purease/interfaces/IVue.md#root)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1071](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1071)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](../../purease/interfaces/IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](../../purease/interfaces/IVNode.md)[] \| `undefined`

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$slots`](../../purease/interfaces/IVue.md#slots)

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1075](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1075)

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

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$watch`](../../purease/interfaces/IVue.md#watch)

***

### alignHComp

> **alignHComp**: `string` \| `undefined`

Defined in: [control.ts:26](https://github.com/maiyun/purease/blob/master/dist/control.ts#L26)

获取 alignH 的 css 属性模式，请确保 $props.alignH 存在

***

### alignVComp

> **alignVComp**: `string` \| `undefined`

Defined in: [control.ts:28](https://github.com/maiyun/purease/blob/master/dist/control.ts#L28)

获取 alignH 的 css 属性模式，请确保 props.alignH 存在

***

### isRtl

> **isRtl**: `boolean`

Defined in: [control.ts:30](https://github.com/maiyun/purease/blob/master/dist/control.ts#L30)

是否是 rtl 模式

***

### l()

> **l**: (`key`, `data?`) => `string`

Defined in: [control.ts:24](https://github.com/maiyun/purease/blob/master/dist/control.ts#L24)

获取语言包内容

#### Parameters

##### key

`string`

##### data?

`string`[]

#### Returns

`string`

***

### parentByName()

> **parentByName**: (`controlName`) => `IControlVue` \| `null`

Defined in: [control.ts:22](https://github.com/maiyun/purease/blob/master/dist/control.ts#L22)

根据 control name 查询上层控件

#### Parameters

##### controlName

`string`

#### Returns

`IControlVue` \| `null`

***

### propArray()

> **propArray**: (`name`) => `any`[]

Defined in: [control.ts:20](https://github.com/maiyun/purease/blob/master/dist/control.ts#L20)

获取 props 中的 array 类型的值

#### Parameters

##### name

`string`

#### Returns

`any`[]

***

### propBoolean()

> **propBoolean**: (`name`) => `boolean`

Defined in: [control.ts:14](https://github.com/maiyun/purease/blob/master/dist/control.ts#L14)

获取 props 中的 boolean 类型的值

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### propInt()

> **propInt**: (`name`) => `number`

Defined in: [control.ts:18](https://github.com/maiyun/purease/blob/master/dist/control.ts#L18)

获取 props 中的 int 类型的值

#### Parameters

##### name

`string`

#### Returns

`number`

***

### propNumber()

> **propNumber**: (`name`) => `number`

Defined in: [control.ts:16](https://github.com/maiyun/purease/blob/master/dist/control.ts#L16)

获取 props 中的 number 类型的值

#### Parameters

##### name

`string`

#### Returns

`number`

## Methods

### $emit()

> **$emit**(`name`, ...`arg`): `void`

Defined in: [purease.ts:1063](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1063)

#### Parameters

##### name

`string`

##### arg

...`any`

#### Returns

`void`

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$emit`](../../purease/interfaces/IVue.md#emit)

***

### $forceUpdate()

> **$forceUpdate**(): `void`

Defined in: [purease.ts:1064](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1064)

#### Returns

`void`

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$forceUpdate`](../../purease/interfaces/IVue.md#forceupdate)

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1065](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1065)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`IVue`](../../purease/interfaces/IVue.md).[`$nextTick`](../../purease/interfaces/IVue.md#nexttick)

control/interfaces/IDateChangedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDateChangedEvent

# Interface: IDateChangedEvent

Defined in: [control.ts:225](https://github.com/maiyun/purease/blob/master/dist/control.ts#L225)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:226](https://github.com/maiyun/purease/blob/master/dist/control.ts#L226)

#### value?

> `optional` **value**: `number`

control/interfaces/IDatepanelChangedEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDatepanelChangedEvent

# Interface: IDatepanelChangedEvent

Defined in: [control.ts:240](https://github.com/maiyun/purease/blob/master/dist/control.ts#L240)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:241](https://github.com/maiyun/purease/blob/master/dist/control.ts#L241)

#### value?

> `optional` **value**: `number`

control/interfaces/IDatepanelRangeEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDatepanelRangeEvent

# Interface: IDatepanelRangeEvent

Defined in: [control.ts:233](https://github.com/maiyun/purease/blob/master/dist/control.ts#L233)

## Extends

- `ICustomEvent`

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:234](https://github.com/maiyun/purease/blob/master/dist/control.ts#L234)

#### end

> **end**: `number`

#### start

> **start**: `number`

***

### go

> **go**: `boolean`

Defined in: [control.ts:144](https://github.com/maiyun/purease/blob/master/dist/control.ts#L144)

#### Inherited from

`ICustomEvent.go`

***

### preventDefault()

> **preventDefault**: () => `void`

Defined in: [control.ts:146](https://github.com/maiyun/purease/blob/master/dist/control.ts#L146)

阻止默认行为

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

Defined in: [control.ts:246](https://github.com/maiyun/purease/blob/master/dist/control.ts#L246)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:247](https://github.com/maiyun/purease/blob/master/dist/control.ts#L247)

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

Defined in: [control.ts:179](https://github.com/maiyun/purease/blob/master/dist/control.ts#L179)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:180](https://github.com/maiyun/purease/blob/master/dist/control.ts#L180)

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

Defined in: [control.ts:207](https://github.com/maiyun/purease/blob/master/dist/control.ts#L207)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:208](https://github.com/maiyun/purease/blob/master/dist/control.ts#L208)

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

Defined in: [control.ts:198](https://github.com/maiyun/purease/blob/master/dist/control.ts#L198)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:199](https://github.com/maiyun/purease/blob/master/dist/control.ts#L199)

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

Defined in: [control.ts:191](https://github.com/maiyun/purease/blob/master/dist/control.ts#L191)

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:192](https://github.com/maiyun/purease/blob/master/dist/control.ts#L192)

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

Defined in: [control.ts:217](https://github.com/maiyun/purease/blob/master/dist/control.ts#L217)

## Extends

- `ICustomEvent`

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:218](https://github.com/maiyun/purease/blob/master/dist/control.ts#L218)

#### value

> **value**: `any`

***

### go

> **go**: `boolean`

Defined in: [control.ts:144](https://github.com/maiyun/purease/blob/master/dist/control.ts#L144)

#### Inherited from

`ICustomEvent.go`

***

### preventDefault()

> **preventDefault**: () => `void`

Defined in: [control.ts:146](https://github.com/maiyun/purease/blob/master/dist/control.ts#L146)

阻止默认行为

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

Defined in: [control.ts:170](https://github.com/maiyun/purease/blob/master/dist/control.ts#L170)

## Extends

- `ICustomEvent`

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:171](https://github.com/maiyun/purease/blob/master/dist/control.ts#L171)

#### change?

> `optional` **change**: `string`

#### value

> **value**: `string`

***

### go

> **go**: `boolean`

Defined in: [control.ts:144](https://github.com/maiyun/purease/blob/master/dist/control.ts#L144)

#### Inherited from

`ICustomEvent.go`

***

### preventDefault()

> **preventDefault**: () => `void`

Defined in: [control.ts:146](https://github.com/maiyun/purease/blob/master/dist/control.ts#L146)

阻止默认行为

#### Returns

`void`

#### Inherited from

`ICustomEvent.preventDefault`

control/interfaces/IUploaderRemoveEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IUploaderRemoveEvent

# Interface: IUploaderRemoveEvent

Defined in: [control.ts:152](https://github.com/maiyun/purease/blob/master/dist/control.ts#L152)

移除事件

## Properties

### detail

> **detail**: `object`

Defined in: [control.ts:155](https://github.com/maiyun/purease/blob/master/dist/control.ts#L155)

#### index

> **index**: `number`

***

### go

> **go**: `boolean`

Defined in: [control.ts:153](https://github.com/maiyun/purease/blob/master/dist/control.ts#L153)

***

### preventDefault()

> **preventDefault**: () => `void`

Defined in: [control.ts:154](https://github.com/maiyun/purease/blob/master/dist/control.ts#L154)

#### Returns

`void`

control/type-aliases/IDlistTapEvent.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / IDlistTapEvent

# Type Alias: IDlistTapEvent

> **IDlistTapEvent** = [`IDlistChangedEvent`](../interfaces/IDlistChangedEvent.md)

Defined in: [control.ts:187](https://github.com/maiyun/purease/blob/master/dist/control.ts#L187)

control/variables/common.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / common

# Variable: common

> `const` **common**: `object`

Defined in: [control.ts:35](https://github.com/maiyun/purease/blob/master/dist/control.ts#L35)

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

Defined in: [control.ts:128](https://github.com/maiyun/purease/blob/master/dist/control.ts#L128)

dom/functions/colorToHex.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / colorToHex

# Function: colorToHex()

> **colorToHex**(`color`): `string`

Defined in: [dom.ts:200](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L200)

将 CSS 颜色值转换为十六进制格式

## Parameters

### color

`string`

CSS 颜色值

## Returns

`string`

dom/functions/findParentByClass.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / findParentByClass

# Function: findParentByClass()

> **findParentByClass**(`el`, `name`): `HTMLElement` \| `null`

Defined in: [dom.ts:81](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L81)

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

Defined in: [dom.ts:141](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L141)

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

dom/functions/getCssVar.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / getCssVar

# Function: getCssVar()

> **getCssVar**(`name`, `el?`): `string`

Defined in: [dom.ts:188](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L188)

获取 CSS 变量的计算值

## Parameters

### name

`string`

变量名，如 --pe

### el?

`HTMLElement`

获取变量的元素，默认为 html

## Returns

`string`

dom/functions/hidePop.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / hidePop

# Function: hidePop()

> **hidePop**(`pop?`): `void`

Defined in: [dom.ts:31](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L31)

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

Defined in: [dom.ts:163](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L163)

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

Defined in: [dom.ts:179](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L179)

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

Defined in: [dom.ts:15](https://github.com/maiyun/purease/blob/master/dist/dom.ts#L15)

将 pop 显示出来

## Parameters

### e

`HTMLElement` | `PointerEvent`

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

## Functions

- [colorToHex](functions/colorToHex.md)
- [findParentByClass](functions/findParentByClass.md)
- [findParentByTag](functions/findParentByTag.md)
- [getCssVar](functions/getCssVar.md)
- [hidePop](functions/hidePop.md)
- [index](functions/index.md)
- [isRtl](functions/isRtl.md)
- [showPop](functions/showPop.md)

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

Defined in: [purease.ts:405](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L405)

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

Defined in: [purease.ts:421](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L421)

显示 lnav

#### Returns

`void`

***

### toTop()

> **toTop**(): `void`

Defined in: [purease.ts:408](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L408)

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

purease/classes/AbstractPanel.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / AbstractPanel

# Abstract Class: AbstractPanel

Defined in: [purease.ts:428](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L428)

大页面的内嵌页面

## Constructors

### Constructor

> **new AbstractPanel**(): `AbstractPanel`

#### Returns

`AbstractPanel`

## Properties

### rootPage

> **rootPage**: [`AbstractPage`](AbstractPage.md) & `Record`\<`string`, `any`\>

Defined in: [purease.ts:442](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L442)

获取总大页面对象

## Accessors

### l

#### Get Signature

> **get** **l**(): (`key`, `data?`) => `string`

Defined in: [purease.ts:447](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L447)

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

Defined in: [purease.ts:463](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L463)

等待渲染

##### Returns

> (): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### refs

#### Get Signature

> **get** **refs**(): `Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

Defined in: [purease.ts:456](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L456)

获取 refs 情况

##### Returns

`Record`\<`string`, `HTMLElement` & [`IVue`](../interfaces/IVue.md) & `Record`\<`string`, `any`\>\>

## Methods

### main()

> `abstract` **main**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:431](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L431)

入口方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onBeforeUnmount()

> **onBeforeUnmount**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:433](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L433)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onUnmounted()

> **onUnmounted**(): `void` \| `Promise`\<`void`\>

Defined in: [purease.ts:437](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L437)

#### Returns

`void` \| `Promise`\<`void`\>

***

### watch()

> **watch**\<`T`, `TK`, `TR`\>(`name`, `cb`, `opt`): () => `void`

Defined in: [purease.ts:473](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L473)

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

Defined in: [purease.ts:1038](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1038)

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

Defined in: [purease.ts:1051](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1051)

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

Defined in: [purease.ts:517](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L517)

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

Defined in: [purease.ts:494](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L494)

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

Defined in: [purease.ts:522](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L522)

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
- [IShowCaptchaOptions](interfaces/IShowCaptchaOptions.md)
- [IVApp](interfaces/IVApp.md)
- [IVNode](interfaces/IVNode.md)
- [IVue](interfaces/IVue.md)
- [IVueConfig](interfaces/IVueConfig.md)
- [IVueObject](interfaces/IVueObject.md)

## Type Aliases

- [IVueOptionMergeFunction](type-aliases/IVueOptionMergeFunction.md)

## Variables

- [global](variables/global.md)
- [pointer](variables/pointer.md)
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

Defined in: [purease.ts:1148](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1148)

Confirm 选项

## Properties

### cancel?

> `optional` **cancel**: `boolean`

Defined in: [purease.ts:1153](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1153)

是否显示取消按钮，默认不显示

***

### content

> **content**: `string`

Defined in: [purease.ts:1151](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1151)

支持 html

***

### title?

> `optional` **title**: `string`

Defined in: [purease.ts:1149](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1149)

purease/interfaces/IDialogOptions.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IDialogOptions

# Interface: IDialogOptions

Defined in: [purease.ts:1138](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1138)

Dialog 选项

## Properties

### buttons?

> `optional` **buttons**: `string`[]

Defined in: [purease.ts:1142](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1142)

***

### content

> **content**: `string`

Defined in: [purease.ts:1141](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1141)

支持 html

***

### select()?

> `optional` **select**: (`button`) => `boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

Defined in: [purease.ts:1144](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1144)

#### Parameters

##### button

`string`

#### Returns

`boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

***

### title?

> `optional` **title**: `string`

Defined in: [purease.ts:1139](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1139)

purease/interfaces/IShowCaptchaOptions.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IShowCaptchaOptions

# Interface: IShowCaptchaOptions

Defined in: [purease.ts:1157](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1157)

显示验证码选项

## Properties

### akey

> **akey**: `string`

Defined in: [purease.ts:1161](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1161)

验证码 key

***

### factory

> **factory**: `"tc"` \| `"cf"`

Defined in: [purease.ts:1159](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1159)

验证码服务商

purease/interfaces/IVApp.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVApp

# Interface: IVApp

Defined in: [purease.ts:1121](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1121)

Vue 应用

## Properties

### \_container

> **\_container**: `HTMLElement`

Defined in: [purease.ts:1134](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1134)

***

### config

> **config**: [`IVueConfig`](IVueConfig.md)

Defined in: [purease.ts:1124](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1124)

***

### version

> **version**: `string`

Defined in: [purease.ts:1132](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1132)

## Methods

### component()

#### Call Signature

> **component**(`name`): `any`

Defined in: [purease.ts:1122](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1122)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **component**(`name`, `config`): `this`

Defined in: [purease.ts:1123](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1123)

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

Defined in: [purease.ts:1125](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1125)

##### Parameters

###### name

`string`

##### Returns

`any`

#### Call Signature

> **directive**(`name`, `config`): `this`

Defined in: [purease.ts:1126](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1126)

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

Defined in: [purease.ts:1127](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1127)

#### Parameters

##### mixin

`any`

#### Returns

`this`

***

### mount()

> **mount**(`rootContainer`): [`IVue`](IVue.md)

Defined in: [purease.ts:1129](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1129)

#### Parameters

##### rootContainer

`string` | `HTMLElement`

#### Returns

[`IVue`](IVue.md)

***

### provide()

> **provide**\<`T`\>(`key`, `value`): `this`

Defined in: [purease.ts:1130](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1130)

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

Defined in: [purease.ts:1131](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1131)

#### Returns

`void`

***

### use()

> **use**(`plugin`, ...`options`): `this`

Defined in: [purease.ts:1128](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1128)

#### Parameters

##### plugin

`any`

##### options

...`any`[]

#### Returns

`this`

purease/interfaces/IVNode.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVNode

# Interface: IVNode

Defined in: [purease.ts:1084](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1084)

Vue 节点

## Indexable

\[`key`: `string`\]: `any`

## Properties

### children

> **children**: `object` & `IVNode`[]

Defined in: [purease.ts:1085](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1085)

#### Type Declaration

##### default

> **default**: () => `IVNode`[] \| `undefined`

***

### props

> **props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1089](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1089)

***

### type

> **type**: `symbol` \| `Record`\<`string`, `any`\>

Defined in: [purease.ts:1090](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1090)

purease/interfaces/IVue.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVue

# Interface: IVue

Defined in: [purease.ts:1059](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1059)

Vue 实例

## Extended by

- [`IControlVue`](../../control/interfaces/IControlVue.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### $attrs

> **$attrs**: `Record`\<`string`, `string`\>

Defined in: [purease.ts:1060](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1060)

***

### $data

> **$data**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1061](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1061)

***

### $el

> **$el**: `HTMLElement`

Defined in: [purease.ts:1062](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1062)

***

### $options

> **$options**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1066](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1066)

***

### $parent

> **$parent**: `IVue` \| `null`

Defined in: [purease.ts:1067](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1067)

***

### $props

> **$props**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1068](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1068)

***

### $refs

> **$refs**: `Record`\<`string`, `HTMLElement` & `IVue`\>

Defined in: [purease.ts:1069](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1069)

***

### $root

> **$root**: `IVue`

Defined in: [purease.ts:1070](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1070)

***

### $slots

> **$slots**: `object`

Defined in: [purease.ts:1071](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1071)

#### Index Signature

\[`key`: `string`\]: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

#### default

> **default**: (`o?`) => [`IVNode`](IVNode.md)[] \| `undefined`

***

### $watch()

> **$watch**: (`o`, `cb`, `opt?`) => `void`

Defined in: [purease.ts:1075](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1075)

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

Defined in: [purease.ts:1063](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1063)

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

Defined in: [purease.ts:1064](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1064)

#### Returns

`void`

***

### $nextTick()

> **$nextTick**(): `Promise`\<`void`\>

Defined in: [purease.ts:1065](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1065)

#### Returns

`Promise`\<`void`\>

purease/interfaces/IVueConfig.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / IVueConfig

# Interface: IVueConfig

Defined in: [purease.ts:1111](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1111)

Vue 配置

## Properties

### globalProperties

> **globalProperties**: `Record`\<`string`, `any`\>

Defined in: [purease.ts:1113](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1113)

***

### optionMergeStrategies

> **optionMergeStrategies**: `Record`\<`string`, [`IVueOptionMergeFunction`](../type-aliases/IVueOptionMergeFunction.md)\>

Defined in: [purease.ts:1115](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1115)

***

### performance

> **performance**: `boolean`

Defined in: [purease.ts:1116](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1116)

## Methods

### errorHandler()?

> `optional` **errorHandler**(`err`, `instance`, `info`): `void`

Defined in: [purease.ts:1112](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1112)

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

Defined in: [purease.ts:1114](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1114)

#### Parameters

##### tag

`string`

#### Returns

`boolean`

***

### warnHandler()?

> `optional` **warnHandler**(`msg`, `instance`, `trace`): `void`

Defined in: [purease.ts:1117](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1117)

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

Defined in: [purease.ts:1095](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1095)

## Methods

### createApp()

> **createApp**(`opt`): [`IVApp`](IVApp.md)

Defined in: [purease.ts:1096](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1096)

#### Parameters

##### opt

`any`

#### Returns

[`IVApp`](IVApp.md)

***

### h()

> **h**(`tag`, `props?`, `list?`): `any`

Defined in: [purease.ts:1104](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1104)

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

Defined in: [purease.ts:1098](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1098)

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

Defined in: [purease.ts:1097](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1097)

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

Defined in: [purease.ts:1099](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1099)

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

Defined in: [purease.ts:1108](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L1108)

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

Defined in: [purease.ts:508](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L508)

用户定义的全局对象

purease/variables/pointer.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / pointer

# Variable: pointer

> **pointer**: `__module`

Defined in: [purease.ts:490](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L490)

pointer 对象

purease/variables/vue.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / vue

# Variable: vue

> **vue**: [`IVueObject`](../interfaces/IVueObject.md)

Defined in: [purease.ts:487](https://github.com/maiyun/purease/blob/master/dist/purease.ts#L487)

vue 对象

tool/functions/blob2DataUrl.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / blob2DataUrl

# Function: blob2DataUrl()

> **blob2DataUrl**(`blob`): `Promise`\<`string`\>

Defined in: [tool.ts:664](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L664)

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

Defined in: [tool.ts:645](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L645)

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

Defined in: [tool.ts:29](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L29)

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

Defined in: [tool.ts:249](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L249)

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

Defined in: [tool.ts:363](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L363)

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

Defined in: [tool.ts:680](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L680)

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

Defined in: [tool.ts:693](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L693)

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

Defined in: [tool.ts:389](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L389)

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

Defined in: [tool.ts:218](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L218)

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

Defined in: [tool.ts:192](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L192)

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

> **getClassPrototype**(`obj`, `over`, `level`): [`IClassPrototype`](../interfaces/IClassPrototype.md)

Defined in: [tool.ts:88](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L88)

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

[`IClassPrototype`](../interfaces/IClassPrototype.md)

tool/functions/getDecimal.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / getDecimal

# Function: getDecimal()

> **getDecimal**(`number`): `number`

Defined in: [tool.ts:240](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L240)

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

Defined in: [tool.ts:207](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L207)

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

Defined in: [tool.ts:441](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L441)

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

Defined in: [tool.ts:789](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L789)

判断是否是域名

## Parameters

### domain

`string`

域名

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

Defined in: [tool.ts:764](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L764)

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

Defined in: [tool.ts:772](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L772)

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

Defined in: [tool.ts:780](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L780)

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

Defined in: [tool.ts:799](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L799)

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

Defined in: [tool.ts:888](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L888)

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

Defined in: [tool.ts:914](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L914)

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

Defined in: [tool.ts:836](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L836)

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

Defined in: [tool.ts:855](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L855)

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

Defined in: [tool.ts:486](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L486)

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

Defined in: [tool.ts:416](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L416)

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

Defined in: [tool.ts:464](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L464)

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

Defined in: [tool.ts:807](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L807)

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

Defined in: [tool.ts:733](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L733)

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

Defined in: [tool.ts:720](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L720)

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

Defined in: [tool.ts:152](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L152)

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

Defined in: [tool.ts:169](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L169)

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

Defined in: [tool.ts:276](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L276)

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

Defined in: [tool.ts:139](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L139)

等待毫秒

## Parameters

### ms

`number` = `0`

等待的毫秒，默认 0

## Returns

`Promise`\<`boolean`\>

tool/functions/unescapeHTML.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / unescapeHTML

# Function: unescapeHTML()

> **unescapeHTML**(`html`): `string`

Defined in: [tool.ts:261](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L261)

还原转义后的 HTML

## Parameters

### html

`string`

已转义的 HTML 字符

## Returns

`string`

tool/functions/urlAtom.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / urlAtom

# Function: urlAtom()

> **urlAtom**(`url`): `string`

Defined in: [tool.ts:628](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L628)

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

Defined in: [tool.ts:569](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L569)

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

- [IClassPrototype](interfaces/IClassPrototype.md)
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
- [unescapeHTML](functions/unescapeHTML.md)
- [urlAtom](functions/urlAtom.md)
- [urlResolve](functions/urlResolve.md)

tool/interfaces/IClassPrototype.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / IClassPrototype

# Interface: IClassPrototype

Defined in: [tool.ts:17](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L17)

Copyright 2007 - 2025 MAIYUN.NET

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Properties

### access

> **access**: `Record`\<`string`, \{ `get?`: `any`; `set?`: `any`; \}\>

Defined in: [tool.ts:19](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L19)

***

### method

> **method**: `Record`\<`string`, `any`\>

Defined in: [tool.ts:18](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L18)

tool/interfaces/IRequestOptions.md
---

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

tool/interfaces/IUrl.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / IUrl

# Interface: IUrl

Defined in: [tool.ts:945](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L945)

网址对象

## Properties

### auth

> **auth**: `string` \| `null`

Defined in: [tool.ts:946](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L946)

***

### hash

> **hash**: `string` \| `null`

Defined in: [tool.ts:947](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L947)

***

### host

> **host**: `string` \| `null`

Defined in: [tool.ts:948](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L948)

***

### hostname

> **hostname**: `string` \| `null`

Defined in: [tool.ts:949](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L949)

***

### pass

> **pass**: `string` \| `null`

Defined in: [tool.ts:950](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L950)

***

### path

> **path**: `string` \| `null`

Defined in: [tool.ts:951](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L951)

***

### pathname

> **pathname**: `string`

Defined in: [tool.ts:952](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L952)

***

### port

> **port**: `string` \| `null`

Defined in: [tool.ts:954](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L954)

***

### protocol

> **protocol**: `string` \| `null`

Defined in: [tool.ts:953](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L953)

***

### query

> **query**: `string` \| `null`

Defined in: [tool.ts:955](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L955)

***

### user

> **user**: `string` \| `null`

Defined in: [tool.ts:956](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L956)

tool/variables/RANDOM_L.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_L

# Variable: RANDOM\_L

> `const` **RANDOM\_L**: `"abcdefghijklmnopqrstuvwxyz"` = `'abcdefghijklmnopqrstuvwxyz'`

Defined in: [tool.ts:161](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L161)

tool/variables/RANDOM_LN.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LN

# Variable: RANDOM\_LN

> `const` **RANDOM\_LN**: `string`

Defined in: [tool.ts:164](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L164)

tool/variables/RANDOM_LU.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LU

# Variable: RANDOM\_LU

> `const` **RANDOM\_LU**: `string`

Defined in: [tool.ts:165](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L165)

tool/variables/RANDOM_LUN.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LUN

# Variable: RANDOM\_LUN

> `const` **RANDOM\_LUN**: `string`

Defined in: [tool.ts:166](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L166)

tool/variables/RANDOM_LUNS.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_LUNS

# Variable: RANDOM\_LUNS

> `const` **RANDOM\_LUNS**: `string`

Defined in: [tool.ts:168](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L168)

tool/variables/RANDOM_N.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_N

# Variable: RANDOM\_N

> `const` **RANDOM\_N**: `"0123456789"` = `'0123456789'`

Defined in: [tool.ts:159](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L159)

tool/variables/RANDOM_U.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_U

# Variable: RANDOM\_U

> `const` **RANDOM\_U**: `"ABCDEFGHIJKLMNOPQRSTUVWXYZ"` = `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`

Defined in: [tool.ts:160](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L160)

tool/variables/RANDOM_UN.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_UN

# Variable: RANDOM\_UN

> `const` **RANDOM\_UN**: `string`

Defined in: [tool.ts:163](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L163)

tool/variables/RANDOM_V.md
---

[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / RANDOM\_V

# Variable: RANDOM\_V

> `const` **RANDOM\_V**: `"ACEFGHJKLMNPRSTWXY34567"` = `'ACEFGHJKLMNPRSTWXY34567'`

Defined in: [tool.ts:167](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L167)
