折叠面板子项控件，用于 pe-collapse 控件内部，表示单个可折叠的面板。

### 参数

#### name

`string`

面板唯一标识，用于控制展开状态，必填

#### title

`string`

面板标题文本，默认空

#### disabled

`boolean`

是否禁用该面板，禁用后无法点击展开/收起，默认 false

### 类属性

### 方法

### 插槽

#### title

标题区域自定义插槽，可替换默认标题文本

### 样式

折叠面板项包含标题区和内容区两部分。标题区水平布局，左侧为标题文本（可通过插槽自定义），右侧为箭头图标。

内容区高度通过 CSS transition 实现平滑过渡效果。展开时高度自适应内容，收起时高度为 0。箭头图标在展开时旋转 90 度。

禁用状态下标题颜色变浅，鼠标样式变为禁止，hover 效果取消。支持 RTL 布局镜像。

### 示例

```html
<pe-collapse-item title="Basic Panel" name="basic">
    This is the content of basic panel.
</pe-collapse-item>

<pe-collapse-item name="custom">
    <template v-slot:title>
        <pe-icon name="fa-solid fa-star"></pe-icon>
        Custom Title
    </template>
    This panel has a custom title with icon.
</pe-collapse-item>
```
