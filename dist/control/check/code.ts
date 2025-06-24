import * as dom from '../../dom';
import * as types from '../../../types';

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': false
        }
    },
    'data': function() {
        return {
            'value': false
        };
    },
    'methods': {
        click: function(this: types.IVue, e: MouseEvent) {
            const target = e.target as HTMLElement | null;
            if (!target) {
                return;
            }
            if (target.tagName.toLowerCase() === 'a') {
                return;
            }
            if (dom.findParentByTag(target, 'a')) {
                return;
            }
            this.value = !this.value;
            this.$emit('update:modelValue', this.value);
        },
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                this.value = this.modelValue;
            },
            'immediate': true
        }
    },
};
