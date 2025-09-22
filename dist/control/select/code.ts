import * as lDom from '../../dom';
import * as lControl from '../../control';
import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': ''
        },
        'data': {
            'default': []
        },
        'disabled': {
            'default': false
        },
        'plain': {
            'default': false
        },
        'search': {
            'default': false
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null
    },
    'data': function() {
        return {
            'label': '',
            'value': '',
            'searchValue': '',

            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'search': 'Search'
                },
                'sc': {
                    'search': '搜索'
                },
                'tc': {
                    'search': '搜尋'
                },
                'ja': {
                    'search': '検索'
                },
                'ko': {
                    'search': '검색'
                },
                'th': {
                    'search': 'ค้นหา'
                },
                'es': {
                    'search': 'buscar'
                },
                'de': {
                    'search': 'suchen'
                },
                'fr': {
                    'search': 'rechercher'
                },
                'pt': {
                    'search': 'pesquisar'
                },
                'ru': {
                    'search': 'поиск'
                },
                'vi': {
                    'search': 'tìm kiếm'
                },
                'ar': {
                    'search': 'بحث'
                },
                'id': {
                    'search': 'Cari'
                },
                'it': {
                    'search': 'Cerca'
                },
                'tr': {
                    'search': 'Ara'
                }
            }
        };
    },
    'methods': {
        open: function(this: purease.IVue, e: MouseEvent) {
            const el = e.target as HTMLElement;
            if (!el.classList.contains('pe-select-label') && !el.classList.contains('pe-select-arrow')) {
                return;
            }
            lDom.showPop(e, this.$refs.pop);
        },
        onModelValue: function(this: purease.IVue, v: string) {
            if (this.value === v) {
                return;
            }
            this.value = v;
            for (const item of this.$props.data) {
                const val = item.value ?? item.label ?? item;
                if (val !== this.value) {
                    continue;
                }
                this.label = item.label ?? item.value ?? item;
                break;
            }
            this.$emit('update:modelValue', this.value);
        },
        click: function(this: purease.IVue, e: lControl.IDlistClickEvent) {
            this.searchValue = '';
            const event: lControl.ISelectChangedEvent = {
                'detail': {
                    'value': e.detail.value,
                    'index': e.detail.index,
                    'label': e.detail.label
                }
            };
            this.$emit('changed', event);
            lDom.hidePop(this.$refs.pop);
        },
    },
    'computed': {
        dataComp: function(this: purease.IVue) {
            const ds: Array<{
                'label': string;
                'value': string;
                'disabled': boolean;
            }> = [];
            for (const item of this.$props.data) {
                if (typeof item === 'string') {
                    ds.push({
                        'label': item,
                        'value': item,
                        'disabled': false,
                    });
                    continue;
                }
                ds.push({
                    'label': item.label ?? item.value ?? '',
                    'value': item.value ?? item.label ?? '',
                    'disabled': item.disabled ?? false,
                });
            }
            return ds;
        },
        searchComp: function(this: purease.IVue) {
            if (!this.searchValue) {
                return this.dataComp;
            }
            const ds: Array<{
                'label': string;
                'value': string;
                'disabled': boolean;
            }> = [];
            for (const item of this.dataComp) {
                let include = true;
                for (const char of this.searchValue) {
                    if (item.label.includes(char) || item.value.includes(char)) {
                        continue;
                    }
                    // --- 没包含 ---
                    include = false;
                    break;
                }
                if (include) {
                    ds.push({
                        'label': item.label,
                        'value': item.value,
                        'disabled': item.disabled
                    });
                }
            }
            return ds;
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: purease.IVue) {
                if (this.value === this.$props.modelValue) {
                    return;
                }
                this.value = this.$props.modelValue;
                for (const item of this.$props.data) {
                    const val = item.value ?? item.label ?? item;
                    if (val !== this.value) {
                        continue;
                    }
                    this.label = item.label ?? item.value ?? item;
                    break;
                }
            },
            'immediate': true
        }
    }
};
