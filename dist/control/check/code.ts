import * as lDom from '../../dom';
import * as lControl from '../../control.js';

export interface ICheckVue extends lControl.IControlVue {
    /** --- 选中状态，默认 false --- */
    'modelValue': boolean;
    /** --- 布局流向，默认 h --- */
    'direction': 'h' | 'v';
    /** --- 内部选中状态，默认 false --- */
    'value': boolean;
    /** --- 点击事件 --- */
    click: (e: MouseEvent) => void;
}

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': false
        },
        'direction': {
            'default': 'h',
        }
    },
    'data': function() {
        return {
            'value': false
        };
    },
    'methods': {
        click: function(this: ICheckVue, e: MouseEvent) {
            const target = e.target as HTMLElement | null;
            if (!target) {
                return;
            }
            if (target.tagName.toLowerCase() === 'a') {
                return;
            }
            if (lDom.findParentByTag(target, 'a')) {
                return;
            }
            this.value = !this.value;
            this.$emit('update:modelValue', this.value);
        },
    },
    'watch': {
        'modelValue': {
            handler: function(this: ICheckVue) {
                this.value = this.modelValue;
            },
            'immediate': true
        }
    },
};
