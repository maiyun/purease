import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'props': {
        'title': {
            'default': '',
        },
        'modelValue': {
            'default': '',
        },
        'value': {
            'default': '',
        },
    },
    'methods': {
        'click': function(this: purease.IVue) {
            this.$emit('update:modelValue', this.value);
        },
    }
};
