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