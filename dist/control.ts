import * as purease from './index';
import * as tool from './tool';
import * as types from '../types';
import * as dom from './dom';

export const list: Record<string, any> = {
    'pe-header': {
        'template': `<div class="pe-header" :class="[propBoolean('fixed')&&'pe-fixed','pe-theme-'+theme]">` +
            '<a class="pe-logo" :href="logoHref"></a>' +
            `<div class="pe-nav" :class="[headerPop&&'pe-show']">` +
                '<div class="pe-nav-left">' +
                    '<slot></slot>' +
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
            'propBoolean': {
                get: function(this: types.IVue) {
                    return (name: string): boolean => {
                        return tool.getBoolean(this.$props[name]);
                    };
                }
            },
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
    'pe-footer': {
        'template': '<div class="pe-footer">' +
            '<div class="pe-footer-content">' +
                '<slot></slot>' +
            '</div>' +
            `<div v-if="$slots['bottom']" class="pe-footer-bottom">` +
                '<slot name="bottom"></slot>' +
            '</div>' +
        '</div>'
    },
    'pe-header-item': {
        'props': {
            'href': {
                'default': undefined
            }
        },
        'data': function() {
            return {
                'menuCount': 0
            };
        },
        'template': `<a class="pe-header-item" :href="href" :class="[menuCount&&'pe-list']">` +
            '<slot></slot>' +
        '</a>'
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
        'props': {
            'href': {
                'default': undefined
            }
        },
        'template': '<a class="pe-menu-item" :href="href">' +
            '<slot></slot>' +
        '</a>',
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
        }
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
        'props': {
            'modelValue': {
                'default': ''
            }
        },
        'data': function() {
            return {
                'focus': false
            };
        },
        'template': `<div class="pe-text" :class="[focus&&'pe-focus']">` +
            `<div v-if="$slots['before']" class="pe-before"><slot name="before"></slot></div>` +
            `<div v-if="$slots['prepend']" class="pe-prepend">` +
                '<slot name="prepend"></slot>' +
            '</div>' +
            `<input :value="modelValue" @input="$emit('update:modelValue',$event.target.value)" @focus="focus=true" @blur="focus=false">` +
            `<div v-if="$slots['append']" class="pe-append">` +
                '<slot name="append"></slot>' +
            '</div>' +
            `<div v-if="$slots['after']" class="pe-after"><slot name="after"></slot></div>` +
        '</div>'
    },
    'pe-select': {
        'props': {
            'modelValue': {
                'default': ''
            },
            'data': {
                'default': []
            },
            'disabled': {
                'default': false
            }
        },
        'emits': {
            'index': null,
            'update:modelValue': null
        },
        'data': function() {
            return {
                'index': 0
            };
        },
        'methods': {
            open: function(this: types.IVue) {
                dom.showPop(this.$refs.pop);
            },
            click: function(this: types.IVue, index: number) {
                this.index = index;
                this.$emit('update:modelValue', this.dataComp[index].value);
                this.$emit('index', index);
                dom.hidePop();
            }
        },
        'computed': {
            'propBoolean': {
                get: function(this: types.IVue) {
                    return (name: string): boolean => {
                        return tool.getBoolean(this.$props[name]);
                    };
                }
            },
            'dataComp': function(this: types.IVue) {
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
            }
        },
        'template': `<div class="pe-select" :tabindex="!propBoolean('disabled') ? '0' : undefined" :data-pe-disabled="propBoolean('disabled') ? '' : undefined">` +
            `<div class="pe-select-label" @click="open">{{dataComp[index] ? dataComp[index].label : '　'}}</div>` +
            '<div class="pe-select-arrow" @click="open"></div>' +
            '<div class="pe-pop" ref="pop">' +
                `<div v-for="item, i of dataComp" class="pe-select-item" :class="[(index===i)&&'pe-selected']" @click="click(i)">{{item.label}}</div>` +
            '</div>' +
        '</div>',
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
        'template': '<div class="pe-swipe">' +
            `<div class="pe-swipe-wrap" ref="wrap" @mousedown="down" @touchstart="down">` +
                '<slot></slot>' +
            '</div>' +
            '<div class="pe-swipe-page">' +
                `<div v-for="i of itemCount" class="pe-swipe-page-item" :class="[(selected===i-1)&&'pe-selected']"></div>` +
            '</div>' +
            '<div v-if="itemCount > 1" class="pe-swipe-prev" @click="prev"></div>' +
            '<div v-if="itemCount > 1" class="pe-swipe-next" @click="next"></div>' +
        '</div>',
        data: function() {
            return {
                /** --- 总数 --- */
                'itemCount': 0,
                /** --- 当前显示中的 swipe --- */
                'selected': 0,
                /** --- 自动滚动的 timer  --- */
                'timer': null,

                /** --- 当前 swipe 的位置 --- */
                'translate': 0,
                /** --- 当前 swipe 的宽度 --- */
                'width': 0
            };
        },
        'computed': {
            /** --- 总宽度 --- */
            awidth: function(this: types.IVue) {
                return this.width * this.itemCount;
            }
        },
        methods: {
            down: function(this: types.IVue, e: TouchEvent | MouseEvent) {
                if (this.itemCount < 2) {
                    return;
                }
                /** --- 当前 swipe 的宽度 --- */
                this.width = this.$el.offsetWidth;
                /** --- 原始 x 位置 --- */
                let ox = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
                /** --- 上次的 x 位置 --- */
                let x = ox;
                const time = Date.now();
                dom.bindDown(e, {
                    move: (ne) => {
                        // --- 当前的位置 ---
                        let nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                        /** --- 移动的差值 --- */
                        let cx = nx - x;
                        x = nx;
                        this.translate += cx;
                        if (this.translate > this.width) {
                            this.translate = this.width;
                        }
                        else if (this.translate < -this.awidth) {
                            this.translate = -this.awidth;
                        }
                        this.$refs.wrap.style.transform = 'translateX(' + this.translate + 'px)';
                    },
                    end: async (ne) => {
                        let nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                        let cx = nx - ox;
                        let speed = Math.abs(cx / (Date.now() - time));
                        /** --- 看看当前滚动哪儿了 --- */
                        const info = -(this.translate / this.width);
                        /** --- 当前的位置 --- */
                        const index = Math.floor(info);
                        /** --- 当前的小数 --- */
                        const dec = tool.getDecimal(info);
                        if (speed > 0.6) {
                            // --- 速度很快，一定到下一条 ---
                                // --- cx 大于 0 为向左滑动 ---
                            this.go(cx > 0 ? index : index + 1);
                            return;
                        }
                        // --- 速度很慢，根据位置选择显示 ---
                        if (index >= 0) {
                            this.go(dec >= 0.5 ? index + 1 : index);
                        }
                        else {
                            this.go(dec >= -0.5 ? index + 1 : index);
                        }
                    }
                });
            },
            prev: async function(this: types.IVue) {
                this.translate += 10;
                this.go(this.selected - 1);
            },
            next: async function(this: types.IVue) {
                this.translate -= 10;
                this.go(this.selected + 1);
            },
            go: async function(this: types.IVue, index: number) {
                this.$refs.wrap.style.transition = 'var(--pe-transition)';
                // --- 设置允许缓动 ---
                await tool.sleep(34);
                this.selected = index;
                if (this.selected === -1) {
                    this.selected = this.itemCount - 1;
                }
                else if (this.selected === this.itemCount) {
                    this.selected = 0;
                }
                this.$refs.wrap.style.transform = 'translateX(' + (-(index * this.width)).toString() + 'px)';
                // --- 应用缓动后等待动画执行完成 ---
                await tool.sleep(334);
                this.$refs.wrap.style.transition = '';
                await tool.sleep(34);
                // --- 移除缓动效果后重置位置 ---
                this.translate = -(index * this.width);
                if (index === -1) {
                    this.translate = -(this.itemCount - 1) * this.width;
                }
                else if (index === this.itemCount) {
                    this.translate = 0;
                }
                this.$refs.wrap.style.transform = 'translateX(' + this.translate + 'px)';
            }
        },
        mounted: function() {
            this.width = this.$el.offsetWidth;
            this.timer = setTimeout(() => {

            }, 3000);
        },
        unmounted: async function() {
            await this.$nextTick();
            if (!this.timer) {
                return;
            }
            clearTimeout(this.timer);
        }
    },
    'pe-swipe-item': {
        'template': `<div class="pe-swipe-item" :class="['pe-direction-'+direction]" :style="{'left': left + 'px'}">` +
            '<slot></slot>' +
        '</div>',
        'props': {
            'direction': {
                'default': 'h'
            }
        },
        'computed': {
            left: function(this: types.IVue) {
                let left = this.width * this.index;
                if (this.translate > 0) {
                    if (this.index === this.itemCount - 1) {
                        // --- 最后一个 ---
                        left = -this.width;
                    }
                }
                else if (this.translate < -this.awidth + this.width) {
                    if (this.index === 0) {
                        // --- 第一个 ---
                        left = this.awidth;
                    }
                }
                return left;
            },
            width: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.width;
            },
            awidth: function(this: types.IVue) {
                return this.width * this.itemCount;
            },
            translate: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.translate;
            },
            itemCount: function(this: types.IVue) {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.itemCount;
            }
        },
        'data': function() {
            return {
                'index': 0
            };
        },
        mounted: async function(this: types.IVue) {
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
    }
};
