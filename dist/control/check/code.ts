import * as lDom from '../../dom';
import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface ICheckVue extends lControl.IControlVue {
    /** --- 选中状态，默认 false --- */
    'modelValue': boolean;
    /** --- 布局流向，默认 h --- */
    'direction': 'h' | 'v';
    /** --- 内部选中状态，默认 false --- */
    'value': boolean;
    /** --- 按下事件 --- */
    down: (e: PointerEvent) => void;
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
        down: function(this: ICheckVue, oe: PointerEvent) {
            purease.pointer.click(oe, e => {
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
            });
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
