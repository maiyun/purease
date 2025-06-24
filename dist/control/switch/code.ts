import * as types from '../../../types';

export const code = {
    'template': '',
    'props': {
        'disabled': {
            'default': false,
        },
        'map': {
            'default': {},
        },

        'modelValue': {
            'default': false,
        }
    },
    'data': function() {
        return {
            'value': false
        };
    },
    'computed': {
        mapComp: function(this: types.IVue): {
            'true': any;
            'false': any;
        } {
            return {
                'true': this.$props.map.true ?? true,
                'false': this.$props.map.false ?? false
            };
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.$props.modelValue === undefined) {
                    return;
                }
                this.value = this.$props.modelValue;
            },
            'immediate': true
        }
    },
    'methods': {
        click: function(this: types.IVue): void {
            const event: types.ISwitchChangeEvent = {
                'go': true,
                preventDefault: function() {
                    this.go = false;
                },
                'detail': {
                    'value': this.value
                }
            };
            this.$emit('change', event);
            if (event.go) {
                this.value = this.value === this.mapComp.true ? this.mapComp.false : this.mapComp.true;
                this.$emit('update:modelValue', this.value);
            }
        },
        keydown: function(this: types.IVue, e: KeyboardEvent): void {
            if (e.key !== 'Enter') {
                return;
            }
            e.preventDefault();
            this.click();
        },
    }
};
