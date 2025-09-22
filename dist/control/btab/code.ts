import * as lDom from '../../dom';
import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': 0
        },
        'data': {
            'default': [],
        },
        'type': {
            // --- default, plain, light ---
            'default': 'default',
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
        isScroll: function(this: purease.IVue): boolean {
            return this.cwidth > this.width;
        },
    },
    'methods': {
        select: function(this: purease.IVue, index: number) {
            this.index = index;
            this.$emit('modelValue', index);
        },
        down: function(this: purease.IVue, e: TouchEvent | MouseEvent) {
            if (lDom.hasTouchButMouse(e)) {
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
            lDom.bindDown(e, {
                move: (ne) => {
                    // --- 当前的位置 ---
                    const nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                    /** --- 移动的差值 --- */
                    const cx = nx - x;
                    x = nx;
                    this.translate += cx;
                    if (lDom.isRtl()) {
                        if (this.translate > this.max) {
                            this.translate = this.max;
                        }
                        else if (this.translate < 0) {
                            this.translate = 0;
                        }
                    }
                    else {
                        if (this.translate < -this.max) {
                            this.translate = -this.max;
                        }
                        else if (this.translate > 0) {
                            this.translate = 0;
                        }
                    }
                },
            });
        },
        resize: function(this: purease.IVue) {
            this.width = this.$el.offsetWidth;
            this.cwidth = this.$refs.content.offsetWidth;
            if (this.cwidth <= this.width) {
                this.max = 0;
                this.translate = 0;
                return;
            }
            this.max = this.cwidth - this.width;
            if (lDom.isRtl()) {
                if (this.translate > this.max) {
                    this.translate = this.max;
                }
                else if (this.translate < 0) {
                    this.translate = 0;
                }
            }
            else {
                if (this.translate < -this.max) {
                    this.translate = -this.max;
                }
                else if (this.translate > 0) {
                    this.translate = 0;
                }
            }
        },
    },
    mounted: function(this: purease.IVue) {
        this.$watch('modelValue', () => {
            this.index = this.$props.modelValue;
        }, {
            'immediate': true,
        });
        window.addEventListener('resize', this.resize);
        this.resize();
    },
    unmounted: async function(this: purease.IVue) {
        await this.$nextTick();
        window.removeEventListener('resize', this.resize);
    }
};
