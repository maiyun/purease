import * as purease from '../../purease.js';

export interface ILnavVue extends purease.IVue {
    /** --- 左侧点击事件 --- */
    leftClick: (e: MouseEvent) => void;
}

export const code = {
    'template': '',
    'methods': {
        'leftClick': function(this: ILnavVue, e: MouseEvent) {
            if (!(e.target as HTMLElement).classList.contains('pe-lnav-left')) {
                return;
            }
            this.$refs.left.classList.remove('pe-show');
        }
    },
};
