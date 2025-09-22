import * as lDom from '../../dom';
import * as purease from '../../purease.js';

export const code = {
    'template': '',
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
        barWidth: function(this: purease.IVue) {
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
        barLeft: function(this: purease.IVue) {
            return this.pos[0];
        }
    },
    methods: {
        down: function(this: purease.IVue, e: TouchEvent | MouseEvent, i: number) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            const bcr = this.$el.getBoundingClientRect();
            /** --- slider 的宽度 --- */
            const width = bcr.width;
            const left = bcr.left;
            lDom.bindDown(e, {
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
            handler: function(this: purease.IVue) {
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
};
