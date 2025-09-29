import * as lDom from '../../dom';
import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': false
        },
        'direction': {
            'default': 'h',
        }
    },
    'data': function() {
        return {
            'value': false
        };
    },
    'methods': {
        click: function(this: purease.IVue, e: MouseEvent) {
            const target = e.target as HTMLElement | null;
            if (!target) {
                return;
            }
            if (target.tagName.toLowerCase() === 'a') {
                return;
            }
            if (lDom.findParentByTag(target, 'a')) {
                return;
            }
            this.value = !this.value;
            this.$emit('update:modelValue', this.value);
        },
    },
    'watch': {
        'modelValue': {
            handler: function(this: purease.IVue) {
                this.value = this.modelValue;
            },
            'immediate': true
        }
    },
};
