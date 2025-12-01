import * as lControl from '../../control.js';
import { ICollapseVue } from '../collapse/code.js';

export interface ICollapseItemVue extends lControl.IControlVue {
    /** --- 面板唯一标识 --- */
    'name': string;
    /** --- 面板标题 --- */
    'title': string;
    /** --- 是否禁用 --- */
    'disabled': boolean;
    /** --- 内容区高度 --- */
    'contentHeight': number;
    /** --- 是否正在过渡 --- */
    'isTransitioning': boolean;
    /** --- 父级 collapse 控件 --- */
    'collapse': ICollapseVue | null;
    /** --- 是否展开 --- */
    'isExpanded': boolean;
    /** --- MutationObserver 实例 --- */
    'observer': MutationObserver | null;
    /** --- resize 事件处理函数 --- */
    'resizeHandler': (() => void) | null;

    /** --- 切换展开状态 --- */
    toggle: () => void;
    /** --- 更新内容高度 --- */
    updateHeight: () => void;
}

export const code = {
    'template': '',
    'props': {
        'name': {
            'default': ''
        },
        'title': {
            'default': ''
        },
        'disabled': {
            'default': false
        }
    },
    'data': function() {
        return {
            'contentHeight': 0,
            'isTransitioning': false,
            'observer': null,
            'resizeHandler': null
        };
    },
    'computed': {
        /** --- 父级 collapse 控件 --- */
        collapse: function(this: ICollapseItemVue): ICollapseVue | null {
            return this.parentByName('pe-collapse') as ICollapseVue | null;
        },
        /** --- 是否展开 --- */
        isExpanded: function(this: ICollapseItemVue): boolean {
            if (!this.collapse) {
                return false;
            }
            return this.collapse.isActive(this.$props.name);
        }
    },
    'methods': {
        /** --- 切换展开状态 --- */
        toggle: function(this: ICollapseItemVue): void {
            if (this.propBoolean('disabled')) {
                return;
            }
            if (!this.collapse) {
                return;
            }
            this.collapse.updateActiveNames(this.$props.name, !this.isExpanded);
        },
        /** --- 更新内容高度 --- */
        updateHeight: function(this: ICollapseItemVue): void {
            const content = this.$refs.content as HTMLElement | undefined;
            if (!content) {
                return;
            }
            const inner = content.querySelector<HTMLElement>('.pe-collapse-item-inner');
            if (!inner) {
                return;
            }
            this.contentHeight = inner.offsetHeight;
        }
    },
    'watch': {
        'isExpanded': {
            handler: function(this: ICollapseItemVue): void {
                this.isTransitioning = true;
                this.updateHeight();
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 300);
            }
        }
    },
    'mounted': function(this: ICollapseItemVue): void {
        this.updateHeight();
        // --- 监听内容变化 ---
        const content = this.$refs.content as HTMLElement | undefined;
        if (content) {
            this.observer = new MutationObserver(() => {
                this.updateHeight();
            });
            this.observer.observe(content, {
                'childList': true,
                'subtree': true,
                'characterData': true
            });
        }
        // --- 监听窗口大小变化 ---
        this.resizeHandler = () => {
            this.updateHeight();
        };
        window.addEventListener('resize', this.resizeHandler);
    },
    'unmounted': function(this: ICollapseItemVue): void {
        // --- 清理 MutationObserver ---
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        // --- 清理 resize 事件监听 ---
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = null;
        }
    }
};
