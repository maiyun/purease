大卡片容器控件，用于组织和包裹相关内容

### 参数

### 类属性

#### pe-padtitle

让上方增加一块和 header 等高的 margin，通常用于没有使用 title 插槽的与有 title 的 group 对齐。使用 pe-padtitle 类的 group 禁止使用 title 插槽

#### pe-point

焦点模式，边框变的明显

### 方法

### 插槽

#### title

标题区域

#### bottom

底部区域

### 样式

类似 Bootstrap 的 Card 卡片组件，采用垂直弹性布局容器。带 1px 边框、圆角和柔和的双层阴影效果，背景为白色。

可选标题栏（title slot）显示为主题色背景、白色文字、居中加粗；主内容区带内边距且可弹性扩展；底部区域（bottom slot）采用横向弹性布局。

支持 point 模式（2px 主题色边框强调）和 padtitle 模式（标题外边距）。响应式友好，800px 以下自动调整间距。

### 示例

```html
<pe-group style="flex: 1;">
    <template v-slot:title>Best</template>
    111<br>
    222<br>
    333
    <template v-slot:bottom>
        <div class="pe-button pe-pgrey" style="flex: 1;">Buy</div>
    </template>
</pe-group>
```