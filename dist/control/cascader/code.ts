import * as lDom from '../../dom.js';
import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface ICascaderVue extends lControl.IControlVue {
    /** --- 当前选中值数组 --- */
    'modelValue': string[];
    /** --- 数据源 --- */
    'options': lControl.ICascaderOption[];
    /** --- 是否禁用，默认 false --- */
    'disabled': boolean;
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 是否显示搜索框，默认 false --- */
    'search': boolean;
    /** --- 是否可清空，默认 false --- */
    'clearable': boolean;
    /** --- 是否仅显示最后一级，默认 false --- */
    'showLastLevel': boolean;
    /** --- 分隔符，默认 / --- */
    'separator': string;
    /** --- 选择触发方式，默认 click --- */
    'expandTrigger': 'click' | 'hover';
    /** --- 占位符 --- */
    'placeholder': string;
    /** --- 是否开启异步加载，默认 false --- */
    'lazy': boolean;
    /** --- 异步加载回调函数 --- */
    'lazyLoad': ((option: lControl.ICascaderOption | null, resolve: (children: lControl.ICascaderOption[]) => void) => void) | null;
    /** --- 当前选中值 --- */
    'value': string[];
    /** --- 搜索关键词 --- */
    'searchValue': string;
    /** --- 当前展开的层级数据 --- */
    'expandedLevels': lControl.ICascaderOption[][];
    /** --- 每层选中的索引 --- */
    'selectedIndices': number[];
    /** --- 多语言数据 --- */
    'localeData': Record<string, Record<string, string>>;
    /** --- hover 计时器 --- */
    'hoverTimer': ReturnType<typeof setTimeout> | null;
    /** --- 正在加载中的选项 value 集合 --- */
    'loadingOptions': Record<string, boolean>;

    /** --- 打开下拉 --- */
    open: (e: PointerEvent) => void;
    /** --- 初始化展开层级 --- */
    initExpandedLevels: () => void;
    /** --- 点击选项 --- */
    selectOption: (level: number, index: number, option: lControl.ICascaderOption) => void;
    /** --- 悬停选项 --- */
    hoverOption: (level: number, index: number, option: lControl.ICascaderOption) => void;
    /** --- 离开选项 --- */
    leaveOption: () => void;
    /** --- 清空选择 --- */
    clear: (e: PointerEvent) => void;
    /** --- 异步加载子节点 --- */
    loadLazyChildren: (level: number, index: number, option: lControl.ICascaderOption) => Promise<void>;
    /** --- 格式化显示文本 --- */
    'displayText': string;
    /** --- 搜索过滤后的结果 --- */
    'searchResults': Array<{ 'path': lControl.ICascaderOption[]; 'pathValues': string[]; 'pathLabels': string[]; }>;
    /** --- 选择搜索结果 --- */
    selectSearchResult: (result: { 'path': lControl.ICascaderOption[]; 'pathValues': string[]; 'pathLabels': string[]; }) => void;
}

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': []
        },
        'options': {
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
        'clearable': {
            'default': false
        },
        'showLastLevel': {
            'default': false
        },
        'separator': {
            'default': ' / '
        },
        'expandTrigger': {
            'default': 'click'
        },
        'placeholder': {
            'default': ''
        },
        'lazy': {
            'default': false
        },
        'lazyLoad': {
            'default': null
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null
    },
    'data': function() {
        return {
            'value': [] as string[],
            'searchValue': '',
            'expandedLevels': [] as lControl.ICascaderOption[][],
            'selectedIndices': [] as number[],
            'hoverTimer': null as ReturnType<typeof setTimeout> | null,
            'loadingOptions': {} as Record<string, boolean>,

            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'search': 'Search',
                    'empty': 'No data',
                    'noMatch': 'No matching data'
                },
                'sc': {
                    'search': '搜索',
                    'empty': '暂无数据',
                    'noMatch': '无匹配数据'
                },
                'tc': {
                    'search': '搜尋',
                    'empty': '暫無數據',
                    'noMatch': '無匹配數據'
                },
                'ja': {
                    'search': '検索',
                    'empty': 'データなし',
                    'noMatch': '一致するデータがありません'
                },
                'ko': {
                    'search': '검색',
                    'empty': '데이터 없음',
                    'noMatch': '일치하는 데이터 없음'
                },
                'th': {
                    'search': 'ค้นหา',
                    'empty': 'ไม่มีข้อมูล',
                    'noMatch': 'ไม่มีข้อมูลที่ตรงกัน'
                },
                'es': {
                    'search': 'Buscar',
                    'empty': 'Sin datos',
                    'noMatch': 'Sin coincidencias'
                },
                'de': {
                    'search': 'Suchen',
                    'empty': 'Keine Daten',
                    'noMatch': 'Keine Übereinstimmungen'
                },
                'fr': {
                    'search': 'Rechercher',
                    'empty': 'Aucune donnée',
                    'noMatch': 'Aucune correspondance'
                },
                'pt': {
                    'search': 'Pesquisar',
                    'empty': 'Sem dados',
                    'noMatch': 'Sem correspondência'
                },
                'ru': {
                    'search': 'Поиск',
                    'empty': 'Нет данных',
                    'noMatch': 'Нет совпадений'
                },
                'vi': {
                    'search': 'Tìm kiếm',
                    'empty': 'Không có dữ liệu',
                    'noMatch': 'Không tìm thấy kết quả'
                },
                'ar': {
                    'search': 'بحث',
                    'empty': 'لا توجد بيانات',
                    'noMatch': 'لا توجد نتائج'
                },
                'id': {
                    'search': 'Cari',
                    'empty': 'Tidak ada data',
                    'noMatch': 'Tidak ada yang cocok'
                },
                'it': {
                    'search': 'Cerca',
                    'empty': 'Nessun dato',
                    'noMatch': 'Nessuna corrispondenza'
                },
                'tr': {
                    'search': 'Ara',
                    'empty': 'Veri yok',
                    'noMatch': 'Eşleşme yok'
                }
            }
        };
    },
    'methods': {
        open: function(this: ICascaderVue, oe: PointerEvent) {
            const cel = oe.currentTarget as HTMLElement;
            purease.pointer.click(oe, () => {
                const el = oe.target as HTMLElement;
                if (!el.classList.contains('pe-cascader-label') &&
                    !el.classList.contains('pe-cascader-arrow') &&
                    !el.classList.contains('pe-cascader-placeholder')) {
                    return;
                }
                this.initExpandedLevels();
                lDom.showPop(cel, this.$refs.pop);
            });
        },
        initExpandedLevels: function(this: ICascaderVue) {
            // --- lazy 模式且没有 options 时，触发加载根级数据 ---
            if (this.lazy && this.options.length === 0 && this.lazyLoad) {
                this.lazyLoad(null, (children) => {
                    // --- options 是 prop，需要通过 $emit 更新 ---
                    this.expandedLevels = [children];
                });
                this.selectedIndices = [];
                return;
            }
            this.expandedLevels = [this.options];
            this.selectedIndices = [];
            // --- 根据当前值展开对应层级 ---
            if (this.value.length > 0) {
                let currentOptions = this.options;
                for (const val of this.value) {
                    const index = currentOptions.findIndex(opt =>
                        (opt.value ?? opt.label) === val
                    );
                    if (index === -1) {
                        break;
                    }
                    this.selectedIndices.push(index);
                    const option = currentOptions[index];
                    if (option.children && option.children.length > 0) {
                        this.expandedLevels.push(option.children);
                        currentOptions = option.children;
                    }
                }
            }
        },
        selectOption: async function(
            this: ICascaderVue, level: number, index: number, option: lControl.ICascaderOption
        ) {
            if (option.disabled) {
                return;
            }
            const optionKey = option.value ?? option.label ?? '';
            // --- 如果正在加载中，忽略点击 ---
            if (this.loadingOptions[optionKey]) {
                return;
            }
            // --- 更新选中索引 ---
            this.selectedIndices = this.selectedIndices.slice(0, level);
            this.selectedIndices.push(index);
            // --- 如果有子节点，展开下一级 ---
            if (option.children && option.children.length > 0) {
                // --- 更新展开层级 ---
                this.expandedLevels = this.expandedLevels.slice(0, level + 1);
                this.expandedLevels.push(option.children);
            }
            // --- lazy 模式且 leaf 为 false 时，加载子节点 ---
            else if (this.lazy && option.leaf === false && this.lazyLoad) {
                // --- 先加载，加载完成后再更新展开层级 ---
                await this.loadLazyChildren(level, index, option);
            }
            else {
                // --- 更新展开层级 ---
                this.expandedLevels = this.expandedLevels.slice(0, level + 1);
                // --- 没有子节点，选中完成 ---
                const pathValues: string[] = [];
                const pathLabels: string[] = [];
                let currentOptions = this.expandedLevels[0];
                for (const idx of this.selectedIndices) {
                    const opt = currentOptions[idx];
                    pathValues.push(opt.value ?? opt.label ?? '');
                    pathLabels.push(opt.label ?? opt.value ?? '');
                    if (opt.children) {
                        currentOptions = opt.children;
                    }
                }
                this.value = pathValues;
                this.searchValue = '';
                this.$emit('update:modelValue', this.value);
                const event: lControl.ICascaderChangedEvent = {
                    'detail': {
                        'value': pathValues,
                        'labels': pathLabels
                    }
                };
                this.$emit('changed', event);
                lDom.hidePop(this.$refs.pop);
            }
        },
        hoverOption: function(this: ICascaderVue, level: number, index: number, option: lControl.ICascaderOption) {
            if (this.expandTrigger !== 'hover' || option.disabled) {
                return;
            }
            const optionKey = option.value ?? option.label ?? '';
            // --- 如果正在加载中，忽略 ---
            if (this.loadingOptions[optionKey]) {
                return;
            }
            if (this.hoverTimer) {
                clearTimeout(this.hoverTimer);
            }
            this.hoverTimer = setTimeout(async () => {
                // --- 更新选中索引 ---
                this.selectedIndices = this.selectedIndices.slice(0, level);
                this.selectedIndices.push(index);
                if (option.children && option.children.length > 0) {
                    // --- 更新展开层级 ---
                    this.expandedLevels = this.expandedLevels.slice(0, level + 1);
                    this.expandedLevels.push(option.children);
                }
                // --- lazy 模式且 leaf 为 false 时，加载子节点 ---
                else if (this.lazy && option.leaf === false && this.lazyLoad) {
                    // --- 先加载，加载完成后再更新展开层级 ---
                    await this.loadLazyChildren(level, index, option);
                }
            }, 150);
        },
        leaveOption: function(this: ICascaderVue) {
            if (this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
        },
        loadLazyChildren: function(
            this: ICascaderVue, level: number, index: number, option: lControl.ICascaderOption
        ): Promise<void> {
            return new Promise((resolve) => {
                if (!this.lazyLoad) {
                    resolve();
                    return;
                }
                const optionKey = option.value ?? option.label ?? '';
                this.loadingOptions[optionKey] = true;
                this.lazyLoad(option, (children) => {
                    delete this.loadingOptions[optionKey];
                    // --- 更新 option 的 children ---
                    option.children = children;
                    // --- 如果没有子节点，标记为叶子节点 ---
                    if (children.length === 0) {
                        option.leaf = true;
                    }
                    // --- 如果当前选中状态不变，展开子节点 ---
                    if (this.selectedIndices[level] === index && children.length > 0) {
                        this.expandedLevels = this.expandedLevels.slice(0, level + 1);
                        this.expandedLevels.push(children);
                    }
                    resolve();
                });
            });
        },
        clear: function(this: ICascaderVue, e: PointerEvent) {
            e.stopPropagation();
            this.value = [];
            this.searchValue = '';
            this.$emit('update:modelValue', []);
            const event: lControl.ICascaderChangedEvent = {
                'detail': {
                    'value': [],
                    'labels': []
                }
            };
            this.$emit('changed', event);
        },
        selectSearchResult: function(this: ICascaderVue, result: { 'path': lControl.ICascaderOption[]; 'pathValues': string[]; 'pathLabels': string[]; }) {
            this.value = result.pathValues;
            this.searchValue = '';
            this.$emit('update:modelValue', this.value);
            const event: lControl.ICascaderChangedEvent = {
                'detail': {
                    'value': result.pathValues,
                    'labels': result.pathLabels
                }
            };
            this.$emit('changed', event);
            lDom.hidePop(this.$refs.pop);
        }
    },
    'computed': {
        displayText: function(this: ICascaderVue): string {
            if (this.value.length === 0) {
                return '';
            }
            const labels: string[] = [];
            let currentOptions = this.options;
            for (const val of this.value) {
                const option = currentOptions.find(opt =>
                    (opt.value ?? opt.label) === val
                );
                if (!option) {
                    break;
                }
                labels.push(option.label ?? option.value ?? '');
                if (option.children) {
                    currentOptions = option.children;
                }
            }
            if (this.showLastLevel) {
                return labels[labels.length - 1] || '';
            }
            return labels.join(this.separator);
        },
        searchResults: function(this: ICascaderVue): Array<{ 'path': lControl.ICascaderOption[]; 'pathValues': string[]; 'pathLabels': string[]; }> {
            if (!this.searchValue) {
                return [];
            }
            const results: Array<{ 'path': lControl.ICascaderOption[]; 'pathValues': string[]; 'pathLabels': string[]; }> = [];
            const searchLower = this.searchValue.toLowerCase();
            // --- 递归搜索所有叶子节点 ---
            const searchInOptions = (
                options: lControl.ICascaderOption[],
                path: lControl.ICascaderOption[], pathValues: string[], pathLabels: string[]
            ): void => {
                for (const option of options) {
                    const newPath = [...path, option];
                    const newValues = [...pathValues, option.value ?? option.label ?? ''];
                    const newLabels = [...pathLabels, option.label ?? option.value ?? ''];
                    if (option.children && option.children.length > 0) {
                        searchInOptions(option.children, newPath, newValues, newLabels);
                    }
                    else {
                        // --- 叶子节点，检查路径是否匹配搜索词 ---
                        const fullPath = newLabels.join(' ').toLowerCase();
                        if (fullPath.includes(searchLower)) {
                            results.push({
                                'path': newPath,
                                'pathValues': newValues,
                                'pathLabels': newLabels
                            });
                        }
                    }
                }
            };
            searchInOptions(this.options, [], [], []);
            return results;
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: ICascaderVue) {
                this.value = [...this.modelValue];
            },
            'immediate': true
        },
        'options': {
            handler: function(this: ICascaderVue) {
                if (this.expandedLevels.length > 0) {
                    this.initExpandedLevels();
                }
            },
            'deep': true
        }
    },
};
