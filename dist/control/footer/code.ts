import * as lControl from '../../control.js';

export interface IFooterVue extends lControl.IControlVue {
    /** --- 暗色主题，默认 false --- */
    'dark': boolean;
}

export const code = {
    'template': '',
    'props': {
        'dark': {
            'default': false,
        }
    },
};
