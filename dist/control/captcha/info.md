验证码控件，支持腾讯云和 Cloudflare 验证码

### 参数

#### factory

`'tc'` | `'cf'`

验证码服务商，默认 tc

- `tc`: 腾讯云验证码
- `cf`: Cloudflare 验证码

#### akey

`string`

验证码 key

### 类属性

### 方法

#### reset()

重置验证码使用状态

##### 返回值

`void`

### 插槽

### 事件

#### result(event)

验证结果事件

##### event

`ICaptchaResultEvent`

### 样式

类似谷歌 reCAPTCHA，呈现为带圆角和阴影的按钮样式。未初始化时显示虚线边框，腐讯云验证码（tc）显示实线边框和输入框背景。

支持三种状态：默认状态、验证失败（红色）、验证成功（绿色）。悬停时边框和文字变为主题色，点击时显示外轮阴影。

自动集成腐讯云和 Cloudflare 两种验证码服务，无需手动接入 SDK。

### 示例

```html
<pe-captcha factory="tc" :akey="captchaKey" @result="onCaptchaResult"></pe-captcha>
```

```typescript
class Page extends purease.AbstractPage {

    public onCaptchaResult(e: lControl.ICaptchaResultEvent) {
        if (e.detail.result === 1) {
            console.log('验证成功', e.detail.token);
        }
        else {
            console.log('验证失败');
        }
    }

}
```
