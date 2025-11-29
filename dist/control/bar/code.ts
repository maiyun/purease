import * as lControl from '../../control.js';

export interface IBarVue extends lControl.IControlVue {
    /** --- logo 图地址 --- */
    'logoHref': string;
    /** --- 主题风格，默认 default --- */
    'theme': 'default' | 'dark';
}

export const code = {
    'template': '',
    'props': {
        'logoHref': {
            'default': ''
        },
        'theme': {
            'default': 'default'
        },
    }
};
