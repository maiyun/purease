import * as purease from '../../purease';

export interface ISpaVue extends purease.IVue {
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 是否全屏显示，默认 false --- */
    'full': boolean;
    /** --- 当前路径 --- */
    'path': string;
}

export const code = {
    'template': '',
    'props': {
        'plain': {
            'default': false,
        },
        /** --- 全屏 --- */
        'full': {
            'default': false,
        },
    },
    'data': function() {
        return {
            'path': '',
        };
    },
    mounted: function(this: ISpaVue) {
        this.path = window.location.hash.slice(1);
        window.addEventListener('hashchange', () => {
            this.path = window.location.hash.slice(1);
        });
    },
};
