import * as purease from '../../purease.js';
import * as lControl from '../../control';

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': ''
        },
        'data': {
            'default': []
        },
        'plain': {
            'default': false
        },
        /** --- label, value, children, title --- */
        'map': {
            'default': {}
        },
        'multi': {
            'default': false
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'click': null,
    },
    'computed': {
        /** --- 初始化后的 map 对象 --- */
        mapComp: function(this: purease.IVue): {
            'label': string;
            'value': string;
            'children': string;
            'title': string;
        } {
            return {
                'children': this.$props.map.children ?? 'children',
                'label': this.$props.map.label ?? 'label',
                'value': this.$props.map.value ?? 'value',
                'title': this.$props.map.title ?? 'title',
            };
        }
    },
    'methods': {
        click: function(this: purease.IVue, i: number) {
            const item = this.$props.data[i];
            this.value = item[this.mapComp.value] ?? item[this.mapComp.label] ?? item;
            this.$emit('update:modelValue', this.value);
            const event: lControl.IDlistChangedEvent = {
                'detail': {
                    'value': this.value,
                    'index': i,
                    'label': item[this.mapComp.label] ?? item[this.mapComp.value] ?? item
                }
            };
            this.$emit('changed', event);
            this.$emit('click', event);
        },
        refreshModelValue: function(this: purease.IVue) {
            let found = false;
            for (const item of this.$props.data) {
                const val = item[this.mapComp.value] ?? item[this.mapComp.label] ?? item;
                if (val !== this.value) {
                    continue;
                }
                found = true;
                break;
            }
            if (found) {
                return;
            }
            if (!this.$props.data[0]) {
                if (this.value !== '') {
                    this.value = '';
                    this.$emit('update:modelValue', '');
                    const event: lControl.IDlistChangedEvent = {
                        'detail': {
                            'value': '',
                            'index': -1,
                            'label': ''
                        }
                    };
                    this.$emit('changed', event);
                }
                return;
            }
            const fitem = this.$props.data[0];
            this.value = fitem[this.mapComp.value] ?? fitem[this.mapComp.label] ?? fitem;
            const lab = fitem[this.mapComp.label] ?? fitem[this.mapComp.value] ?? fitem;
            this.$emit('update:modelValue', this.value);
            const event: lControl.IDlistChangedEvent = {
                'detail': {
                    'value': this.value,
                    'index': 0,
                    'label': lab
                }
            };
            this.$emit('changed', event);
        }
    },
    'data': function() {
        return {
            /** --- 当前选定的值 --- */
            'value': '',
            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'empty': 'Empty',
                },
                'sc': {
                    'empty': '空',
                },
                'tc': {
                    'empty': '空',
                },
                'ja': {
                    'empty': '空っぽ',
                },
                'ko': {
                    'empty': '비어 있음',
                },
                'th': {
                    'empty': 'ว่างเปล่า',
                },
                'es': {
                    'empty': 'Vacío',
                },
                'de': {
                    'empty': 'Leer',
                },
                'fr': {
                    'empty': 'Vide',
                },
                'pt': {
                    'empty': 'Vazio',
                },
                'ru': {
                    'empty': 'Пусто',
                },
                'vi': {
                    'empty': 'Trống',
                },
                'ar': {
                    'empty': 'فارغ',
                },
                'id': {
                    'empty': 'Kosong',
                },
                'it': {
                    'empty': 'Vuoto',
                },
                'tr': {
                    'empty': 'Boş',
                }
            }
        };
    },
    'mounted': function(this: purease.IVue) {
        this.$watch('modelValue', () => {
            if (this.value && (this.value === this.$props.modelValue)) {
                return;
            }
            this.value = this.$props.modelValue;
            this.refreshModelValue();
        }, {
            'immediate': true
        });
        this.$watch('data', () => {
            if (this.value !== this.$props.modelValue) {
                this.value = this.$props.modelValue;
            }
            this.refreshModelValue();
        }, {
            'deep': true
        });
    },
};
