[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [tool](../index.md) / formatTime

# Function: formatTime()

> **formatTime**(`ts`, `tz?`): `object`

Defined in: [tool.ts:693](https://github.com/maiyun/purease/blob/master/dist/tool.ts#L693)

将日期对象或毫秒级时间戳转换为字符串

## Parameters

### ts

时间戳或日期对象

`number` | `Date`

### tz?

`number`

传入要显示的时区，小时，如 8，默认以当前客户端时区为准

## Returns

`object`

### date

> **date**: `string`

### time

> **time**: `string`

### zone

> **zone**: `string`
