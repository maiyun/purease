import * as lControl from '../../control.js';

export interface ISpaFooterIconVue extends lControl.IControlVue {
    /** --- 标题 --- */
    'title': string;
    /** --- 当前选中值 --- */
    'modelValue': string;
    /** --- 当前图标的值 --- */
    'value': string;
    /** --- 点击事件 --- */
    click: () => void;
}

export const code = {
    'template': '',
    'props': {
        'title': {
            'default': '',
        },
        'modelValue': {
            'default': '',
        },
        'value': {
            'default': '',
        },
    },
    'methods': {
        'click': function(this: ISpaFooterIconVue) {
            this.$emit('update:modelValue', this.value);
        },
    }
};
