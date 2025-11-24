import * as purease from '../../purease.js';

export interface ISettingVue extends purease.IVue {
    /** --- 类型 --- */
    'type': string;
    /** --- 是否启用悬停效果，默认 false --- */
    'hover': boolean;
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 是否为亮色风格，默认 false --- */
    'light': boolean;
}

export const code = {
    'template': '',
    'props': {
        'type': {
            'default': ''
        },
        'hover': {
            'default': false,
        },
        'plain': {
            'default': false,
        },
        'light': {
            'default': false,
        },
    },
};
