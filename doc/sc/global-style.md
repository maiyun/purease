# 全局样式

## 变量

### 基础颜色

- `--main` - 基础颜色
- `--pe` - 主题色，默认值为 `var(--main)`
- `--pe-color` - 基础文字颜色
- `--pe-disabled-color` - 禁用状态文字颜色
- `--pe-note-color` - 备注/说明文字颜色
- `--pe-inote-color` - 强调备注文字颜色
- `--pe-fcolor` - 前景色（浅色/白色）

### 主题色衍生

- `--pe-hover` - 主题色 hover 状态（增加白色 10%）
- `--pe-active` - 主题色 active 状态（增加黑色 10%）
- `--pe-focus` - 主题色 focus 状态（增加黑色 5%）
- `--pe-bg` - 主题色浅色背景（增加白色 85%）

### 背景颜色

- `--pe-grey` - 通常用于浅色背景或 hover 效果
- `--pe-grey-hover` - 灰色 hover 效果
- `--pe-dark` - 超深背景色
- `--pe-input-bg` - 输入型控件的默认底色
- `--pe-input-hover-bg` - 输入型控件的 hover 底色

### 边框与阴影

- `--pe-border` - 常规边框颜色
- `--pe-border-plain` - 浅边框颜色（用于组件内部的轻边框）
- `--pe-shadow` - 小阴影
- `--pe-shadow-d` - 小阴影 dark 版
- `--pe-pop-shadow` - 弹出层阴影
- `--pe-outline-shadow` - active 状态的类似 outline 边框阴影

### 动画与过渡

- `--pe-cubic` - 三次贝塞尔缓动函数
- `--pe-transition` - 全局过渡动画（应用于 all，时长 0.3s）

### 圆角

- `--pe-radius` - 标准圆角（5px）
- `--pe-radius-l` - 较大圆角（10px）
- `--pe-radius-xl` - 超大圆角（30px，小屏 20px）

### 字体

- `--pe-font-life` - 生活/衬线字体族
- `--pe-font-comm` - 常用/无衬线字体族

### 内边距

- `--pe-padding-l` - 大内边距（60px，小屏 40px）
- `--pe-padding` - 标准内边距（40px，小屏 30px）
- `--pe-padding-s` - 小内边距（20px，小屏 14px）
- `--pe-padding-xs` - 超小内边距（15px，小屏 12px）
- `--pe-padding-xxs` - 极小内边距（8px，小屏 4px）

### 间距

- `--pe-gap-m` - 中间距（40px）
- `--pe-gap-s` - 小间距（20px）
- `--pe-gap-xs` - 超小间距（10px）
- `--pe-gap-xxs` - 极小间距（5px）

### 字号

- `--pe-size-xxxl` - 超大字号（42px，小屏 32px）
- `--pe-size-xxl` - 较大字号（32px，小屏 22px）
- `--pe-size-xl` - 大字号（26px，小屏 20px）
- `--pe-size-l` - 中大字号（22px，小屏 18px）
- `--pe-size` - 标准字号（16px，小屏 14px）
- `--pe-size-s` - 小字号（14px，小屏 13px）
- `--pe-size-xs` - 超小字号（12px）

### 状态颜色 - 成功

- `--success` - 成功颜色
- `--success-hover` - 成功 hover 状态
- `--success-active` - 成功 active 状态
- `--success-bg` - 成功浅色背景

### 状态颜色 - 信息

- `--info` - 信息颜色
- `--info-hover` - 信息 hover 状态
- `--info-active` - 信息 active 状态
- `--info-bg` - 信息浅色背景

### 状态颜色 - 警告

- `--warning` - 警告颜色
- `--warning-hover` - 警告 hover 状态
- `--warning-active` - 警告 active 状态
- `--warning-bg` - 警告浅色背景

### 状态颜色 - 危险

- `--danger` - 危险颜色
- `--danger-hover` - 危险 hover 状态
- `--danger-active` - 危险 active 状态
- `--danger-bg` - 危险浅色背景

### Header 相关

- `--pe-headerheight` - Header 高度（70px，小 header 50px，双行 120px）
- `--pe-windowwidth` - 窗口宽度
- `--pe-windowheight` - 窗口高度

## 样式

### 通用样式

- `.pe-disabled` - 禁用状态，添加 pointer-events: none、灰色文字、禁止用户选择

### html 标签样式

- `.pe-full` - 全屏模式，html 和 body 最小高度为 100%
- `.pe-speed-fast` - 快速动画模式，过渡时间 0.15s
- `.pe-speed-imme` - 即时模式，禁用所有过渡动画

### 文字样式

- `.pe-btitle` - 超大标题，字号 var(--pe-size-xxxl)
- `.pe-title` - 大标题，字号 var(--pe-size-xxl)
- `.pe-bnote` - 大备注，字号 var(--pe-size-xl)
- `.pe-note` - 备注，字号 var(--pe-size-l)，颜色为备注色
- `.pe-gnote` - 灰色备注，字号 var(--pe-size-l)

### 内边距

- `.pe-padding-lr` - 左右内边距，padding-left/right: var(--pe-padding)
- `.pe-lpadding-lr` - 左右大内边距，padding-left/right: var(--pe-padding-l)
- `.pe-padding` - 全方向内边距，padding: var(--pe-padding)
- `.pe-padding-s` - 小内边距，padding: var(--pe-padding-s)
- `.pe-padding-xs` - 超小内边距，padding: var(--pe-padding-xs)
- `.pe-padding-xxs` - 极小内边距，padding: var(--pe-padding-xxs)

### 间距

- `.pe-gap` - 中间距，gap: var(--pe-gap-m)
- `.pe-gap-s` - 小间距，gap: var(--pe-gap-s)
- `.pe-gap-xs` - 超小间距，gap: var(--pe-gap-xs)

### 字号

- `.pe-size-xxxl` - 超大字号，font-size: var(--pe-size-xxxl)
- `.pe-size-xxl` - 较大字号，font-size: var(--pe-size-xxl)
- `.pe-size-xl` - 大字号，font-size: var(--pe-size-xl)
- `.pe-size-l` - 中大字号，font-size: var(--pe-size-l)
- `.pe-size` - 标准字号，font-size: var(--pe-size)
- `.pe-size-s` - 小字号，font-size: var(--pe-size-s)
- `.pe-size-xs` - 超小字号，font-size: var(--pe-size-xs)

### 字体样式

- `.pe-bold` - 加粗文字，font-weight: 700