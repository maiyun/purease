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

按钮控件

### 类属性

#### pe-plain

朴素

#### pe-pwhite

朴素白

#### pe-pgrey

朴素灰

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

自动布局。响应式布局容器，根据屏幕宽度自动调整排列方向。

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

## lralyout

左图右文布局。左侧图片固定宽度，右侧文本占剩余空间。

### 子类属性

#### pe-img

限定子 img 控件的宽度为 300px，高度为 150px

### 样式

水平图文混排布局。左侧图片固定宽度 300px、高度 150px，右侧内容区灵活占据剩余空间。采用 Flex 模型实现。小屏下自动调整为纵向排列，图片宽度变为自适应。

### 示例

```html
<a class="pe-box" href="./" style="flex: 1;">
    <div class="pe-lralyout">
        <div class="pe-img boximg2"></div>
        <div class="pe-padding-s">
            <div class="pe-title">Article1</div>
            <div class="pe-note">Article note</div>
        </div>
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

条纹背景。对角线条纹背景图案。

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

树形导航。层级结构的列表展示，支持展开/收起。通常在 lnav 的 left 插槽内使用。

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