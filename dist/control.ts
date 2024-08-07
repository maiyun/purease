import * as purease from './index';
import * as tool from './tool';
import * as types from '../types';
import * as dom from './dom';

/** --- 通用的一些方法和 computed --- */
const common = {
    'computed': {
        propBoolean: function(this: types.IVue) {
            return (name: string): boolean => {
                return tool.getBoolean(this.$props[name]);
            };
        },
        propNumber: function(this: types.IVue) {
            return (name: string): number => {
                return tool.getNumber(this.$props[name]);
            };
        },
        propInt: function(this: types.IVue) {
            return (name: string): number => {
                return Math.round(this.propNumber(name));
            };
        },
        /** --- 获取 props 中的 array 类型的值 --- */
        propArray: function(this: types.IVue) {
            return (name: string): any[] => {
                return tool.getArray(this.$props[name]);
            };
        },
        /** --- 根据 control name 查询上层控件 --- */
        parentByName: function(this: types.IVue) {
            return (controlName: string): (Record<string, any>) | null => {
                let parent = this.$parent;
                while (true) {
                    if (!parent) {
                        return null;
                    }
                    if (parent.controlName === controlName) {
                        return parent;
                    }
                    parent = parent.$parent;
                }
            };
        },
        l: function(
            this: types.IVue
        ) {
            return (key: string, data?: string[]): string => {
                const loc = (this as any).localeData?.[this.$root.locale][key] ?? '[LocaleError]' + key;
                if (!data) {
                    return loc;
                }
                let i: number = -1;
                return (this as any).localeData[this.$root.locale][key].replace(/\?/g, function() {
                    ++i;
                    if (!data[i]) {
                        return '';
                    }
                    return data[i];
                });
            };
        },
        /** --- 获取 alignH 的 css 属性模式，请确保 p$rops.alignH 存在 --- */
        alignHComp: function(this: types.IVue): string | undefined {
            if (!this.$props.alignH) {
                return undefined;
            }
            switch (this.$props.alignH) {
                case 'center': {
                    return 'center';
                }
                case 'left':
                case 'start': {
                    return 'flex-start';
                }
            }
            return 'flex-end';
        },
        /** --- 获取 alignH 的 css 属性模式，请确保 props.alignH 存在 --- */
        alignVComp: function(this: types.IVue): string | undefined {
            if (!this.$props.alignV) {
                return undefined;
            }
            switch (this.$props.alignV) {
                case 'center': {
                    return 'center';
                }
                case 'top':
                case 'start': {
                    return 'flex-start';
                }
            }
            return 'flex-end';
        }
    }
};

export const list: Record<string, any> = {
    'pe-header': {
        'template': `<div class="pe-header" :class="[propBoolean('fixed')&&'pe-fixed','pe-theme-'+theme,headerPop&&'pe-show']">` +
            '<a class="pe-logo" :href="logoHref"></a>' +
            `<div class="pe-nav">` +
                '<div class="pe-nav-left">' +
                    '<div class="pe-nav-top">' +
                        '<slot></slot>' +
                    '</div>' +
                    `<div v-if="$slots['bottom']" class="pe-nav-bottom">` +
                        '<slot name="bottom"></slot>' +
                    '</div>' +
                '</div>' +
                '<div class="pe-nav-right">' +
                    '<slot name="right"></slot>' +
                '</div>' +
            '</div>' +
            '<svg v-if="headerPop" @click="headerPop=false" class="pe-header-control" viewBox="0 0 24 24" fill="none"><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke-width="1.5" stroke-linecap="round"/></svg>' +
            '<svg v-else @click="headerPop=true" class="pe-header-control" viewBox="0 0 24 24" fill="none"><path d="M4 7L7 7M20 7L11 7" stroke-width="1.5" stroke-linecap="round"/><path d="M20 17H17M4 17L13 17" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12H7L20 12" stroke-width="1.5" stroke-linecap="round"/></svg>' +
        '</div>',
        'props': {
            'logoHref': {
                'default': ''
            },
            'fixed': {
                'default': false
            },
            'theme': {
                'default': 'default'
            }
        },
        'computed': {
            ...tool.clone(common.computed),
            'headerPop': {
                get: function() {
                    return purease.global.headerPop;
                },
                set: function(v: boolean) {
                    purease.global.headerPop = v;
                }
            }
        }
    },
    'pe-label': {
        'template': `<span class="pe-label" :class="['pe-label-'+mode]">` +
            '<template v-if="content">{{contentComp}}</template>' +
            '<slot v-else></slot>' +
        '</span>',
        'props': {
            // --- 'default' | 'tip' | 'mtip' | 'date' ---
            'mode': {
                'default': 'default'
            },
            'content': {
                'default': ''
            },

            'time': {
                'default': true
            },
            'date': {
                'default': true
            },
            'zone': {
                'default': false
            },
            'tz': {
                'default': undefined
            }
        },
        'computed': {
            ...tool.clone(common.computed),
            /** --- 替换 slot 数据 --- */
            contentComp: function(this: types.IVue): string {
                if (this.$props.mode !== 'date') {
                    return this.$props.content;
                }
                if (this.propNumber('content') === 0) {
                    return '';
                }
                const dateTxt: string[] = [];
                const date = new Date(this.propNumber('content') * 1000);
                /** --- 当前设定的时区 --- */
                const tz = this.$props.tz === undefined ? -(date.getTimezoneOffset() / 60) : this.propNumber('tz');
                date.setTime(date.getTime() + tz * 60 * 60 * 1000);
                if (this.propBoolean('date')) {
                    dateTxt.push(date.getUTCFullYear().toString() + '-' + (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + date.getUTCDate().toString().padStart(2, '0'));
                }
                if (this.propBoolean('time')) {
                    dateTxt.push(date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0') + ':' + date.getUTCSeconds().toString().padStart(2, '0'));
                }
                if (this.propBoolean('zone')) {
                    dateTxt.push('UTC' + (tz >= 0 ? '+' : '') + tz.toString());
                }
                return dateTxt.join(' ');
            }
        }
    },
    'pe-footer': {
        'template': `<div class="pe-footer" :class="[propBoolean('dark')&&'pe-dark']">` +
            '<div class="pe-footer-content">' +
                '<slot></slot>' +
            '</div>' +
            `<div v-if="$slots['bottom']" class="pe-footer-bottom">` +
                '<slot name="bottom"></slot>' +
            '</div>' +
        '</div>',
        'props': {
            'dark': {
                'default': false
            }
        },
        'computed': {
            ...tool.clone(common.computed)
        }
    },
    'pe-header-item': {
        'template': `<a class="pe-header-item" :href="href" :class="[menuCount&&'pe-list']">` +
            '<slot></slot>' +
        '</a>',
        'props': {
            'href': {
                'default': undefined
            }
        },
        'data': function() {
            return {
                'menuCount': 0
            };
        }
    },
    'pe-menu': {
        'template': '<div class="pe-menu">' +
            '<slot></slot>' +
        '</div>',
        mounted: function() {
            if (this.$parent.menuCount === undefined) {
                return;
            }
            ++this.$parent.menuCount;
        },
        unmounted: async function() {
            await this.$nextTick();
            if (this.$parent.menuCount === undefined) {
                return;
            }
            --this.$parent.menuCount;
        }
    },
    'pe-menu-item': {
        'template': '<a class="pe-menu-item" :href="href">' +
            '<slot></slot>' +
        '</a>',
        'props': {
            'href': {
                'default': undefined
            }
        },
    },
    'pe-banner': {
        'template': `<div class="pe-banner" :class="['pe-direction-'+direction]">` +
            '<div class="pe-banner-content">' +
                '<slot></slot>' +
            '</div>' +
        '</div>',
        'props': {
            'direction': {
                'default': 'h'
            }
        },
    },
    'pe-group': {
        'template': `<div class="pe-group" :class="[$slots['title']&&'pe-hastitle']">` +
            `<div v-if="$slots['title']" class="pe-group-title">` +
                '<slot name="title"></slot>' +
            '</div>' +
            '<div class="pe-group-content">' +
                '<slot></slot>' +
            '</div>' +
            `<div v-if="$slots['bottom']" class="pe-group-bottom">` +
                '<slot name="bottom"></slot>' +
            '</div>' +
        '</div>'
    },
    'pe-text': {
        'template': `<div class="pe-text" :class="[isFocus&&'pe-focus',propBoolean('plain')&&'pe-plain',propBoolean('disabled')&&'pe-disabled']">` +
            `<div v-if="$slots['before']" class="pe-before"><slot name="before"></slot></div>` +
            `<div v-if="$slots['prepend']" class="pe-prepend">` +
                '<slot name="prepend"></slot>' +
            '</div>' +
            `<textarea v-if="type==='multi'" ref="text" :placeholder="placeholder" :value="value" @input="input" @focus="tfocus" @blur="tblur"></textarea>` +
            `<input v-else ref="text" :placeholder="placeholder" :value="value" @input="input" @focus="tfocus" @blur="tblur" :type="type">` +
            `<div v-if="$slots['append']" class="pe-append">` +
                '<slot name="append"></slot>' +
            '</div>' +
            `<div v-if="$slots['after']" class="pe-after"><slot name="after"></slot></div>` +
        '</div>',
        'props': {
            'modelValue': {
                'default': ''
            },
            'readonly': {
                'default': false
            },
            'type': {
                // --- 'text' | 'multi' | 'password' | 'number' ---
                'default': 'text'
            },
            'placeholder': {
                'default': ''
            },
            'disabled': {
                'default': false
            },
            'plain': {
                'default': false
            },
            'maxlength': {
                'default': 0
            },
            'max': {
                'default': undefined
            },
            'min': {
                'default': undefined
            },
        },
        'emits': {
            'beforechange': null,
            'focus': null,
            'blur': null,

            'update:modelValue': null
        },
        'data': function() {
            return {
                'isFocus': false,
                'value': ''
            };
        },
        'computed': {
            ...tool.clone(common.computed),
        },
        'methods': {
            /** --- 检测 value 值是否符合 max 和 min --- */
            checkNumber: function(this: types.IVue, target?: HTMLInputElement | HTMLTextAreaElement) {
                if (!target) {
                    target = this.$refs.text as unknown as HTMLInputElement | HTMLTextAreaElement;
                }
                if (this.$props.type !== 'number') {
                    return false;
                }
                let change = false;
                if (!target.value && this.value) {
                    change = true;
                }
                if (target.value) {
                    const val = parseFloat(target.value);
                    if (this.$props.max !== undefined && this.$props.max !== 'undefined' && val > this.propNumber('max')) {
                        target.value = this.propNumber('max').toString();
                        change = true;
                    }
                    if (this.$props.min !== undefined && this.$props.min !== 'undefined' && val < this.propNumber('min')) {
                        target.value = this.propNumber('min').toString();
                        change = true;
                    }
                }
                return change;
            },
            /** --- 文本框的 input 事件 --- */
            input: function(this: types.IVue, e: InputEvent) {
                const target = e.target as HTMLInputElement | HTMLTextAreaElement;
                if (this.propNumber('maxlength') && (target.value.length > this.propNumber('maxlength'))) {
                    target.value = target.value.slice(0, this.propNumber('maxlength'));
                    return;
                }
                const event: types.ITextBeforechangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': target.value,
                        'change': undefined
                    }
                };
                this.$emit('beforechange', event);
                if (!event.go) {
                    target.value = this.value;
                    return;
                }
                if (event.detail.change !== undefined) {
                    target.value = event.detail.change;
                }
                this.value = target.value;
                this.$emit('update:modelValue', this.value);
            },
            /** --- 文本框的 focus 事件 --- */
            tfocus: function(this: types.IVue): void {
                this.isFocus = true;
                this.$emit('focus');
            },
            tblur: function(this: types.IVue, e: FocusEvent): void {
                // --- 如果是 number 则要判断数字是否符合 min max，不能在 input 判断，因为会导致用户无法正常输入数字，比如最小值是 10，他在输入 1 的时候就自动重置成 10 了 ---
                const target = e.target as HTMLInputElement | HTMLTextAreaElement;
                if (this.checkNumber(target)) {
                    const event: types.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': target.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (event.go) {
                        // --- 允许 ---
                        if (event.detail.change !== undefined) {
                            target.value = event.detail.change;
                        }
                        this.value = target.value;
                        this.$emit('update:modelValue', this.value);
                    }
                    else {
                        // --- 禁止 ---
                        target.value = this.value;
                    }
                }
                this.isFocus = false;
                this.$emit('blur');
            },
        },
        'watch': {
            'modelValue': {
                handler: async function(this: types.IVue) {
                    if (this.value === this.$props.modelValue) {
                        return;
                    }
                    this.value = this.$props.modelValue;
                    await this.$nextTick();
                    this.checkNumber();
                    if (this.propNumber('maxlength') && this.$refs.text.value.length > this.propNumber('maxlength')) {
                        this.$refs.text.value = this.$refs.text.value.slice(0, this.propNumber('maxlength'));
                    }
                    // --- 有可能设置后控件实际值和设置的值不同，所以要重新判断一下 ---
                    if (this.$refs.text.value === this.value) {
                        return;
                    }
                    const event: types.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': this.$refs.text.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        this.$refs.text.value = this.value;
                        return;
                    }
                    this.value = event.detail.change ?? this.$refs.text.value;
                    this.$emit('update:modelValue', this.value);
                },
                'immediate': true
            },
            'type': {
                handler: async function(this: types.IVue) {
                    await this.$nextTick();
                    if (this.checkNumber()) {
                        const event: types.ITextBeforechangeEvent = {
                            'go': true,
                            preventDefault: function() {
                                this.go = false;
                            },
                            'detail': {
                                'value': this.value,
                                'change': undefined
                            }
                        };
                        this.$emit('beforechange', event);
                        if (!event.go) {
                            this.$refs.text.value = this.value;
                            return;
                        }
                        this.value = event.detail.change ?? this.$refs.text.value;
                        this.$emit('update:modelValue', this.value);
                    }
                }
            },
            'max': {
                handler: function(this: types.IVue) {
                    if (this.checkNumber()) {
                        const event: types.ITextBeforechangeEvent = {
                            'go': true,
                            preventDefault: function() {
                                this.go = false;
                            },
                            'detail': {
                                'value': this.value,
                                'change': undefined
                            }
                        };
                        this.$emit('beforechange', event);
                        if (!event.go) {
                            this.$refs.text.value = this.value;
                            return;
                        }
                        this.value = event.detail.change ?? this.$refs.text.value;
                        this.$emit('update:modelValue', this.value);
                    }
                }
            },
            'min': {
                handler: function(this: types.IVue) {
                    if (this.checkNumber()) {
                        const event: types.ITextBeforechangeEvent = {
                            'go': true,
                            preventDefault: function() {
                                this.go = false;
                            },
                            'detail': {
                                'value': this.value,
                                'change': undefined
                            }
                        };
                        this.$emit('beforechange', event);
                        if (!event.go) {
                            this.$attrsrefs.text.value = this.value;
                            return;
                        }
                        this.value = event.detail.change ?? this.$refs.text.value;
                        this.$emit('update:modelValue', this.value);
                    }
                }
            },
            'maxlength': {
                handler: function(this: types.IVue) {
                    if (!this.propNumber('maxlength')) {
                        return;
                    }
                    if (this.value.length <= this.propNumber('maxlength')) {
                        return;
                    }
                    const value = this.value.slice(0, this.propNumber('maxlength'));
                    const event: types.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        return;
                    }
                    this.value = event.detail.change ?? value;
                    this.$emit('update:modelValue', this.value);
                }
            }
        },
    },
    'pe-check': {
        'template': `<div class="pe-check" :class="[value&&'pe-checked']" @click="click" tabindex="0">` +
            '<div class="pe-check-box">' +
                '<svg viewBox="0 0 24 24" stroke="none"><path d="M9.00001 18.25C8.8993 18.2466 8.80034 18.2227 8.70921 18.1797C8.61807 18.1367 8.53667 18.0756 8.47001 18L3.47001 13C3.37467 12.9382 3.29463 12.8556 3.23592 12.7583C3.17721 12.661 3.14136 12.5517 3.13109 12.4385C3.12082 12.3254 3.13639 12.2114 3.17663 12.1051C3.21686 11.9989 3.28071 11.9031 3.36336 11.8252C3.446 11.7472 3.54528 11.689 3.65369 11.6551C3.76211 11.6211 3.87682 11.6122 3.98918 11.629C4.10155 11.6458 4.20861 11.688 4.3023 11.7523C4.39599 11.8165 4.47385 11.9013 4.53001 12L9.00001 16.44L19.47 6.00003C19.611 5.90864 19.7785 5.86722 19.9458 5.88241C20.1131 5.89759 20.2705 5.96851 20.3927 6.08379C20.5149 6.19907 20.5948 6.35203 20.6197 6.51817C20.6446 6.68431 20.613 6.85399 20.53 7.00003L9.53001 18C9.46334 18.0756 9.38194 18.1367 9.29081 18.1797C9.19967 18.2227 9.10072 18.2466 9.00001 18.25Z"/></svg>' +
            '</div>' +
            '<div class="pe-check-label">' +
                '<slot></slot>' +
            '</div>' +
        '</div>',
        'props': {
            'modelValue': {
                'default': false
            }
        },
        'data': function() {
            return {
                'value': false
            };
        },
        'methods': {
            click: function(this: types.IVue, e: MouseEvent) {
                const target = e.target as HTMLElement | null;
                if (!target) {
                    return;
                }
                if (target.tagName.toLowerCase() === 'a') {
                    return;
                }
                if (dom.findParentByTag(target, 'a')) {
                    return;
                }
                this.value = !this.value;
                this.$emit('update:modelValue', this.value);
            },
        },
        'watch': {
            'modelValue': {
                handler: function(this: types.IVue) {
                    this.value = this.modelValue;
                },
                'immediate': true
            }
        },
    },
    'pe-icon': {
        'template':
        // --- link ---
            `<svg v-if="name==='link'" class="pe-icon" viewBox="0 0 24 24" fill="none"><path d="M13 11L22 2M22 2H16.6562M22 2V7.34375" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2.49073 19.5618 2.16444 18.1934 2.0551 16" stroke-width="1.5" stroke-linecap="round"/></svg>` +
            // --- language ---
            `<svg v-else-if="name==='language'" class="pe-icon" viewBox="0 0 24 24"><path d="M8 15H3.5A2.502 2.502 0 0 1 1 12.5v-9A2.502 2.502 0 0 1 3.5 1h9A2.502 2.502 0 0 1 15 3.5V8h-1V3.5A1.502 1.502 0 0 0 12.5 2h-9A1.502 1.502 0 0 0 2 3.5v9A1.502 1.502 0 0 0 3.5 14H8zm-.038-4.811a9.77 9.77 0 0 1-3.766 1.796l-.242-.97a8.816 8.816 0 0 0 3.282-1.532A9.264 9.264 0 0 1 4.888 5H4V4h3.279l-.544-.544.707-.707L8.692 4H12v1h-.914A9.836 9.836 0 0 1 9.78 8.152a3.853 3.853 0 0 0-1.82 2.037zm.032-1.383A8.167 8.167 0 0 0 10.058 5H5.922a8.18 8.18 0 0 0 2.072 3.806zM23 20.447v-8.894A2.525 2.525 0 0 0 20.484 9h-8.931A2.556 2.556 0 0 0 9 11.553v8.894A2.556 2.556 0 0 0 11.553 23h8.894A2.556 2.556 0 0 0 23 20.447zM20.484 10A1.517 1.517 0 0 1 22 11.516v8.968A1.517 1.517 0 0 1 20.484 22h-8.968A1.517 1.517 0 0 1 10 20.484v-8.968A1.517 1.517 0 0 1 11.516 10zm-2.086 8h-4.796l-1.159 2.23-.886-.46L16 11.215l4.443 8.555-.886.46zm-.52-1L16 13.385 14.122 17z" stroke-width=".5"/></svg>`,
        'props': {
            'name': {
                'default': 'link'
            }
        }
    },
    'pe-select': {
        'template': `<div class="pe-select" :class="[propBoolean('plain')&&'pe-plain',propBoolean('disabled')&&'pe-disabled']" :tabindex="!propBoolean('disabled') ? '0' : undefined">` +
            // eslint-disable-next-line no-irregular-whitespace
            `<div class="pe-select-label" @click="open">{{dataComp[index] ? dataComp[index].label : '　'}}</div>` +
            '<div class="pe-select-arrow" @click="open"></div>' +
            '<div class="pe-pop" ref="pop">' +
                `<pe-text v-if="propBoolean('search')" v-model="searchValue" plain :placeholder="l('search')"></pe-text>` +
                `<div class="pe-select-list" :class="[!searchComp.length&&'pe-empty']">` +
                    `<div v-if="searchComp.length" v-for="item, i of searchComp" class="pe-select-item" :class="[(index===i)&&'pe-selected']" @click="click(item.index===undefined?i:item.index)">{{item.label}}</div>` +
                    `<div v-else>{{l('empty')}}</div>` +
                '</div>' +
            '</div>' +
        '</div>',
        'props': {
            'modelValue': {
                'default': ''
            },
            'data': {
                'default': []
            },
            'disabled': {
                'default': false
            },
            'plain': {
                'default': false
            },
            'search': {
                'default': false
            },
        },
        'emits': {
            'index': null,
            'changed': null,
            'update:modelValue': null
        },
        'data': function() {
            return {
                'index': 0,
                'searchValue': '',

                /** --- 语言包 --- */
                'localeData': {
                    'en': {
                        'empty': 'Empty',
                        'search': 'Search'
                    },
                    'sc': {
                        'empty': '空',
                        'search': '搜索'
                    },
                    'tc': {
                        'empty': '空',
                        'search': '搜尋'
                    },
                    'ja': {
                        'empty': '空っぽ',
                        'search': '検索'
                    },
                    'ko': {
                        'empty': '비어 있음',
                        'search': '검색'
                    },
                    'th': {
                        'empty': 'ว่างเปล่า',
                        'search': 'ค้นหา'
                    },
                    'es': {
                        'empty': 'Vacío',
                        'search': 'buscar'
                    },
                    'de': {
                        'empty': 'Leer',
                        'search': 'suchen'
                    },
                    'fr': {
                        'empty': 'Vide',
                        'search': 'rechercher'
                    },
                    'pt': {
                        'empty': 'Vazio',
                        'search': 'pesquisar'
                    },
                    'ru': {
                        'empty': 'Пусто',
                        'search': 'поиск'
                    },
                    'vi': {
                        'empty': 'Trống',
                        'search': 'tìm kiếm'
                    }
                }
            };
        },
        'methods': {
            open: function(this: types.IVue) {
                dom.showPop(this.$refs.pop);
            },
            click: function(this: types.IVue, index: number) {
                this.index = index;
                this.searchValue = '';
                this.$emit('update:modelValue', this.dataComp[index].value);
                this.$emit('index', index);
                const event: types.ISelectChangedEvent = {
                    'detail': {
                        'value': this.dataComp[index].value
                    }
                };
                this.$emit('changed', event);
                dom.hidePop();
            }
        },
        'computed': {
            ...tool.clone(common.computed),
            dataComp: function(this: types.IVue) {
                const ds: Array<{
                    'label': string;
                    'value': string;
                }> = [];
                for (const item of this.$props.data) {
                    if (typeof item === 'string') {
                        ds.push({
                            'label': item,
                            'value': item
                        });
                        continue;
                    }
                    ds.push({
                        'label': item.label ?? item.value ?? '',
                        'value': item.value ?? item.label ?? ''
                    });
                }
                return ds;
            },
            searchComp: function(this: types.IVue) {
                if (!this.searchValue) {
                    return this.dataComp;
                }
                const ds: Array<{
                    'label': string;
                    'value': string;
                    'index': number;
                }> = [];
                for (let i = 0; i < this.dataComp.length; ++i) {
                    const item = this.dataComp[i];
                    let include = true;
                    for (const char of this.searchValue) {
                        if (item.label.includes(char) || item.value.includes(char)) {
                            continue;
                        }
                        // --- 没包含 ---
                        include = false;
                        break;
                    }
                    if (include) {
                        ds.push({
                            'index': i,
                            'label': item.label,
                            'value': item.value
                        });
                    }
                }
                return ds;
            }
        },
        'watch': {
            'modelValue': {
                handler: function(this: types.IVue) {
                    for (let i = 0; i < this.dataComp.length; ++i) {
                        if (this.modelValue !== this.dataComp[i].value) {
                            continue;
                        }
                        this.index = i;
                        return;
                    }
                    if (!this.dataComp[0]) {
                        if (this.modelValue === '') {
                            return;
                        }
                        this.$emit('update:modelValue', '');
                    }
                    this.$emit('update:modelValue', this.dataComp[0].value);
                },
                'immediate': true
            }
        }
    },
    'pe-swipe': {
        'template': `<div class="pe-swipe" :class="['pe-control-'+control]">` +
            `<div class="pe-swipe-wrap" @mousedown="down" @touchstart="down" :style="{'border-radius':radius?radius+'px':undefined}">` +
                `<div class="pe-swipe-items" ref="items">` +
                    '<slot></slot>' +
                '</div>' +
            '</div>' +
            `<div class="pe-swipe-page" :class="['pe-'+page]">` +
                `<div v-for="i of pageCount" class="pe-swipe-page-item" :class="[(selected===i-1)&&'pe-selected']" @click="pdown(i)"></div>` +
            '</div>' +
            '<div v-if="pageCount > 1" class="pe-swipe-prev" @click="prev"></div>' +
            '<div v-if="pageCount > 1" class="pe-swipe-next" @click="next"></div>' +
        '</div>',
        'props': {
            'modelValue': {
                'default': 0
            },
            // ---- 自动滚动 ---
            'auto': {
                'default': false
            },
            'page': {
                // --- left, center, right, none ---
                'default': 'center'
            },
            'control': {
                // --- inner, outer ---
                'default': 'inner'
            },
            // --- 外大圆角 ---
            'radius': {
                'default': undefined
            },
            // --- 一页显示多个 item，默认 1 只显示一个 ---
            'item': {
                'default': 1
            },
            'minitem': {
                'default': 1
            },
            // --- 内页间距 ---
            'gutter': {
                'default': 0
            }
        },
        data: function() {
            return {
                /** --- 总数 --- */
                'itemCount': 0,
                /** --- 当前显示中的 swipe --- */
                'selected': 0,
                /** --- 用户设置的 selected --- */
                'mvselected': 0,
                /** --- 自动滚动的 timer  --- */
                'timer': null,

                /** --- 当前 swipe 的位置 --- */
                'translate': 0,
                /** --- 当前 swipe 的宽度 --- */
                'width': 0,

                /** --- 当前是否正在执行动画 --- */
                'going': false
            };
        },
        'watch': {
            'modelValue': {
                handler: function(this: types.IVue) {
                    if (this.selected === this.modelValue) {
                        return;
                    }
                    this.mvselected = this.modelValue;
                    if (this.going) {
                        return;
                    }
                    this.selected = this.mvselected;
                    this.go();
                },
                'immediate': true
            },
            'auto': {
                handler: function(this: types.IVue) {
                    if (tool.getBoolean(this.auto)) {
                        // --- 静 变 动 ---
                        this.timer = setTimeout(() => {
                            this.timer = null;
                            ++this.selected;
                            this.go();
                            this.mvselected = this.selected;
                            this.$emit('update:modelValue', this.mvelected);
                        }, 3000);
                        return;
                    }
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            }
        },
        'computed': {
            /** --- 总宽度 --- */
            awidth: function(this: types.IVue) {
                return (this.width * this.pageCount) + (tool.getNumber(this.$props.gutter) * (this.pageCount - 1));
            },
            /** --- 每个 item 应该的宽度 --- */
            iwidth: function(this: types.IVue): string {
                const iwidth = 100 / this.pitem;
                if (this.pitem > 1) {
                    return 'calc((100% - ' + (this.pitem - 1) * tool.getNumber(this.$props.gutter) + 'px) / ' + this.pitem + ')';
                }
                return iwidth + '%';
            },
            /** --- 总页数 --- */
            pageCount: function(this: types.IVue) {
                return Math.ceil(this.itemCount / this.pitem);
            },
            /** --- 一页面有多少个 item --- */
            pitem: function(this: types.IVue): number {
                return tool.getNumber(this.$root.windowWidth >= 800 ? this.$props.item : this.$props.minitem);
            }
        },
        methods: {
            down: function(this: types.IVue, e: TouchEvent | MouseEvent) {
                if (dom.hasTouchButMouse(e)) {
                    return;
                }
                if (this.going) {
                    return;
                }
                if (this.pageCount < 2) {
                    return;
                }
                const target = e.target as HTMLElement | null;
                if (!target) {
                    return;
                }
                if (target.tagName.toLowerCase() === 'a') {
                    return;
                }
                const a = dom.findParentByTag(target, 'a');
                if (a) {
                    return;
                }
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                /** --- 原始 x 位置 --- */
                const ox = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
                /** --- 上次的 x 位置 --- */
                let x = ox;
                const time = Date.now();
                dom.bindDown(e, {
                    move: (ne) => {
                        // --- 当前的位置 ---
                        const nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                        /** --- 移动的差值 --- */
                        const cx = nx - x;
                        x = nx;
                        this.translate += cx;
                        if (this.translate > this.width) {
                            this.translate = this.width;
                        }
                        else if (this.translate < -this.awidth) {
                            this.translate = -this.awidth;
                        }
                        this.$refs.items.style.transform = 'translateX(' + this.translate + 'px)';
                    },
                    end: () => {
                        const cx = x - ox;
                        const speed = Math.abs(cx / (Date.now() - time));
                        /** --- 看看当前滚动哪儿了 --- */
                        const info = -(this.translate / this.width);
                        /** --- 当前的位置 --- */
                        const index = Math.floor(info);
                        /** --- 当前的小数 --- */
                        const dec = tool.getDecimal(info);
                        if (speed > 0.6) {
                            // --- 速度很快，一定到下一条 ---
                            // --- cx 大于 0 为向左滑动 ---
                            this.selected = cx > 0 ? index : index + 1;
                            this.go();
                            this.mvselected = this.selected;
                            this.$emit('update:modelValue', this.mvselected);
                            return;
                        }
                        // --- 速度很慢，根据位置选择显示 ---
                        if (index >= 0) {
                            this.selected = dec >= 0.5 ? index + 1 : index;
                        }
                        else {
                            this.selected = dec >= -0.5 ? index + 1 : index;
                        }
                        this.go();
                        this.mvselected = this.selected;
                        this.$emit('update:modelValue', this.mvselected);
                    }
                });
            },
            prev: function(this: types.IVue) {
                if (this.going) {
                    return;
                }
                this.translate += 10;
                --this.selected;
                this.go();
                this.mvselected = this.selected;
                this.$emit('update:modelValue', this.mvselected);
            },
            next: function(this: types.IVue) {
                if (this.going) {
                    return;
                }
                this.translate -= 10;
                ++this.selected;
                this.go();
                this.mvselected = this.selected;
                this.$emit('update:modelValue', this.mvselected);
            },
            pdown: function(this: types.IVue, p: number) {
                if (this.going) {
                    return;
                }
                --p;
                if (p === this.selected) {
                    return;
                }
                this.selected = p;
                this.go();
                this.mvselected = this.selected;
                this.$emit('update:modelValue', this.mvselected);
            },
            go: async function(this: types.IVue) {
                this.going = true;
                const index = this.selected;
                if (this.selected === -1) {
                    this.selected = this.pageCount - 1;
                }
                else if (this.selected === this.pageCount) {
                    this.selected = 0;
                }
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.$refs.items.style.transition = 'var(--pe-transition)';
                // --- 设置允许缓动 ---
                await tool.sleep(34);
                this.$refs.items.style.transform = 'translateX(' + (-(index * this.width + index * tool.getNumber(this.$props.gutter))).toString() + 'px)';
                // --- 应用缓动后等待动画执行完成 ---
                await tool.sleep(334);
                this.$refs.items.style.transition = '';
                await tool.sleep(34);
                // --- 移除缓动效果后重置位置 ---
                this.translate = -(this.selected * this.width + this.selected * tool.getNumber(this.$props.gutter));
                this.$refs.items.style.transform = 'translateX(' + this.translate + 'px)';
                this.going = false;
                // --- 判断 ---
                if (this.mvselected !== this.selected) {
                    this.selected = this.mvselected;
                    this.go();
                    return;
                }
                if (tool.getBoolean(this.auto)) {
                    this.timer = setTimeout(() => {
                        this.translate -= 10;
                        this.timer = null;
                        ++this.selected;
                        this.go();
                        this.mvselected = this.selected;
                        this.$emit('update:modelValue', this.mvselected);
                    }, 3000);
                }
            },
            resize: function(this: types.IVue) {
                this.width = this.$el.offsetWidth;
                this.translate = -(this.selected * this.width);
                this.$refs.items.style.transform = 'translateX(' + this.translate + 'px)';
            }
        },
        mounted: function() {
            this.width = this.$el.offsetWidth;
            if (tool.getBoolean(this.auto)) {
                this.timer = setTimeout(() => {
                    this.timer = null;
                    ++this.selected;
                    this.go();
                    this.mvselected = this.selected;
                    this.$emit('update:modelValue', this.mvelected);
                }, 3000);
            }
            window.addEventListener('resize', this.resize);
        },
        unmounted: async function() {
            await this.$nextTick();
            window.removeEventListener('resize', this.resize);
            if (!this.timer) {
                return;
            }
            clearTimeout(this.timer);
        }
    },
    'pe-swipe-item': {
        'template': `<div class="pe-swipe-item" :class="['pe-direction-'+direction]" :style="{'left': left, 'width': iwidth}">` +
            '<slot></slot>' +
        '</div>',
        'props': {
            'direction': {
                'default': 'h'
            }
        },
        'data': function() {
            return {
                'index': 0
            };
        },
        'computed': {
            /** --- 当前 item 应该在第几页显示 --- */
            npage: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return Math.floor(this.index / this.$parent.pitem);
            },
            /** --- 当前 item 在当前页的 index --- */
            pindex: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.index % this.$parent.pitem;
            },
            left: function(this: types.IVue): string {
                if (!this.$parent) {
                    return '0';
                }
                const gutter = tool.getNumber(this.$parent.$props.gutter);
                let left = this.width * this.npage + (this.npage * gutter);
                if (this.translate > 0) {
                    if (this.npage === this.$parent.pageCount - 1) {
                        // --- 最后页显示在最前面 ---
                        left = -this.width - gutter;
                    }
                }
                else if (this.translate < -this.awidth + this.width) {
                    if (this.npage === 0) {
                        // --- 当前是第一个页面要显示在最后 ---
                        left = this.awidth + gutter;
                    }
                }
                // --- 单页偏移 ---
                if (this.pindex > 0) {
                    return 'calc(' + (left + (gutter * this.pindex)) + 'px + ' + this.iwidth + ' * ' + this.pindex + ')';
                }
                return left + 'px';
            },
            // --- 一个页面的宽度 ---
            width: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.width;
            },
            // --- 总宽度 ---
            awidth: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.awidth;
            },
            // --- 当前 item 应该的宽度百分比 ---
            iwidth: function(this: types.IVue) {
                if (!this.$parent) {
                    return '100%';
                }
                return this.$parent.iwidth;
            },
            translate: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.translate;
            }
        },
        mounted: function(this: types.IVue) {
            if (!this.$parent) {
                return;
            }
            if (this.$parent.itemCount === undefined) {
                return;
            }
            ++this.$parent.itemCount;
            this.index = dom.index(this.$el);
        },
        unmounted: async function(this: types.IVue) {
            await this.$nextTick();
            if (!this.$parent) {
                return;
            }
            if (this.$parent.itemCount === undefined) {
                return;
            }
            --this.$parent.itemCount;
        }
    },
    'pe-bar': {
        'template': `<div class="pe-bar" :class="['pe-theme-'+theme]">` +
            '<slot></slot>' +
        '</div>',
        'props': {
            'theme': {
                'default': 'default'
            }
        }
    },
    'pe-bar-item': {
        'template': `<a class="pe-bar-item" :href="href" :class="[menuCount&&'pe-list']">` +
            '<slot></slot>' +
        '</a>',
        'props': {
            'href': {
                'default': undefined
            }
        },
        'data': function() {
            return {
                'menuCount': 0
            };
        }
    },
    'pe-tab': {
        'template': '<div class="pe-tab">' +
            '<slot></slot>' +
        '</div>',
        'data': function() {
            return {
                'selected': 0
            };
        },
        'props': {
            'modelValue': {
                'default': 0
            }
        },
        'watch': {
            'selected': {
                handler: function(this: types.IVue) {
                    if (this.modelValue === this.selected) {
                        return;
                    }
                    this.$emit('update:modelValue', this.selected);
                }
            },
            'modelValue': {
                handler: function(this: types.IVue) {
                    if (this.modelValue === this.selected) {
                        return;
                    }
                    this.selected = this.modelValue;
                },
                'immediate': true
            }
        }
    },
    'pe-tab-item': {
        'template': `<div class="pe-tab-item" :class="[isSelected&&'pe-selected']" @mouseenter="hover" @touchstart="hover">` +
            '<slot></slot>' +
        '</div>',
        'data': function() {
            return {
                'index': 0
            };
        },
        'computed': {
            isSelected: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.selected === this.index;
            }
        },
        'methods': {
            hover: function(this: types.IVue, e: MouseEvent | TouchEvent) {
                if (!this.$parent) {
                    return;
                }
                if (dom.hasTouchButMouse(e)) {
                    return;
                }
                this.$parent.selected = this.index;
            }
        },
        mounted: function(this: types.IVue) {
            if (!this.$parent) {
                return;
            }
            if (this.$parent.selected === undefined) {
                return;
            }
            this.index = dom.index(this.$el);
        },
    },
    'pe-dialog': {
        'template': `<div class="pe-dialog" :class="[propBoolean('show')&&'pe-show']">` +
            '<div class="pe-dialog-form">' +
                '<div class="pe-dialog-title" v-if="title">{{title}}</div>' +
                '<div v-if="content" class="pe-dialog-content" v-html="content"></div>' +
                '<div v-else class="pe-dialog-content">' +
                    '<slot></slot>' +
                '</div>' +
                '<div class="pe-dialog-bottom">' +
                    `<div v-for="item, i of buttons" class="pe-button" :class="[(i===buttons.length-1)&&'pe-dark']" @click="$emit('select', item)">{{item}}</div>` +
                '</div>' +
            '</div>' +
        '</div>',
        'props': {
            'title': {
                'default': ''
            },
            'content': {
                'default': ''
            },
            'buttons': {
                'default': ['OK']
            },
            'show': {
                'default': false
            }
        },
        'emits': {
            'select': null
        },
        'computed': {
            ...tool.clone(common.computed)
        }
    },
    'pe-page': {
        'template': '<div class="pe-page">' +
            '<div class="pe-page-list">' +
                '<pe-select v-if="countsComp.length" :data="countsComp" v-model="countSelect" @changed="changed"></pe-select>' +
                // --- 向左翻页 ---
                `<div v-if="page > 1" tabindex="0" class="pe-page-left" @click="--page;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div>` +
                // --- 首页码 ---
                `<div v-if="page > 1" tabindex="0" @click="page=1;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">1</div>` +
                // --- 左麻子点 ---
                `<div v-if="page > propNumber('control') + 2" tabindex="0" v-html="svg" @click="page-=10;if(page<1){page=1}$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div>` +
                // --- 左扩展页码 ---
                `<div tabindex="0" v-for="item of prevs" @click="page=item;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">{{item}}</div>` +
                // --- 中间的页码 ---
                `<div tabindex="0" class="pe-selected">{{page}}</div>` +
                // --- 右扩展页码 ---
                `<div tabindex="0" v-for="item of nexts" @click="page=item;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">{{item}}</div>` +
                // --- 右麻子点 ---
                `<div v-if="page < maxPage - propNumber('control') - 1" tabindex="0" v-html="svg" @click="page+=10;if(page>maxPage){page=maxPage}$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div>` +
                // --- 尾页码 ---
                `<div v-if="page < maxPage" tabindex="0" @click="page=maxPage;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">{{maxPage}}</div>` +
                // --- 向右翻页 ---
                `<div v-if="page < maxPage" tabindex="0" class="pe-page-right" @click="++page;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div>` +
            '</div>' +
            `<div v-if="propInt('total')" class="pe-page-total">{{l('total-of').replace('?',propInt('total'))}}</div>` +
        '</div>',
        'props': {
            'modelValue': {
                'default': 1
            },
            'max': {
                'default': 0
            },
            'total': {
                'default': 0
            },
            'count': {
                'default': 10
            },
            /** --- 设置后出现选项可选择每页多少条, Array<number> | string --- */
            'counts': {
                'default': []
            },
            'control': {
                'default': 10
            }
        },
        'emits': {
            'change': null,

            'update:modelValue': null,
            'update:count': null
        },
        'data': function() {
            return {
                'svg': '<svg width="14" height="14" viewBox="0 0 24 24" stroke="none"><path d="m6 10.25c-.9665 0-1.75.7835-1.75 1.75s.7835 1.75 1.75 1.75h.01c.9665 0 1.75-.7835 1.75-1.75s-.7835-1.75-1.75-1.75zm4.25 1.75c0-.9665.7835-1.75 1.75-1.75h.01c.9665 0 1.75.7835 1.75 1.75s-.7835 1.75-1.75 1.75h-.01c-.9665 0-1.75-.7835-1.75-1.75zm6 0c0-.9665.7835-1.75 1.75-1.75h.01c.9665 0 1.75.7835 1.75 1.75s-.7835 1.75-1.75 1.75h-.01c-.9665 0-1.75-.7835-1.75-1.75z" /></svg>',
                'countSelect': 0,
                /** --- 上面页面序列 --- */
                'prevs': [],
                /** --- 下面页面序列 --- */
                'nexts': [],
                /** --- 当前页面 --- */
                'page': 0,
                /** --- 最大页数，如果用户传入了 max 则以 max 为准，否则以 total 和 count 计算最大页面值 --- */
                'maxPage': 0,
                /** --- 语言包 --- */
                'localeData': {
                    'en': {
                        'total-of': 'Total of ? items',
                        'page': 'Page'
                    },
                    'sc': {
                        'total-of': '共 ? 条',
                        'page': '页'
                    },
                    'tc': {
                        'total-of': '共 ? 條',
                        'page': '頁'
                    },
                    'ja': {
                        'total-of': '? 件の合計',
                        'page': 'ページ'
                    },
                    'ko': {
                        'total-of': '? 개 항목 총계',
                        'page': '페이지'
                    },
                    'th': {
                        'total-of': 'ทั้งหมด ? รายการ',
                        'page': 'หน้า'
                    },
                    'es': {
                        'total-of': 'Total de ? elementos',
                        'page': 'Página'
                    },
                    'de': {
                        'total-of': 'Insgesamt ?',
                        'page': 'Seite'
                    },
                    'fr': {
                        'total-of': 'Total de ?',
                        'page': 'Page'
                    },
                    'pt': {
                        'total-of': 'Total de ?',
                        'page': 'Página'
                    },
                    'ru': {
                        'total-of': 'Всего ?',
                        'page': 'Страница'
                    },
                    'vi': {
                        'total-of': 'Tổng cộng ?',
                        'page': 'Trang'
                    }
                }
            };
        },
        'computed': {
            ...tool.clone(common.computed),
            /** --- 格式化每页多少条 counts --- */
            countsComp: function(this: types.IVue): Array<{
                'label': string;
                'value': number;
            }> {
                const counts = this.propArray('counts');
                const list: Array<{
                    'label': string;
                    'value': number;
                }> = [];
                for (const item of counts) {
                    list.push({
                        'label': item.toString() + ' / ' + this.l('page'),
                        'value': item
                    });
                }
                return list;
            }
        },
        'methods': {
            refresh: function(this: types.IVue) {
                this.prevs.length = 0;
                let min = this.page - this.propNumber('control');
                if (min < 2) {
                    min = 2;
                }
                for (let i = this.page - 1; i >= min; --i) {
                    this.prevs.unshift(i);
                }

                this.nexts.length = 0;
                let max = this.page + this.propNumber('control');
                if (max > this.maxPage - 1) {
                    max = this.maxPage - 1;
                }
                for (let i = this.page + 1; i <= max; ++i) {
                    this.nexts.push(i);
                }
            },
            refreshMaxPage: function(this: types.IVue) {
                const max = this.propInt('max');
                if (max) {
                    this.maxPage = max;
                    return;
                }
                if (!this.propInt('total')) {
                    this.maxPage = 1;
                    return;
                }
                this.maxPage = Math.ceil(this.propInt('total') / this.countSelect);
            },
            keydown: function(e: KeyboardEvent) {
                if (e.key !== 'Enter') {
                    return;
                }
                e.preventDefault();
                (e.target as HTMLElement).click();
            },
            changed: function(this: types.IVue, e: types.ISelectChangedEvent) {
                this.$emit('update:count', e.detail.value);
                this.refreshMaxPage();
                this.refresh();
            }
        },
        'watch': {
            'count': {
                handler: function(this: types.IVue) {
                    this.countSelect = this.propInt('count');
                    this.refreshMaxPage();
                    this.refresh();
                }
            },
            'modelValue': {
                handler: function(this: types.IVue) {
                    this.page = this.propInt('modelValue');
                    this.refresh();
                },
                'immediate': true
            },
            'max': {
                handler: function(this: types.IVue) {
                    this.refreshMaxPage();
                    this.refresh();
                }
            },
            'total': {
                handler: function(this: types.IVue) {
                    this.refreshMaxPage();
                    this.refresh();
                }
            },
            'control': {
                handler: function(this: types.IVue) {
                    this.refresh();
                }
            }
        },
        mounted: function() {
            this.countSelect = this.propInt('count');
            this.refreshMaxPage();
            this.refresh();
        }
    },
    'pe-slider': {
        'template': `<div class="pe-slider">` +
            `<div v-if="propBoolean('range')" class="pe-slider-bar" :style="{'width': barWidth + '%', 'left': 'calc(' + barLeft + '% - 11px)'}"></div>` +
            `<div class="pe-slider-block" :style="{'left': 'calc(' + pos[0] + '% - 11px)'}" tabindex="0" @mousedown="down($event, 0)" @touchstart="down($event, 0)"></div>` +
            `<div v-if="propBoolean('range')" class="pe-slider-block" :style="{'left': 'calc(' + pos[1] + '% - 11px)'}" tabindex="0" @mousedown="down($event, 1)" @touchstart="down($event, 1)"></div>` +
        '</div>',
        'props': {
            'modelValue': {
                'default': [0, 0]
            },
            'min': {
                'default': 0
            },
            'max': {
                'default': 100
            },
            'range': {
                'default': false
            },
        },
        data: function() {
            return {
                // --- 圆坨坨左侧位置百分比，如 80 ---
                'pos': [0, 0]
            };
        },
        'computed': {
            ...tool.clone(common.computed),
            barWidth: function(this: types.IVue) {
                /**
                原公式：
                100 - this.pos[0] - (100 - this.pos[1])
                展开括号：
                100 - this.pos[0] - 100 + this.pos[1]
                合并常数：
                100 - 100 - this.pos[0] + this.pos[1]
                0 - this.pos[0] + this.pos[1]
                */
                return this.pos[1] - this.pos[0];
            },
            barLeft: function(this: types.IVue) {
                return this.pos[0];
            }
        },
        methods: {
            down: function(this: types.IVue, e: TouchEvent | MouseEvent, i: number) {
                if (dom.hasTouchButMouse(e)) {
                    return;
                }
                const bcr = this.$el.getBoundingClientRect();
                /** --- slider 的宽度 --- */
                const width = bcr.width;
                const left = bcr.left;
                dom.bindDown(e, {
                    move: (ne) => {
                        // --- 当前的位置 ---
                        const nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                        /** --- 当前滑块位置 --- */
                        let pos = (nx - left) / width * 100;
                        // --- 先判断滑块不能大于 100% 小于 0% ---
                        if (pos < 0) {
                            pos = 0;
                        }
                        else if (pos > 100) {
                            pos = 100;
                        }
                        // --- 然后判断滑块不能小于左侧不能大于右侧 ---
                        if (this.propBoolean('range')) {
                            if (i === 0) {
                                // --- 左侧 ---
                                if (pos > this.pos[1]) {
                                    pos = this.pos[1];
                                }
                            }
                            else {
                                // --- 右侧 ---
                                if (pos < this.pos[0]) {
                                    pos = this.pos[0];
                                }
                            }
                        }
                        this.pos[i] = pos;
                        this.$emit('update:modelValue', [
                            this.propInt('min') + Math.round(this.pos[0] / 100 * (this.propInt('max') - this.propInt('min'))),
                            this.propBoolean('range') ? this.propInt('min') + Math.round(this.pos[1] / 100 * (this.propInt('max') - this.propInt('min'))) : 0,
                        ]);
                    }
                });
            }
        },
        'watch': {
            'modelValue': {
                handler: function(this: types.IVue) {
                    if (!Array.isArray(this.modelValue)) {
                        this.$emit('update:modelValue', [0, 0]);
                        return;
                    }
                    let change = false;
                    if (typeof this.modelValue[0] !== 'number') {
                        this.modelValue[0] = parseInt(this.modelValue[0]);
                        if (Number.isNaN(this.modelValue[0])) {
                            this.modelValue[0] = 0;
                        }
                        change = true;
                    }
                    if (typeof this.modelValue[1] !== 'number') {
                        this.modelValue[1] = parseInt(this.modelValue[1]);
                        change = true;
                    }
                    if (this.propBoolean('range')) {
                        if (this.modelValue[0] > this.modelValue[1]) {
                            this.modelValue[0] = this.modelValue[1];
                            change = true;
                        }
                    }
                    if (change) {
                        this.$emit('update:modelValue', this.modelValue);
                    }
                    this.pos[0] = (this.modelValue[0] - this.propInt('min')) / (this.propInt('max') - this.propInt('min')) * 100;
                    this.pos[1] = (this.modelValue[1] - this.propInt('min')) / (this.propInt('max') - this.propInt('min')) * 100;
                },
                'immediate': true
            }
        }
    },
    'pe-switch': {
        'template': `<div class="pe-switch" :class="[value===mapComp.true&&'pe-checked',propBoolean('disabled')&&'pe-disabled']" :tabindex="!propBoolean('disabled') ? '0' : undefined" @click="click" @keydown="keydown">` +
            '<div class="pe-switch-block"></div>' +
        '</div>',
        'props': {
            'disabled': {
                'default': false,
            },
            'map': {
                'default': {},
            },

            'modelValue': {
                'default': false,
            }
        },
        'data': function() {
            return {
                'value': false
            };
        },
        'computed': {
            ...tool.clone(common.computed),
            mapComp: function(this: types.IVue): {
                'true': any;
                'false': any;
            } {
                return {
                    'true': this.$props.map.true ?? true,
                    'false': this.$props.map.false ?? false
                };
            }
        },
        'watch': {
            'modelValue': {
                handler: function(this: types.IVue) {
                    if (this.$props.modelValue === undefined) {
                        return;
                    }
                    this.value = this.$props.modelValue;
                },
                'immediate': true
            }
        },
        'methods': {
            click: function(this: types.IVue): void {
                const event: types.ISwitchChangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': this.value
                    }
                };
                this.$emit('change', event);
                if (event.go) {
                    this.value = this.value === this.mapComp.true ? this.mapComp.false : this.mapComp.true;
                    this.$emit('update:modelValue', this.value);
                }
            },
            keydown: function(this: types.IVue, e: KeyboardEvent): void {
                if (e.key !== 'Enter') {
                    return;
                }
                e.preventDefault();
                this.click();
            },
        }
    },
    'pe-drawer': {
        'template': `<div class="pe-drawer" :class="[propBoolean('modelValue')&&'pe-show']" @click="click">` +
            `<div class="pe-drawer-body" :style="{'width':widthComp}">` +
                '<div class="pe-drawer-header" v-if="title">' +
                    '<div class="pe-drawer-title">{{title}}</div>' +
                    `<div class="pe-drawer-close" @click="closeClick" v-show="propBoolean('modelValue')">` +
                        '<svg width="24" height="24" viewBox="0 0 24 24" stroke="none"><path d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z" /></svg>' +
                    '</div>' +
                '</div>' +
                `<div class="pe-drawer-content" :class="['pe-'+direction]" :style="{'align-items': direction === 'v' ? alignHComp : alignVComp, 'justify-content': direction === 'v' ? alignVComp : alignHComp, 'gap': propNumber('gutter') ? (gutter + 'px') : '0'}" v-show="propBoolean('modelValue')">` +
                    '<slot></slot>' +
                '</div>' +
                `<div v-if="$slots['footer']" class="pe-drawer-footer" v-show="propBoolean('modelValue')">` +
                    '<slot name="footer"></slot>' +
                '</div>' +
            '</div>' +
        '</div>',
        'props': {
            'modelValue': {
                'default': false
            },
            'title': {
                'default': '',
            },
            'width': {
                'default': '35%',
            },

            'direction': {
                'default': 'h',
            },
            'gutter': {
                'default': '',
            },
            'alignH': {
                'default': undefined,
            },
            'alignV': {
                'default': undefined
            }
        },
        'computed': {
            ...tool.clone(common.computed),
            widthComp: function(this: types.IVue) {
                if (typeof this.$props.width === 'number') {
                    return this.$props.width.toString() + 'px';
                }
                return this.$props.width;
            }
        },
        'methods': {
            /** --- 关闭按钮 --- */
            closeClick: function(this: types.IVue) {
                this.$emit('update:modelValue', false);
            },
            click: function(this: types.IVue, e: MouseEvent): void {
                if (e.target !== this.$el) {
                    return;
                }
                this.$emit('update:modelValue', false);
            }
        }
    },
    'pe-tag': {
        'template': `<div class="pe-tag" :class="['pe-type-'+type, propBoolean('plain')&&'pe-plain', 'pe-size-' + size]" >` +
            `<slot></slot>` +
            `<svg v-if="propBoolean('close')" width="16" height="16" viewBox="0 0 24 24" stroke="none" @click="$emit('close')"><path d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z" /></svg>` +
            `</div>`,
        'emits': {
            'close': null
        },
        'props': {
            'type': {
                // --- default' | 'primary' | 'info' | 'warning' | 'danger' | 'cg' ---
                'default': 'default'
            },
            'plain': {
                'default': false
            },
            'size': {
                // --- 'm' | 'l' ---
                'default': 'm'
            },
            'close': {
                'default': false
            }
        },
        'computed': {
            ...tool.clone(common.computed),
        }
    },
    'pe-table': {
        'template': `<div class="pe-table" :class="[isAdaption&&'pe-adaption']">` +
            `<slot></slot>` +
        `</div>`,
        'data': function() {
            return {
                'controlName': 'table',
                'headCount': 0,
                'isAdaption': false,
            };
        }
    },
    'pe-table-row': {
        'template': `<div class="pe-table-row" :class="[isAdaption&&'pe-adaption',(index===0)&&'pe-table-header']" :style="{'--pe-cols': table?.headCount.toString()}">` +
            `<slot></slot>` +
        `</div>`,
        'data': function() {
            return {
                'controlName': 'table-row',
                'headCount': 0,
                'table': null,
                'index': -1
            };
        },
        'computed': {
            ...tool.clone(common.computed),
            'isAdaption': function() {
                return this.table?.isAdaption ?? false;
            }
        },
        methods: {
            updateHeadCount: function(this: types.IVue, o: '+' | '-') {
                if (o === '+') {
                    ++this.headCount;
                }
                else {
                    --this.headCount;
                }
                if (!this.table) {
                    this.table = this.parentByName('table');
                }
                if (this.index === -1) {
                    this.index = dom.index(this.$el);
                }
                // --- 一些参数 ---
                if (this.table) {
                    this.table.headCount = this.headCount;
                    this.table.isAdaption = this.$el.children.item(0)?.innerHTML ? false : true;
                }
            }
        },
        mounted: function(this: types.IVue) {
            const table = this.parentByName('table');
            if (table) {
                this.table = table;
            }
        }
    },
    'pe-table-head': {
        'template': `<div class="pe-table-head">` +
            `<slot></slot>` +
        `</div>`,
        'computed': {
            ...tool.clone(common.computed),
        },
        mounted: function() {
            const row = this.parentByName('table-row');
            if (row) {
                row.updateHeadCount('+');
            }
        },
        unmounted: function() {
            const row = this.parentByName('table-row');
            if (row) {
                row.updateHeadCount('-');
            }
        }
    },
    'pe-table-cell': {
        'template': `<div class="pe-table-cell">` +
            `<slot></slot>` +
        `</div>`,
    }
};
