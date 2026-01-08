import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface ISettingBlockVue extends lControl.IControlVue {
    /** --- 是否启用悬停效果，默认 false --- */
    'hover': boolean;
    /** --- 进入事件处理 --- */
    enter: (oe: PointerEvent) => void;
}

export const code = {
    'template': '',
    'props': {
        'hover': {
            'default': false,
        },
    },
    'methods': {
        enter: function(this: ISettingBlockVue, oe: PointerEvent) {
            purease.pointer.hover(oe, {
                enter: () => {
                    if (!this.propBoolean('hover')) {
                        return;
                    }
                    this.$el.classList.add('pe-hover');
                },
                leave: () => {
                    if (!this.propBoolean('hover')) {
                        return;
                    }
                    this.$el.classList.remove('pe-hover');
                },
            });
        },
    },
};
