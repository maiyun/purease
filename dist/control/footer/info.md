生成网页底部区域

### 参数

#### dark

`boolean`

暗色主题，默认 false

### 类属性

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
        <div class="pe-footer-logo dark"></div>
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