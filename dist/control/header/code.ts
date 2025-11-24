import * as purease from '../../purease.js';

export interface IHeaderVue extends purease.IVue {
    /** --- logo 图地址 --- */
    'logoHref': string;
    /** --- 是否固定定位，默认 false --- */
    'fixed': boolean;
    /** --- 主题风格，默认 default --- */
    'theme': 'default' | 'dark';
    /** --- 是否显示底部线条，默认 false --- */
    'line': boolean;
    /** --- 头部弹出状态 --- */
    'headerPop': boolean;
}

export const code = {
    'template': '',
    'props': {
        'logoHref': {
            'default': '',
        },
        'fixed': {
            'default': false,
        },
        'theme': {
            'default': 'default',
        },
        'line': {
            'default': false,
        }
    },
    'computed': {
        'headerPop': {
            get: function() {
                return purease.global.headerPop;
            },
            set: function(v: boolean) {
                purease.global.headerPop = v;
            }
        }
    }
};
