[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [dom](../index.md) / hasTouchButMouse

# Function: hasTouchButMouse()

> **hasTouchButMouse**(`e`): `boolean`

Defined in: dom.ts:84

判断当前的事件是否是含有 touch 的设备触发的，如果当前就是 touch 则直接返回 false（false 代表 OK，true 代表 touch 设备却触发了 mouse 事件）

## Parameters

### e

`TouchEvent` | `PointerEvent` | `MouseEvent`

## Returns

`boolean`
