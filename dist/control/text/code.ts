import * as types from '../../../types';

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
            'value': ''
        };
    },
    'methods': {
        /** --- 检测 value 值是否符合 max 和 min --- */
        checkNumber: function(this: types.IVue, target?: HTMLInputElement | HTMLTextAreaElement) {
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
        input: function(this: types.IVue, e: InputEvent) {
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            if (this.propNumber('maxlength') && (target.value.length > this.propNumber('maxlength'))) {
                target.value = target.value.slice(0, this.propNumber('maxlength'));
                return;
            }
            const event: types.ITextBeforechangeEvent = {
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
        tfocus: function(this: types.IVue): void {
            this.isFocus = true;
            this.$emit('focus');
        },
        tblur: function(this: types.IVue, e: FocusEvent): void {
            // --- 如果是 number 则要判断数字是否符合 min max，不能在 input 判断，因为会导致用户无法正常输入数字，比如最小值是 10，他在输入 1 的时候就自动重置成 10 了 ---
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            if (this.checkNumber(target)) {
                const event: types.ITextBeforechangeEvent = {
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
            handler: async function(this: types.IVue) {
                if (this.value === this.$props.modelValue) {
                    return;
                }
                this.value = this.$props.modelValue;
                await this.$nextTick();
                this.checkNumber();
                if (this.propNumber('maxlength') && this.$refs.text.value.length > this.propNumber('maxlength')) {
                    this.$refs.text.value = this.$refs.text.value.slice(0, this.propNumber('maxlength'));
                }
                // --- 有可能设置后控件实际值和设置的值不同，所以要重新判断一下 ---
                if (this.$refs.text.value === this.value) {
                    return;
                }
                const event: types.ITextBeforechangeEvent = {
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
            handler: async function(this: types.IVue) {
                await this.$nextTick();
                if (this.checkNumber()) {
                    const event: types.ITextBeforechangeEvent = {
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
            handler: function(this: types.IVue) {
                if (this.checkNumber()) {
                    const event: types.ITextBeforechangeEvent = {
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
            handler: function(this: types.IVue) {
                if (this.checkNumber()) {
                    const event: types.ITextBeforechangeEvent = {
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
            handler: function(this: types.IVue) {
                if (!this.propNumber('maxlength')) {
                    return;
                }
                if (this.value.length <= this.propNumber('maxlength')) {
                    return;
                }
                const value = this.value.slice(0, this.propNumber('maxlength'));
                const event: types.ITextBeforechangeEvent = {
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
