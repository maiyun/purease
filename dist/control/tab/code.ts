import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'data': function() {
        return {
            'selected': 0,
            'tabItemWidth': 0,
            'tabItemLeft': 0,
        };
    },
    'props': {
        'modelValue': {
            'default': 0
        },
        'type': {
            // --- default, plain, light, rect ---
            'default': 'default',
        },
    },
    'watch': {
        'selected': {
            handler: function(this: purease.IVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.$emit('update:modelValue', this.selected);
            }
        },
        'modelValue': {
            handler: function(this: purease.IVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.selected = this.modelValue;
            },
            'immediate': true
        }
    }
};
