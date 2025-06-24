import * as tool from '../../tool';
import * as dom from '../../dom';
import * as types from '../../../types';

export const code = {
    'template': '',
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
        },
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
    mounted: function(this: types.IVue) {
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
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        window.removeEventListener('resize', this.resize);
        if (!this.timer) {
            return;
        }
        clearTimeout(this.timer);
    }
};
