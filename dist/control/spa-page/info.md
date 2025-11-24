````markdown
SPA 单个页面控件

### 参数

#### path

`string`

页面路径，对应 hash 路由

#### grey

`boolean`

是否使用灰色背景，默认 false

### 类属性

#### currentPath

`string`

当前激活的路径

### 方法

### 样式

单个页面容器，绝对定位填充整个父容器（0,0,100%,100%），白色背景（oklch 色彩空间），纵向弹性布局，带过渡动画。

grey 模式下背景变为灰色。显示状态（display）通过类控制：pe-display 时 display flex，否则 none。显示动画（show）通过透明度和水平位移实现（向右 10px 淡入）。

### 事件

#### show

页面显示事件，返回 `ISpaShowEvent` 对象

#### hide

页面隐藏事件，返回 `ISpaHideEvent` 对象

### 示例

```html
<pe-spa>
    <pe-spa-page path="/" @show="onHomeShow" @hide="onHomeHide">
        <pe-spa-header>首页</pe-spa-header>
        <div>首页内容</div>
    </pe-spa-page>
    <pe-spa-page path="/settings" :grey="true">
        <pe-spa-header :back="true">设置</pe-spa-header>
        <div>设置内容</div>
    </pe-spa-page>
</pe-spa>
```

```typescript
function onHomeShow(e: lControl.ISpaShowEvent) {
    console.log('首页显示', e.detail.prev, e.detail.path);
}

function onHomeHide(e: lControl.ISpaHideEvent) {
    console.log('首页隐藏', e.detail.path, e.detail.next);
}
```
````