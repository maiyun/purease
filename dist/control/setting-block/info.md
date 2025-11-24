````markdown
设置块控件，用于分组设置项

### 参数

#### hover

`boolean`

是否启用悬停效果，默认 false

### 类属性

### 方法

### 样式

设置项分组块，采用横向弹性布局居中对齐。带内边距，支持悬停时灰色背景高亮（通过 hover 类控制），过渡动画流畅。子项间带小间距（gap）。

#### enter

`(e: MouseEvent | TouchEvent) => void`

鼠标进入事件处理

#### leave

`(e: MouseEvent | TouchEvent) => void`

鼠标离开事件处理

### 示例

```html
<pe-setting>
    <pe-setting-block :hover="true">
        <pe-setting-item title="通知">
            <pe-switch v-model="notification"></pe-switch>
        </pe-setting-item>
        <pe-setting-item title="声音">
            <pe-switch v-model="sound"></pe-switch>
        </pe-setting-item>
    </pe-setting-block>
</pe-setting>
```
````