import * as lControl from '../../control.js';
import * as lDom from '../../dom.js';

export interface ISettingBlockVue extends lControl.IControlVue {
    /** --- 是否启用悬停效果，默认 false --- */
    'hover': boolean;
    /** --- 鼠标进入事件处理 --- */
    enter: (e: MouseEvent | TouchEvent) => void;
    /** --- 鼠标离开事件处理 --- */
    leave: (e: MouseEvent | TouchEvent) => void;
}

export const code = {
    'template': '',
    'props': {
        'hover': {
            'default': false,
        },
    },
    'methods': {
        enter: function(this: ISettingBlockVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            if (!this.propBoolean('hover')) {
                return;
            }
            this.$el.classList.add('pe-hover');
        },
        leave: function(this: ISettingBlockVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            if (!this.propBoolean('hover')) {
                return;
            }
            this.$el.classList.remove('pe-hover');
        },
    },
};
