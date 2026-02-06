SPA 单个页面控件

### 参数

#### path

`string`

页面路径，对应 hash 路由

#### grey

`boolean`

是否使用灰色背景，默认 false

### 类属性

### 方法

### 样式

单个页面容器，绝对定位填充整个父容器（0,0,100%,100%），白色背景（oklch 色彩空间），纵向弹性布局，带过渡动画。

grey 模式下背景变为灰色。显示状态（display）通过类控制：pe-display 时 display flex，否则 none。显示动画（show）通过透明度和水平位移实现（向右 10px 淡入）。

### 事件

#### show(event)

页面显示事件

##### event

`ISpaShowEvent`

#### hide(event)

页面隐藏事件

##### event

`ISpaHideEvent`

### 插槽

#### default

页面内容插槽

##### query

`Record<string, string>`

当前页面的路由参数

#### header

页面头部插槽

##### query

`Record<string, string>`

当前页面的路由参数

### 示例

```html
<pe-spa plain full>
    <pe-spa-page path="/" @show="spaShow" @hide="spaHide">
        <template v-slot:header>
            <pe-spa-header back>The Page</pe-spa-header>
        </template>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```

```typescript
class Page extends purease.AbstractPage {

    public spaShow(e: purease.control.ISpaShowEvent): void {
        purease.display('spaShow', e);
    }

    public spaHide(e: purease.control.ISpaHideEvent): void {
        purease.display('spaHide', e);
    }

}
```