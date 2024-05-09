"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const purease = __importStar(require("./index"));
const tool = __importStar(require("./tool"));
const dom = __importStar(require("./dom"));
exports.list = {
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
                get: function () {
                    return (name) => {
                        return tool.getBoolean(this.$props[name]);
                    };
                }
            },
            'headerPop': {
                get: function () {
                    return purease.global.headerPop;
                },
                set: function (v) {
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
        'data': function () {
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
        mounted: function () {
            if (this.$parent.menuCount === undefined) {
                return;
            }
            ++this.$parent.menuCount;
        },
        unmounted: function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.$nextTick();
                if (this.$parent.menuCount === undefined) {
                    return;
                }
                --this.$parent.menuCount;
            });
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
        'data': function () {
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
        'data': function () {
            return {
                'index': 0
            };
        },
        'methods': {
            open: function () {
                dom.showPop(this.$refs.pop);
            },
            click: function (index) {
                this.index = index;
                this.$emit('update:modelValue', this.dataComp[index].value);
                this.$emit('index', index);
                dom.hidePop();
            }
        },
        'computed': {
            'propBoolean': {
                get: function () {
                    return (name) => {
                        return tool.getBoolean(this.$props[name]);
                    };
                }
            },
            'dataComp': function () {
                var _a, _b, _c, _d;
                const ds = [];
                for (const item of this.$props.data) {
                    if (typeof item === 'string') {
                        ds.push({
                            'label': item,
                            'value': item
                        });
                        continue;
                    }
                    ds.push({
                        'label': (_b = (_a = item.label) !== null && _a !== void 0 ? _a : item.value) !== null && _b !== void 0 ? _b : '',
                        'value': (_d = (_c = item.value) !== null && _c !== void 0 ? _c : item.label) !== null && _d !== void 0 ? _d : ''
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
                handler: function () {
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
        data: function () {
            return {
                'itemCount': 0,
                'selected': 0,
                'timer': null,
                'translate': 0,
                'width': 0
            };
        },
        'computed': {
            awidth: function () {
                return this.width * this.itemCount;
            }
        },
        methods: {
            down: function (e) {
                if (this.itemCount < 2) {
                    return;
                }
                this.width = this.$el.offsetWidth;
                let ox = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
                let x = ox;
                const time = Date.now();
                dom.bindDown(e, {
                    move: (ne) => {
                        let nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
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
                    end: (ne) => __awaiter(this, void 0, void 0, function* () {
                        let nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                        let cx = nx - ox;
                        let speed = Math.abs(cx / (Date.now() - time));
                        const info = -(this.translate / this.width);
                        const index = Math.floor(info);
                        const dec = tool.getDecimal(info);
                        if (speed > 0.6) {
                            this.go(cx > 0 ? index : index + 1);
                            return;
                        }
                        if (index >= 0) {
                            this.go(dec >= 0.5 ? index + 1 : index);
                        }
                        else {
                            this.go(dec >= -0.5 ? index + 1 : index);
                        }
                    })
                });
            },
            prev: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    this.translate += 10;
                    this.go(this.selected - 1);
                });
            },
            next: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    this.translate -= 10;
                    this.go(this.selected + 1);
                });
            },
            go: function (index) {
                return __awaiter(this, void 0, void 0, function* () {
                    this.$refs.wrap.style.transition = 'var(--pe-transition)';
                    yield tool.sleep(34);
                    this.selected = index;
                    if (this.selected === -1) {
                        this.selected = this.itemCount - 1;
                    }
                    else if (this.selected === this.itemCount) {
                        this.selected = 0;
                    }
                    this.$refs.wrap.style.transform = 'translateX(' + (-(index * this.width)).toString() + 'px)';
                    yield tool.sleep(334);
                    this.$refs.wrap.style.transition = '';
                    yield tool.sleep(34);
                    this.translate = -(index * this.width);
                    if (index === -1) {
                        this.translate = -(this.itemCount - 1) * this.width;
                    }
                    else if (index === this.itemCount) {
                        this.translate = 0;
                    }
                    this.$refs.wrap.style.transform = 'translateX(' + this.translate + 'px)';
                });
            }
        },
        mounted: function () {
            this.width = this.$el.offsetWidth;
            this.timer = setTimeout(() => {
            }, 3000);
        },
        unmounted: function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.$nextTick();
                if (!this.timer) {
                    return;
                }
                clearTimeout(this.timer);
            });
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
            left: function () {
                let left = this.width * this.index;
                if (this.translate > 0) {
                    if (this.index === this.itemCount - 1) {
                        left = -this.width;
                    }
                }
                else if (this.translate < -this.awidth + this.width) {
                    if (this.index === 0) {
                        left = this.awidth;
                    }
                }
                return left;
            },
            width: function () {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.width;
            },
            awidth: function () {
                return this.width * this.itemCount;
            },
            translate: function () {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.translate;
            },
            itemCount: function () {
                if (!this.$parent) {
                    return 0;
                }
                return this.$parent.itemCount;
            }
        },
        'data': function () {
            return {
                'index': 0
            };
        },
        mounted: function () {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.$parent) {
                    return;
                }
                if (this.$parent.itemCount === undefined) {
                    return;
                }
                ++this.$parent.itemCount;
                this.index = dom.index(this.$el);
            });
        },
        unmounted: function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.$nextTick();
                if (!this.$parent) {
                    return;
                }
                if (this.$parent.itemCount === undefined) {
                    return;
                }
                --this.$parent.itemCount;
            });
        }
    }
};
