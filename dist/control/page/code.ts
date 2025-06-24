import * as types from '../../../types';

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': 1
        },
        'max': {
            'default': 0
        },
        'total': {
            'default': 0
        },
        'count': {
            'default': 10
        },
        /** --- 设置后出现选项可选择每页多少条, Array<number> | string --- */
        'counts': {
            'default': []
        },
        'control': {
            'default': 10
        }
    },
    'emits': {
        'change': null,

        'update:modelValue': null,
        'update:count': null
    },
    'data': function() {
        return {
            'svg': '<svg width="14" height="14" viewBox="0 0 24 24" stroke="none"><path d="m6 10.25c-.9665 0-1.75.7835-1.75 1.75s.7835 1.75 1.75 1.75h.01c.9665 0 1.75-.7835 1.75-1.75s-.7835-1.75-1.75-1.75zm4.25 1.75c0-.9665.7835-1.75 1.75-1.75h.01c.9665 0 1.75.7835 1.75 1.75s-.7835 1.75-1.75 1.75h-.01c-.9665 0-1.75-.7835-1.75-1.75zm6 0c0-.9665.7835-1.75 1.75-1.75h.01c.9665 0 1.75.7835 1.75 1.75s-.7835 1.75-1.75 1.75h-.01c-.9665 0-1.75-.7835-1.75-1.75z" /></svg>',
            'countSelect': 0,
            /** --- 上面页面序列 --- */
            'prevs': [],
            /** --- 下面页面序列 --- */
            'nexts': [],
            /** --- 当前页面 --- */
            'page': 0,
            /** --- 最大页数，如果用户传入了 max 则以 max 为准，否则以 total 和 count 计算最大页面值 --- */
            'maxPage': 0,
            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'total-of': 'Total of ? items',
                    'page': 'Page'
                },
                'sc': {
                    'total-of': '共 ? 条',
                    'page': '页'
                },
                'tc': {
                    'total-of': '共 ? 條',
                    'page': '頁'
                },
                'ja': {
                    'total-of': '? 件の合計',
                    'page': 'ページ'
                },
                'ko': {
                    'total-of': '? 개 항목 총계',
                    'page': '페이지'
                },
                'th': {
                    'total-of': 'ทั้งหมด ? รายการ',
                    'page': 'หน้า'
                },
                'es': {
                    'total-of': 'Total de ? elementos',
                    'page': 'Página'
                },
                'de': {
                    'total-of': 'Insgesamt ?',
                    'page': 'Seite'
                },
                'fr': {
                    'total-of': 'Total de ?',
                    'page': 'Page'
                },
                'pt': {
                    'total-of': 'Total de ?',
                    'page': 'Página'
                },
                'ru': {
                    'total-of': 'Всего ?',
                    'page': 'Страница'
                },
                'vi': {
                    'total-of': 'Tổng cộng ?',
                    'page': 'Trang'
                }
            }
        };
    },
    'computed': {
        /** --- 格式化每页多少条 counts --- */
        countsComp: function(this: types.IVue): Array<{
            'label': string;
            'value': number;
        }> {
            const counts = this.propArray('counts');
            const list: Array<{
                'label': string;
                'value': number;
            }> = [];
            for (const item of counts) {
                list.push({
                    'label': item.toString() + ' / ' + this.l('page'),
                    'value': item
                });
            }
            return list;
        }
    },
    'methods': {
        refresh: function(this: types.IVue) {
            this.prevs.length = 0;
            let min = this.page - this.propNumber('control');
            if (min < 2) {
                min = 2;
            }
            for (let i = this.page - 1; i >= min; --i) {
                this.prevs.unshift(i);
            }

            this.nexts.length = 0;
            let max = this.page + this.propNumber('control');
            if (max > this.maxPage - 1) {
                max = this.maxPage - 1;
            }
            for (let i = this.page + 1; i <= max; ++i) {
                this.nexts.push(i);
            }
        },
        refreshMaxPage: function(this: types.IVue) {
            const max = this.propInt('max');
            if (max) {
                this.maxPage = max;
                return;
            }
            if (!this.propInt('total')) {
                this.maxPage = 1;
                return;
            }
            this.maxPage = Math.ceil(this.propInt('total') / this.countSelect);
        },
        keydown: function(e: KeyboardEvent) {
            if (e.key !== 'Enter') {
                return;
            }
            e.preventDefault();
            (e.target as HTMLElement).click();
        },
        changed: function(this: types.IVue, e: types.ISelectChangedEvent) {
            this.$emit('update:count', e.detail.value);
            this.refreshMaxPage();
            this.refresh();
        }
    },
    'watch': {
        'count': {
            handler: function(this: types.IVue) {
                this.countSelect = this.propInt('count');
                this.refreshMaxPage();
                this.refresh();
            }
        },
        'modelValue': {
            handler: function(this: types.IVue) {
                this.page = this.propInt('modelValue');
                this.refresh();
            },
            'immediate': true
        },
        'max': {
            handler: function(this: types.IVue) {
                this.refreshMaxPage();
                this.refresh();
            }
        },
        'total': {
            handler: function(this: types.IVue) {
                this.refreshMaxPage();
                this.refresh();
            }
        },
        'control': {
            handler: function(this: types.IVue) {
                this.refresh();
            }
        }
    },
    mounted: function(this: types.IVue) {
        this.countSelect = this.propInt('count');
        this.refreshMaxPage();
        this.refresh();
    }
};
