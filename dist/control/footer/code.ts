import * as purease from '../../purease.js';

export interface IFooterVue extends purease.IVue {
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
