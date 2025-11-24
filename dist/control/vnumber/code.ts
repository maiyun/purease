import * as purease from '../../purease.js';

export interface IVnumberVue extends purease.IVue {
    /** --- 是否禁用，默认 false --- */
    'disabled': boolean;
    /** --- 当前输入的验证码值 --- */
    'modelValue': string;
    /** --- 长度，默认 6 --- */
    'length': number;
    /** --- 内部值数组 --- */
    'value': string[];
    /** --- 是否获得焦点 --- */
    'isFocus': boolean;
    /** --- 输入事件 --- */
    input: () => void;
}

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
            handler: function(this: IVnumberVue) {
                if (!this.$refs.input) {
                    return;
                }
                if (this.modelValue === this.$refs.input.value) {
                    return;
                }
                this.value.length = 0;
                for (const char of this.modelValue) {
                    if (this.value.length === this.propInt('length')) {
                        break;
                    }
                    if (!/[0-9]/.test(char)) {
                        continue;
                    }
                    this.value.push(char);
                }
                this.$refs.input.value = this.value.join('');
                if (this.modelValue === this.$refs.input.value) {
                    return;
                }
                this.$emit('update:modelValue', this.$refs.input.value);
                this.$emit('changed');
            },
            'immediate': true
        }
    },
    'methods': {
        input: function(this: IVnumberVue) {
            const value = this.$refs.input.value;
            this.value.length = 0;
            for (const char of value) {
                if (this.value.length === this.propInt('length')) {
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
            this.$emit('changed');
        }
    },
};
