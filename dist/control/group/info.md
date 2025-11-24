````markdown
分组容器控件，用于组织和包裹相关内容

### 参数

### 类属性

### 方法

### 样式

类似 Bootstrap 的 Card 卡片组件，采用垂直弹性布局容器。带 1px 边框、圆角和柔和的双层阴影效果，背景为白色。

可选标题栏（title slot）显示为主题色背景、白色文字、居中加粗；主内容区带内边距且可弹性扩展；底部区域（bottom slot）采用横向弹性布局。

支持 point 模式（2px 主题色边框强调）和 padtitle 模式（标题外边距）。响应式友好，800px 以下自动调整间距。

### 示例

```html
<pe-group>
    <pe-check>选项1</pe-check>
    <pe-check>选项2</pe-check>
    <pe-check>选项3</pe-check>
</pe-group>
```
````