import * as lControl from '../../control.js';

export interface INboardVue extends lControl.IControlVue {
    /** --- 是否禁用，默认 false --- */
    'disabled': boolean;
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 自定义按钮 --- */
    'custom': string;
    /** --- 底部按钮列表 --- */
    'buttons': string[];
    /** --- 尺寸 --- */
    'size': string | undefined;
    /** --- 当前输入的值 --- */
    'modelValue': string;
    /** --- 长度，默认 6 --- */
    'length': number;
    /** --- 是否分割显示，默认 false --- */
    'split': boolean;
    /** --- 内部值数组 --- */
    'value': string[];
    /** --- 数字按钮点击事件 --- */
    click: (num: string) => void;
    /** --- 底部按钮点击事件 --- */
    buttonClick: (item: string) => void;
    /** --- 退格事件 --- */
    back: () => void;
}

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
        'size': {
            'default': undefined,
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
            handler: function(this: INboardVue) {
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
        click: function(this: INboardVue, num: string) {
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
        buttonClick: function(this: INboardVue, item: string) {
            this.$emit('button', item);
        },
        back: function(this: INboardVue) {
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
