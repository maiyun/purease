import * as purease from '../../purease.js';

export interface ISpaFooterVue extends purease.IVue {
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
