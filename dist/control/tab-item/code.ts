import * as lDom from '../../dom';
import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'data': function() {
        return {
            'index': 0
        };
    },
    'computed': {
        isSelected: function(this: purease.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.selected === this.index;
        }
    },
    'methods': {
        hover: function(this: purease.IVue, e: MouseEvent | TouchEvent) {
            if (!this.$parent) {
                return;
            }
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            this.$parent.selected = this.index;
            this.resize();
        },
        resize: function(this: purease.IVue) {
            if (!this.$parent) {
                return;
            }
            if (this.$parent.type !== 'rect') {
                return;
            }
            this.$parent.tabItemWidth = this.$el.offsetWidth;
            this.$parent.tabItemLeft = this.$el.offsetLeft;
        }
    },
    mounted: function(this: purease.IVue) {
        if (!this.$parent) {
            return;
        }
        if (this.$parent.selected === undefined) {
            return;
        }
        this.index = lDom.index(this.$el);
        if (this.index === this.$parent.selected) {
            this.resize();
        }
    },
};
