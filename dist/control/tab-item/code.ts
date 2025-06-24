import * as dom from '../../dom';
import * as types from '../../../types';

export const code = {
    'template': '',
    'data': function() {
        return {
            'index': 0
        };
    },
    'computed': {
        isSelected: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.selected === this.index;
        }
    },
    'methods': {
        hover: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (!this.$parent) {
                return;
            }
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            this.$parent.selected = this.index;
        }
    },
    mounted: function(this: types.IVue) {
        if (!this.$parent) {
            return;
        }
        if (this.$parent.selected === undefined) {
            return;
        }
        this.index = dom.index(this.$el);
    },
};
