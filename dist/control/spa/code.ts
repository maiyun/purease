import * as purease from '../../purease';

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
    mounted: function(this: purease.IVue) {
        this.path = window.location.hash.slice(1);
        window.addEventListener('hashchange', () => {
            this.path = window.location.hash.slice(1);
        });
    },
};
