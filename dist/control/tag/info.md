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