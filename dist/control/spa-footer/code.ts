import * as lControl from '../../control.js';

export interface ISpaFooterVue extends lControl.IControlVue {
    /** --- 当前选中值 --- */
    'modelValue': string;
}

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': ''
        }
    }
};
