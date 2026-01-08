[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / get

# Function: get()

> **get**(`url`, `init?`, `opt?`): `Promise`\<`string` \| `Blob` \| `null`\>

Defined in: [tool.ts:371](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L371)

发起 GET 请求

## Parameters

### url

`string`

网址

### init?

`RequestInit`

选项

### opt?

选项

#### retry?

`number`

重试次数，默认 3 次

## Returns

`Promise`\<`string` \| `Blob` \| `null`\>

文本或二进制数据，失败时返回 null
