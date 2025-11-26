数据列表控件，用于在有限的空间内展示大量选项

### 参数

#### modelValue

`string`

当前选中的值

#### data

`Array<Record<string, any>> | string[]`

数据列表，默认空数组，非 `string[]` 且非字段映射前的单项结构为：

```ts
{
    'label': string;
    'value': string;
    'children': Array<Record<string, any>> | string[];
    'title': string;
}
```

#### plain

`boolean`

是否朴素模式，默认 false

#### map

`Record<string, string>`

字段映射，包含 label, value, children, title

#### tree

`boolean`

是否树形模式，默认 false。为 true 时支持展开折叠子节点，为 false 时平铺展示所有节点

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 List 组件，采用垂直滚动列表布局。列表项带内边距和圆角，选中项和悬停项显示灰色背景，过渡动画流畅。

支持 plain 模式（无边框）和空状态提示（居中显示灰色文本）。禁用项不可交互。文本左对齐显示，默认带边框和圆角。

### 事件

#### changed(event)

值改变事件

##### event

`IDlistChangedEvent`

#### click(event)

点击事件

##### event

`IDlistClickEvent`

### 示例

基础用法：

```html
<pe-dlist :data="['a', 'b', 'c']" v-model="value"></pe-dlist>
```

平铺树形结构（默认展开所有节点）：

```html
<pe-dlist :data="treeData" v-model="value"></pe-dlist>
```

可展开折叠的树形结构：

```html
<pe-dlist :data="treeData" v-model="value" tree></pe-dlist>
```

```typescript
class Page extends purease.AbstractPage {

    public treeData = [
        { 'label': 'Item 1', 'value': 'item1' },
        {
            'label': 'Item 2',
            'value': 'item2',
            'children': [
                { 'label': 'Sub Item 2-1', 'value': 'item2-1' },
                {
                    'label': 'Sub Item 2-2',
                    'value': 'item2-2',
                    'children': [
                        { 'label': 'Deep Item 2-2-1', 'value': 'item2-2-1' }
                    ]
                }
            ]
        }
    ];

}
```
