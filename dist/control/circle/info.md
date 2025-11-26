圆形容器控件，可用于指示点、图标等

### 参数

#### type

`'default'` | `'primary'` | `'info'` | `'warning'` | `'danger'` | `'pe'`

类型，默认 default

#### plain

`boolean`

是否朴素模式，默认 false

#### size

`'l'` | `'m'` | `'s'` | `'xs'` | `'xxs'`

尺寸，默认 xxs

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Avatar，呈现为圆形容器。提供 5 种尺寸（l/m/s/xs/xxs）和 6 种类型（default/primary/info/warning/danger/pe）。

带有微妙的径向渐变光效（左上角高亮）和阴影。plain 模式下显示为浅色背景+彩色边框，非 plain 模式为彩色背景+白色内容。

适用于指示点（如展示服务的可用状态）、图标、徽章等圆形元素的展示场景。

### 示例

```html
<pe-circle type="primary"></pe-circle>
<pe-circle type="warning" size="m">수</pe-circle>
```
