import * as dom from '../../dom';
import * as types from '../../../types';

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': 0
        },
        'data': {
            'default': [],
        },
        'plain': {
            'default': false,
        },
    },
    data: function() {
        return {
            /** --- 当前位置 --- */
            'translate': 0,
            /** --- 当前选中 --- */
            'index': 0,
            /** --- 最大位移 --- */
            'max': 0,
            /** --- 全宽 --- */
            'width': 0,
            /** --- 内容宽 --- */
            'cwidth': 0,
        };
    },
    'computed': {
        isScroll: function(this: types.IVue): boolean {
            return this.cwidth > this.width;
        },
    },
    'methods': {
        select: function(this: types.IVue, index: number) {
            this.index = index;
            this.$emit('modelValue', index);
        },
        down: function(this: types.IVue, e: TouchEvent | MouseEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            if (this.cwidth <= this.width) {
                return;
            }
            /** --- 最大能滚动 --- */
            const target = e.target as HTMLElement | null;
            if (!target) {
                return;
            }
            /** --- 原始 x 位置 --- */
            const ox = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
            /** --- 上次的 x 位置 --- */
            let x = ox;
            dom.bindDown(e, {
                move: (ne) => {
                    // --- 当前的位置 ---
                    const nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                    /** --- 移动的差值 --- */
                    const cx = nx - x;
                    x = nx;
                    this.translate += cx;
                    if (this.translate < -this.max) {
                        this.translate = -this.max;
                    }
                    else if (this.translate > 0) {
                        this.translate = 0;
                    }
                },
            });
        },
        resize: function(this: types.IVue) {
            this.width = this.$el.offsetWidth;
            this.cwidth = this.$refs.content.offsetWidth;
            if (this.cwidth <= this.width) {
                this.max = 0;
                this.translate = 0;
                return;
            }
            this.max = this.cwidth - this.width;
            if (this.translate < -this.max) {
                this.translate = -this.max;
            }
            else if (this.translate > 0) {
                this.translate = 0;
            }
        },
    },
    mounted: function(this: types.IVue) {
        this.$watch('modelValue', () => {
            this.index = this.$props.modelValue;
        }, {
            'immediate': true,
        });
        window.addEventListener('resize', this.resize);
        this.resize();
    },
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        window.removeEventListener('resize', this.resize);
    }
};
