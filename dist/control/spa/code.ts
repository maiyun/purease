import * as lControl from '../../control.js';

export interface ISpaVue extends lControl.IControlVue {
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 是否全屏显示，默认 false --- */
    'full': boolean;
    /** --- 当前路径 --- */
    'path': string;
    /** --- 当前参数 --- */
    'query': Record<string, string>;
}

export const code = {
    'template': '',
    'props': {
        'plain': {
            'default': false,
        },
        /** --- 全屏 --- */
        'full': {
            'default': false,
        },
    },
    'data': function() {
        return {
            'path': '',
            'query': {},
        };
    },
    'methods': {
        hashChange: function(this: ISpaVue) {
            const hash = window.location.hash.slice(1);
            const index = hash.indexOf('?');
            if (index === -1) {
                this.path = hash;
                this.query = {};
            }
            else {
                this.path = hash.substring(0, index);
                const query: Record<string, string> = {};
                const search = new URLSearchParams(hash.substring(index + 1));
                for (const [k, v] of search) {
                    query[k] = v;
                }
                this.query = query;
            }
        }
    },
    mounted: function(this: ISpaVue) {
        this.hashChange();
        window.addEventListener('hashchange', () => {
            this.hashChange();
        });
    },
};
