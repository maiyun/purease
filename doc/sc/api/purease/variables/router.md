[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [purease](../index.md) / router

# Variable: router

> `const` **router**: `object`

Defined in: [router.ts:20](https://github.com/maiyun/purease/blob/master/dist/router.ts#L20)

路由对象

## Type Declaration

### back()

> **back**: () => `void`

返回上一页

#### Returns

`void`

### current

> **current**: `object`

当前路由信息

#### current.component

> **component**: `any`

组件

#### current.meta

> **meta**: `Record`\<`string`, `any`\>

元数据

#### current.path

> **path**: `string` = `''`

路径

#### current.query

> **query**: `Record`\<`string`, `string`\>

参数

### history

> **history**: `string`[]

历史记录

### load()

> **load**: (`ppath`) => `Promise`\<`void`\>

加载路由（可能被加载过，内部使用）

#### Parameters

##### ppath

`string`

#### Returns

`Promise`\<`void`\>

### prefix

> **prefix**: `string` = `'/'`

加载路由的前缀，以 / 开头 / 结尾
例如设置为 /page/，则访问 home 时会自动加载 /page/home/home.js 和 /page/home/home.html、css

### push()

> **push**: (`path`) => `Promise`\<`void`\>

导航到指定路径，如 home，不以 / 开头

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`void`\>

### register()

> **register**: (`routes`) => `void`

注册路由

#### Parameters

##### routes

[`IRoute`](../interfaces/IRoute.md)[]

#### Returns

`void`

### replace()

> **replace**: (`path`) => `Promise`\<`void`\>

替换当前路径，如 home，不以 / 开头

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`void`\>

### routes

> **routes**: `Record`\<`string`, [`IRoute`](../interfaces/IRoute.md)\>

路由表

### start()

> **start**: () => `void`

启动路由监听

#### Returns

`void`

### urlPrefix

> **urlPrefix**: `string`

URL 前缀，以 / 开头 / 结尾
例如设置为 /app/，则访问 /app/home 时会自动加载 {prefix}home/home.js 和 {prefix}home/home.html、css
