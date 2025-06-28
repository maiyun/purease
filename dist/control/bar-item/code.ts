import * as dom from '../../dom';
import * as types from '../../../types';

export const code = {
    'template': '',
    'props': {
        'href': {
            'default': undefined
        }
    },
    'data': function() {
        return {
            'menuCount': 0,
            'hover': false,
        };
    },
    'methods': {
        enter: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            const target = e.target as HTMLElement;
            if (target.classList.contains('pe-menu') || dom.findParentByClass(target, 'pe-menu')) {
                return;
            }
            if (!this.href) {
                e.preventDefault();
            }
            this.hover = !this.hover;
        },
        leave: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            this.hover = false;
        },
    },
};
