import * as purease from '../../purease.js';
import * as lDom from '../../dom.js';

export const code = {
    'template': '',
    'props': {
        'type': {
            'default': ''
        },
        'direction': {
            'default': 'h'
        },
        // --- right 的 gap ---
        'gap': {
            'default': ''
        },
        'alignH': {
            'default': undefined
        },
        'alignV': {
            'default': 'center'
        },
        'hover': {
            'default': false
        },
        'nopadding': {
            'default': false
        },
        // --- 顶层的默认 gap 去除 ---
        'nogap': {
            'default': false
        },

        'title': {
            'default': ''
        },
        'note': {
            'default': ''
        },
    },
    'methods': {
        enter: function(this: purease.IVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            this.$el.classList.add('pe-hover');
        },
        leave: function(this: purease.IVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            this.$el.classList.remove('pe-hover');
        },
    },
};
