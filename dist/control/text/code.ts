import * as purease from '../../purease.js';
import * as lControl from '../../control';

export interface ITextVue extends purease.IVue {
    /** --- 当前输入的值 --- */
    'modelValue': string;
    /** --- 是否只读，默认 false --- */
    'readonly': boolean;
    /** --- 输入框类型，默认 text --- */
    'type': 'text' | 'multi' | 'password' | 'number';
    /** --- 占位符文本 --- */
    'placeholder': string;
    /** --- 是否禁用，默认 false --- */
    'disabled': boolean;
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 最大长度限制，默认 0（无限制） --- */
    'maxlength': number;
    /** --- 最大值（仅 number 类型） --- */
    'max': number | undefined;
    /** --- 最小值（仅 number 类型） --- */
    'min': number | undefined;
    /** --- 是否获得焦点 --- */
    'isFocus': boolean;
    /** --- 内部值 --- */
    'value': string;
    /** --- 是否显示密码 --- */
    'showPassword': boolean;
    /** --- 检测数字是否符合范围 --- */
    checkNumber: (target?: HTMLInputElement | HTMLTextAreaElement) => boolean;
    /** --- 输入事件 --- */
    input: (e: InputEvent) => void;
    /** --- 获得焦点事件 --- */
    tfocus: () => void;
    /** --- 失去焦点事件 --- */
    tblur: (e: FocusEvent) => void;
}

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': ''
        },
        'readonly': {
            'default': false
        },
        'type': {
            // --- 'text' | 'multi' | 'password' | 'number' ---
            'default': 'text'
        },
        'placeholder': {
            'default': ''
        },
        'disabled': {
            'default': false
        },
        'plain': {
            'default': false
        },
        'maxlength': {
            'default': 0
        },
        'max': {
            'default': undefined
        },
        'min': {
            'default': undefined
        },
    },
    'emits': {
        'beforechange': null,
        'focus': null,
        'blur': null,

        'update:modelValue': null
    },
    'data': function() {
        return {
            'isFocus': false,
            'value': '',
            'showPassword': false,
        };
    },
    'methods': {
        /** --- 检测 value 值是否符合 max 和 min --- */
        checkNumber: function(this: ITextVue, target?: HTMLInputElement | HTMLTextAreaElement) {
            target ??= this.$refs.text as unknown as HTMLInputElement | HTMLTextAreaElement;
            if (this.$props.type !== 'number') {
                return false;
            }
            let change = false;
            if (!target.value && this.value) {
                change = true;
            }
            if (target.value) {
                const val = parseFloat(target.value);
                if (this.$props.max !== undefined && this.$props.max !== 'undefined' && val > this.propNumber('max')) {
                    target.value = this.propNumber('max').toString();
                    change = true;
                }
                if (this.$props.min !== undefined && this.$props.min !== 'undefined' && val < this.propNumber('min')) {
                    target.value = this.propNumber('min').toString();
                    change = true;
                }
            }
            return change;
        },
        /** --- 文本框的 input 事件 --- */
        input: function(this: ITextVue, e: InputEvent) {
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            if (this.propNumber('maxlength') && (target.value.length > this.propNumber('maxlength'))) {
                target.value = target.value.slice(0, this.propNumber('maxlength'));
                return;
            }
            const event: lControl.ITextBeforechangeEvent = {
                'go': true,
                preventDefault: function() {
                    this.go = false;
                },
                'detail': {
                    'value': target.value,
                    'change': undefined
                }
            };
            this.$emit('beforechange', event);
            if (!event.go) {
                target.value = this.value;
                return;
            }
            if (event.detail.change !== undefined) {
                target.value = event.detail.change;
            }
            this.value = target.value;
            this.$emit('update:modelValue', this.value);
        },
        /** --- 文本框的 focus 事件 --- */
        tfocus: function(this: ITextVue): void {
            this.isFocus = true;
            this.$emit('focus');
        },
        tblur: function(this: ITextVue, e: FocusEvent): void {
            // --- 如果是 number 则要判断数字是否符合 min max，不能在 input 判断，因为会导致用户无法正常输入数字，比如最小值是 10，他在输入 1 的时候就自动重置为 10 了 ---
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            if (this.checkNumber(target)) {
                const event: lControl.ITextBeforechangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': target.value,
                        'change': undefined
                    }
                };
                this.$emit('beforechange', event);
                if (event.go) {
                    // --- 允许 ---
                    if (event.detail.change !== undefined) {
                        target.value = event.detail.change;
                    }
                    this.value = target.value;
                    this.$emit('update:modelValue', this.value);
                }
                else {
                    // --- 禁止 ---
                    target.value = this.value;
                }
            }
            this.isFocus = false;
            this.$emit('blur');
        },
    },
    'watch': {
        'modelValue': {
            handler: async function(this: ITextVue) {
                if (this.value === this.$props.modelValue) {
                    return;
                }
                this.value = this.$props.modelValue;
                await this.$nextTick();
                this.checkNumber();
                if (this.propNumber('maxlength') && this.$refs.text.value.length > this.propNumber('maxlength')) {
                    this.$refs.text.value = this.$refs.text.value.slice(0, this.propNumber('maxlength'));
                }
                // --- 有可能设置后控件实际值和设置的值不同，所以要重新判断一次 ---
                if (this.$refs.text.value === this.value) {
                    return;
                }
                const event: lControl.ITextBeforechangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': this.$refs.text.value,
                        'change': undefined
                    }
                };
                this.$emit('beforechange', event);
                if (!event.go) {
                    this.$refs.text.value = this.value;
                    return;
                }
                this.value = event.detail.change ?? this.$refs.text.value;
                this.$emit('update:modelValue', this.value);
            },
            'immediate': true
        },
        'type': {
            handler: async function(this: ITextVue) {
                await this.$nextTick();
                if (this.checkNumber()) {
                    const event: lControl.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': this.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        this.$refs.text.value = this.value;
                        return;
                    }
                    this.value = event.detail.change ?? this.$refs.text.value;
                    this.$emit('update:modelValue', this.value);
                }
            }
        },
        'max': {
            handler: function(this: ITextVue) {
                if (this.checkNumber()) {
                    const event: lControl.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': this.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        this.$refs.text.value = this.value;
                        return;
                    }
                    this.value = event.detail.change ?? this.$refs.text.value;
                    this.$emit('update:modelValue', this.value);
                }
            }
        },
        'min': {
            handler: function(this: ITextVue) {
                if (this.checkNumber()) {
                    const event: lControl.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': this.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        this.$attrsrefs.text.value = this.value;
                        return;
                    }
                    this.value = event.detail.change ?? this.$refs.text.value;
                    this.$emit('update:modelValue', this.value);
                }
            }
        },
        'maxlength': {
            handler: function(this: ITextVue) {
                if (!this.propNumber('maxlength')) {
                    return;
                }
                if (this.value.length <= this.propNumber('maxlength')) {
                    return;
                }
                const value = this.value.slice(0, this.propNumber('maxlength'));
                const event: lControl.ITextBeforechangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': value,
                        'change': undefined
                    }
                };
                this.$emit('beforechange', event);
                if (!event.go) {
                    return;
                }
                this.value = event.detail.change ?? value;
                this.$emit('update:modelValue', this.value);
            }
        }
    },
};
