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
            'isFocus': false
        };
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (!this.$refs.input) {
                    return;
                }
                if (this.modelValue === this.$refs.input.value) {
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
                this.$refs.input.value = this.value.join('');
            },
            'immediate': true
        }
    },
    'methods': {
        input: function(this: types.IVue) {
            const value = this.$refs.input.value;
            this.value.length = 0;
            for (const char of value) {
                if (this.value.length === this.length) {
                    break;
                }
                if (!/[0-9]/.test(char)) {
                    continue;
                }
                this.value.push(char);
            }
            const mv = this.value.join('');
            if (this.$refs.input.value !== mv) {
                this.$refs.input.value = mv;
            }
            this.$emit('update:modelValue', mv);
        }
    },
};
