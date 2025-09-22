import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'methods': {
        'leftClick': function(this: purease.IVue, e: MouseEvent) {
            if (!(e.target as HTMLElement).classList.contains('pe-lnav-left')) {
                return;
            }
            this.$refs.left.classList.remove('pe-show');
        }
    },
};
