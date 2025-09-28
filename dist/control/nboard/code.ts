import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'button': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },
        'plain': {
            'default': false,
        },
        'custom': {
            'default': '',
        },
        'buttons': {
            'default': [],
        },

        'modelValue': {
            'default': '',
        },
        'length': {
            'default': 6
        },
        'split': {
            'default': false,
        },
    },
    data: function() {
        return {
            'value': [],
        };
    },
    'watch': {
        'modelValue': {
            handler: function(this: purease.IVue) {
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
                this.$emit('changed');
            },
            'immediate': true,
        },
    },
    'methods': {
        click: function(this: purease.IVue, num: string) {
            if (num === '') {
                return;
            }
            if (this.value.length === this.length) {
                return;
            }
            this.value.push(num);
            const mv = this.value.join('');
            if (this.modelValue === mv) {
                return;
            }
            this.$emit('update:modelValue', mv);
            this.$emit('changed');
        },
        buttonClick: function(this: purease.IVue, item: string) {
            this.$emit('button', item);
        },
        back: function(this: purease.IVue) {
            if (!this.value.length) {
                return;
            }
            this.value.pop();
            const mv = this.value.join('');
            if (this.modelValue === mv) {
                return;
            }
            this.$emit('update:modelValue', mv);
            this.$emit('changed');
        },
    },
};
