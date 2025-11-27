轮播图子项控件

### 参数

#### direction

`'h'` | `'v'`

布局方向，h 为横向，v 为纵向，默认 h

### 类属性

### 方法

### 样式

轮播子项，绝对定位（top 0），100% 高度，横向弹性布局（支持纵向模式 direction-v）。通过动态计算的 left 和 width 样式定位和尺寸。

### 示例

```html
<pe-swipe v-model="tab" :page="swipePage" :control="swipeControl" radius="10" style="height: 500px;">
    <pe-swipe-item direction="v" style="background: hsl(160, 50%, 30%); color: #FFF; font-size: 48px;">
        <div class="pe-layout" style="align-items: center; justify-content: center; flex: 1;">Info1</div>
    </pe-swipe-item>
    <pe-swipe-item direction="v" style="background: hsl(200, 50%, 30%); color: #FFF; font-size: 48px;">
        <div class="pe-layout" style="align-items: center; justify-content: center; flex: 1;">Info2</div>
    </pe-swipe-item>
    <pe-swipe-item direction="v" style="background: hsl(240, 50%, 30%); color: #FFF; font-size: 48px;">
        <div class="pe-layout" style="align-items: center; justify-content: center; flex: 1;">Info3</div>
    </pe-swipe-item>
</pe-swipe>
```