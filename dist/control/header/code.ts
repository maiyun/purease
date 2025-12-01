import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface IHeaderVue extends lControl.IControlVue {
    /** --- logo 图地址 --- */
    'logoHref': string;
    /** --- 是否固定定位，默认 false --- */
    'fixed': boolean;
    /** --- 主题风格，默认 default --- */
    'theme': 'default' | 'rev';
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
    },
    'methods': {
        /** --- 切换头部弹出状态 --- */
        'toggleHeaderPop': function(this: IHeaderVue) {
            this.headerPop = !this.headerPop;
            document.getElementsByTagName('html')[0].classList.toggle('pe-header-pop', this.headerPop);
        }
    }
};
