import * as purease from '../../purease.js';
import * as lControl from '../../control';

export interface IPageVue extends purease.IVue {
    /** --- 当前页码，默认 1 --- */
    'modelValue': number;
    /** --- 最大页数，默认 0 --- */
    'max': number;
    /** --- 总条数，默认 0 --- */
    'total': number;
    /** --- 每页条数，默认 10 --- */
    'count': number;
    /** --- 每页条数选项 --- */
    'counts': number[];
    /** --- 显示的页码控制数，默认 10 --- */
    'control': number;
    /** --- SVG 图标 --- */
    'svg': string;
    /** --- 每页条数选择 --- */
    'countSelect': number;
    /** --- 上方页码序列 --- */
    'prevs': number[];
    /** --- 下方页码序列 --- */
    'nexts': number[];
    /** --- 当前页码 --- */
    'page': number;
    /** --- 最大页数 --- */
    'maxPage': number;
    /** --- 多语言数据 --- */
    'localeData': Record<string, Record<string, string>>;
    /** --- 格式化后的每页条数选项 --- */
    'countsComp': Array<{ 'label': string; 'value': number; }>;
    /** --- 刷新页码显示 --- */
    refresh: () => void;
    /** --- 刷新最大页数 --- */
    refreshMaxPage: () => void;
    /** --- 键盘事件 --- */
    keydown: (e: KeyboardEvent) => void;
    /** --- 每页条数改变事件 --- */
    changed: (e: lControl.ISelectChangedEvent) => void;
}

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
                },
                'ar': {
                    'total-of': 'المجموع ?',
                    'page': 'صفحة'
                },
                'id': {
                    'total-of': 'Total ? item',
                    'page': 'Hal'
                },
                'it': {
                    'total-of': 'Totale ?',
                    'page': 'Pag'
                },
                'tr': {
                    'total-of': 'Toplam ?',
                    'page': 'Sayfa'
                }
            }
        };
    },
    'computed': {
        /** --- 格式化每页多少条 counts --- */
        countsComp: function(this: IPageVue): Array<{
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
        refresh: function(this: IPageVue) {
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
        refreshMaxPage: function(this: IPageVue) {
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
        changed: function(this: IPageVue, e: lControl.ISelectChangedEvent) {
            this.$emit('update:count', e.detail.value);
            this.refreshMaxPage();
            this.refresh();
        }
    },
    'watch': {
        'count': {
            handler: function(this: IPageVue) {
                this.countSelect = this.propInt('count');
                this.refreshMaxPage();
                this.refresh();
            }
        },
        'modelValue': {
            handler: function(this: IPageVue) {
                this.page = this.propInt('modelValue');
                this.refresh();
            },
            'immediate': true
        },
        'max': {
            handler: function(this: IPageVue) {
                this.refreshMaxPage();
                this.refresh();
            }
        },
        'total': {
            handler: function(this: IPageVue) {
                this.refreshMaxPage();
                this.refresh();
            }
        },
        'control': {
            handler: function(this: IPageVue) {
                this.refresh();
            }
        }
    },
    mounted: function(this: IPageVue) {
        this.countSelect = this.propInt('count');
        this.refreshMaxPage();
        this.refresh();
    }
};
