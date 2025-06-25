import * as types from '../../../types';

export const code = {
    'template': '',
    'emits': {
        'changed': null,
        'update:modelValue': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },
        'plain': {
            'default': false,
        },

        'modelValue': {
            'default': '',
        },
        'length': {
            'default': 6
        },
    },
    data: function() {
        return {
            'value': [],
        };
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.modelValue === this.value.join('')) {
                    return;
                }
                this.value.length = 0;
                for (const char of this.modelValue) {
                    if (this.value.length === this.length) {
                        break;
                    }
                    if (!/[0-9]/.test(char)) {
                        continue;
                    }
                    this.value.push(char);
                }
                const mv = this.value.join('');
                if (this.modelValue === mv) {
                    return;
                }
                this.$emit('update:modelValue', mv);
            },
            'immediate': true,
        },
    },
    'methods': {
        click: function(this: types.IVue, num: string) {
            if (this.value.length === this.length) {
                return;
            }
            this.value.push(num);
            const mv = this.value.join('');
            if (this.modelValue === mv) {
                return;
            }
            this.$emit('update:modelValue', mv);
        },
        back: function(this: types.IVue) {
            if (!this.value.length) {
                return;
            }
            this.value.pop();
            const mv = this.value.join('');
            if (this.modelValue === mv) {
                return;
            }
            this.$emit('update:modelValue', mv);
        },
    },
};
