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
