import * as purease from '../../purease.js';
import * as lDom from '../../dom.js';

export const code = {
    'template': '',
    'props': {
        'hover': {
            'default': false,
        },
    },
    'methods': {
        enter: function(this: purease.IVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            if (!this.propBoolean('hover')) {
                return;
            }
            this.$el.classList.add('pe-hover');
        },
        leave: function(this: purease.IVue, e: MouseEvent | TouchEvent) {
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
