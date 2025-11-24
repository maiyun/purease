import * as purease from '../../purease.js';

export interface IDialogVue extends purease.IVue {
    /** --- 标题 --- */
    'title': string;
    /** --- 内容 --- */
    'content': string;
    /** --- 按钮列表，默认 ['OK'] --- */
    'buttons': string[];
    /** --- 是否显示，默认 false --- */
    'show': boolean;
}

export const code = {
    'template': '',
    'props': {
        'title': {
            'default': ''
        },
        'content': {
            'default': ''
        },
        'buttons': {
            'default': ['OK']
        },
        'show': {
            'default': false
        }
    },
    'emits': {
        'select': null
    },
};
