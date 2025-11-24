import * as purease from '../../purease.js';

export interface ITabVue extends purease.IVue {
    /** --- 当前选中索引 --- */
    'modelValue': number;
    /** --- 类型样式，默认 default --- */
    'type': 'default' | 'plain' | 'light' | 'rect';
    /** --- 是否悬停切换，默认 false --- */
    'hover': boolean;
    /** --- 内部选中索引 --- */
    'selected': number;
    /** --- tab 项宽度 --- */
    'tabItemWidth': number;
    /** --- tab 项左侧位置 --- */
    'tabItemLeft': number;
}

export const code = {
    'template': '',
    'data': function() {
        return {
            'selected': 0,
            'tabItemWidth': 0,
            'tabItemLeft': 0,
        };
    },
    'props': {
        'modelValue': {
            'default': 0
        },
        'type': {
            // --- default, plain, light, rect ---
            'default': 'default',
        },
        'hover': {
            'default': false,
        }
    },
    'watch': {
        'selected': {
            handler: function(this: ITabVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.$emit('update:modelValue', this.selected);
            }
        },
        'modelValue': {
            handler: function(this: ITabVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.selected = this.modelValue;
            },
            'immediate': true
        }
    }
};
