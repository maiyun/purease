import * as purease from '../../purease.js';

export interface IBannerVue extends purease.IVue {
    /** --- 布局流向，默认 h --- */
    'direction': 'h' | 'v';
}

export const code = {
    'template': '',
    'props': {
        'direction': {
            'default': 'h'
        },
    },
};
