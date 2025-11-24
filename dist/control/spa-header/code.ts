import * as purease from '../../purease.js';

export interface ISpaHeaderVue extends purease.IVue {
    /** --- 是否显示返回按钮，默认 false --- */
    'back': boolean;
    /** --- 备注文本 --- */
    'note': string;
    /** --- 返回按钮点击事件 --- */
    backClick: () => void;
}

export const code = {
    'template': '',
    'props': {
        'back': {
            'default': false,
        },
        'note': {
            'default': '',
        },
    },
    'methods': {
        backClick: function() {
            // --- 返回按钮 ---
            window.history.back();
        },
    },
};
