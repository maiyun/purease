import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface ISpaPageVue extends lControl.IControlVue {
    /** --- 页面路径 --- */
    'path': string;
    /** --- 是否灰色背景，默认 false --- */
    'grey': boolean;
    /** --- 当前路径 --- */
    'currentPath': string;
    /** --- 当前参数 --- */
    'currentQuery': Record<string, string>;
    /** --- 当前页面参数 --- */
    'query': Record<string, string>;
}

export const code = {
    'template': '',
    'emits': ['show', 'hide'],
    'props': {
        'path': {
            'default': '',
        },
        'grey': {
            'default': false,
        },
    },
    'data': function() {
        return {
            'query': {},
        };
    },
    'computed': {
        currentPath: function(this: ISpaPageVue) {
            return this.$parent?.path ?? '';
        },
        currentQuery: function(this: ISpaPageVue) {
            return this.$parent?.query ?? {};
        },
    },
    'watch': {
        'currentQuery': {
            handler: function(this: ISpaPageVue, newQuery: Record<string, string>) {
                if (this.currentPath !== this.path) {
                    return;
                }
                this.query = newQuery;
            },
            deep: true
        },
        'currentPath': {
            handler: async function(this: ISpaPageVue, newPath: string, oldPath: string) {
                if (newPath === oldPath) {
                    return;
                }
                if (newPath === this.path) {
                    // --- 进入 ---
                    this.query = this.currentQuery;
                    this.$el.classList.add('pe-display');
                    await purease.tool.sleep(150);
                    this.$el.classList.add('pe-show');
                    this.$emit('show', {
                        'detail': {
                            'prev': oldPath,
                            'path': newPath,
                            'query': this.query
                        }
                    });
                    return;
                }
                if (oldPath === this.path) {
                    // --- 离开 ---
                    this.$el.classList.remove('pe-show');
                    await purease.tool.sleep(150);
                    this.$el.classList.remove('pe-display');
                    this.$emit('hide', {
                        'detail': {
                            'path': oldPath,
                            'next': newPath,
                        }
                    });
                    return;
                }
                // --- 没关系 ---
            },
        }
    },
    mounted: async function(this: ISpaPageVue) {
        await this.$nextTick();
        if (this.path !== this.currentPath) {
            return;
        }
        this.query = this.currentQuery;
        this.$el.classList.add('pe-display');
        await purease.tool.sleep(150);
        this.$el.classList.add('pe-show');
    },
};
