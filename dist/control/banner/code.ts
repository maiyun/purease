import * as lControl from '../../control.js';

export interface IBannerVue extends lControl.IControlVue {
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
