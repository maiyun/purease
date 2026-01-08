[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / request

# Function: request()

> **request**(`url`, `opt`): `Promise`\<`any`\>

Defined in: [tool.ts:258](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L258)

发起一个网络请求，若是返回值是 JSON 则自动解析，否则直接返回字符串

## Parameters

### url

`string`

网址

### opt

[`IRequestOptions`](../interfaces/IRequestOptions.md)

选项

## Returns

`Promise`\<`any`\>
