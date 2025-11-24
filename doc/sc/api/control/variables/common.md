[**Documents for purease**](../../index.md)

***

[Documents for purease](../../index.md) / [control](../index.md) / common

# Variable: common

> `const` **common**: `object`

Defined in: control.ts:6

通用的一些方法和 computed

## Type Declaration

### computed

> **computed**: `object`

#### computed.alignHComp()

> **alignHComp**: (`this`) => `string` \| `undefined`

获取 alignH 的 css 属性模式，请确保 $props.alignH 存在

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

`string` \| `undefined`

#### computed.alignVComp()

> **alignVComp**: (`this`) => `string` \| `undefined`

获取 alignH 的 css 属性模式，请确保 props.alignH 存在

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

`string` \| `undefined`

#### computed.isRtl()

> **isRtl**: (`this`) => `boolean`

是否是 rtl 模式

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

`boolean`

#### computed.l()

> **l**: (`this`) => (`key`, `data?`) => `string`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`key`, `data?`): `string`

###### Parameters

###### key

`string`

###### data?

`string`[]

###### Returns

`string`

#### computed.parentByName()

> **parentByName**: (`this`) => (`controlName`) => `Record`\<`string`, `any`\> \| `null`

根据 control name 查询上层控件

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`controlName`): `Record`\<`string`, `any`\> \| `null`

###### Parameters

###### controlName

`string`

###### Returns

`Record`\<`string`, `any`\> \| `null`

#### computed.propArray()

> **propArray**: (`this`) => (`name`) => `any`[]

获取 props 中的 array 类型的值

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `any`[]

###### Parameters

###### name

`string`

###### Returns

`any`[]

#### computed.propBoolean()

> **propBoolean**: (`this`) => (`name`) => `boolean`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `boolean`

###### Parameters

###### name

`string`

###### Returns

`boolean`

#### computed.propInt()

> **propInt**: (`this`) => (`name`) => `number`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `number`

###### Parameters

###### name

`string`

###### Returns

`number`

#### computed.propNumber()

> **propNumber**: (`this`) => (`name`) => `number`

##### Parameters

###### this

[`IVue`](../../purease/interfaces/IVue.md)

##### Returns

> (`name`): `number`

###### Parameters

###### name

`string`

###### Returns

`number`
