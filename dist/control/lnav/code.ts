import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface ILnavVue extends lControl.IControlVue {
    /** --- 左侧点击事件 --- */
    leftDown: (e: PointerEvent) => void;
}

export const code = {
    'template': '',
    'methods': {
        'leftDown': function(this: ILnavVue, oe: PointerEvent) {
            purease.pointer.click(oe, e => {
                if (!(e.target as HTMLElement).classList.contains('pe-lnav-left')) {
                    return;
                }
                this.$refs.left.classList.remove('pe-show');
            });
        }
    },
};
