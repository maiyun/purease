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