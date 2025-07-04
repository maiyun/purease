import * as types from '../../../types';

export const code = {
    'template': '',
    'data': function() {
        return {
            'selected': 0
        };
    },
    'props': {
        'modelValue': {
            'default': 0
        },
        'plain': {
            'default': false,
        }
    },
    'watch': {
        'selected': {
            handler: function(this: types.IVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.$emit('update:modelValue', this.selected);
            }
        },
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.selected = this.modelValue;
            },
            'immediate': true
        }
    }
};
