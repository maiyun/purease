````markdown
生成网页底部区域

### 参数

#### dark

`boolean`

暗色主题，默认 false

### 类属性

### 方法

### 样式

类似现代网站的 Footer 布局，采用居中约束的弹性布局（最大宽度 1600px）。主体背景默认为灰色，dark 模式下为深色背景配白色文字。

内容区采用多列等宽布局，包含 logo 区域（背景图模式）、链接列表等。底部区域（bottom slot）居中显示版权等信息，字号较小且色调偏灰。链接在 dark 模式下为灰白色，悬停时变为纯白。

在 800px 以下屏幕切换为单列垂直布局，logo 区域居中显示并缩小。响应式间距调整保持视觉平衡。

### 示例

```html
<pe-footer :dark="true">
    <div>Copyright © 2024 Company Name</div>
</pe-footer>
```
````