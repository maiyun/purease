图标控件，用于显示各种图标

### 参数

#### name

`string`

图标名称，默认 link

- `link`: 右上角指向的箭头，表示外链打开
- `language`: 地球与文字符号结合，表示语言切换
- `backspace`: 左箭头加叉号，表示删除清除
- `switch`: 双向箭头指向左右，表示切换
- `eye`: 开放的眼睛轮廓，表示显示
- `eye-slash`: 眼睛加对角线，表示隐藏
- `back`: 左指向箭头，表示返回

### 类属性

### 方法

### 插槽

### 样式

类似 Font Awesome 的图标组件，采用内联弹性布局居中对齐。默认尺寸 18×18px，左右间距 5px。内部 SVG 或图片元素同样带右间距。

图标以 SVG 路径形式内嵌（如 link、language 等），支持主题色继承和悬停状态。

### 示例

```html
<pe-icon name="language"></pe-icon>
<pe-icon name="eye"></pe-icon>
<pe-icon name="home"></pe-icon>
```