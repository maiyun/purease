import * as types from '../../../types';

export const code = {
    'template': '',
    'methods': {
        'leftClick': function(this: types.IVue, e: MouseEvent) {
            if (!(e.target as HTMLElement).classList.contains('pe-lnav-left')) {
                return;
            }
            this.$refs.left.classList.remove('pe-show');
        }
    },
};
