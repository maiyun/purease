import * as lControl from '../../control.js';

export interface ITagVue extends lControl.IControlVue {
    /** --- 类型样式，默认 default --- */
    'type': 'default' | 'primary' | 'info' | 'warning' | 'danger' | 'pe';
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 尺寸大小，默认 m --- */
    'size': 'xs' | 's' | 'm' | 'l';
    /** --- 是否显示关闭按钮，默认 false --- */
    'close': boolean;
}

export const code = {
    'template': '',
    'emits': {
        'close': null
    },
    'props': {
        'type': {
            // --- default' | 'primary' | 'info' | 'warning' | 'danger' | 'pe' ---
            'default': 'default'
        },
        'plain': {
            'default': false
        },
        'size': {
            // --- 'xs', 's', 'm', 'l' ---
            'default': 'm'
        },
        'close': {
            'default': false
        }
    },
};
