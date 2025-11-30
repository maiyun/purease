import * as lControl from '../../control.js';

export interface IAnchorVue extends lControl.IControlVue {
    /** --- 目录列表 --- */
    'list': Array<{
        /** --- 目录项的唯一标识（基于标题文本生成的 slug） --- */
        'id': string;
        /** --- 目录项的文本内容 --- */
        'text': string;
        /** --- 目录项的级别（2-6） --- */
        'level': string;
    }>;
    /** --- 当前选中的导航项 id --- */
    'selected': string;
    /**
     * --- 滚动到指定标题位置的方法 ---
     * @param id 目录项的 id
     */
    scrollTo: (id: string) => void;
    /**
     * --- 将标题文本转换为 URL 友好的 slug ---
     * @param text 标题文本
     * @param usedIds 已使用的 id 集合，用于处理重复
     */
    generateSlug: (text: string, usedIds: Set<string>) => string;
    /**
     * --- 将选中的导航项滚动到可视区域 ---
     */
    scrollNavIntoView: () => void;
    /**
     * --- 清理事件监听器 ---
     */
    cleanup: () => void;
}

export const code = {
    'template': '',
    'data': function(): {
        'list': Array<{
            'id': string;
            'text': string;
            'level': string;
        }>;
        'selected': string;
    } {
        return {
            'list': [],
            'selected': '',
        };
    },
    'methods': {
        /**
         * --- 将标题文本转换为 URL 友好的 slug ---
         * @param text 标题文本
         * @param usedIds 已使用的 id 集合，用于处理重复
         */
        generateSlug: function(this: IAnchorVue, text: string, usedIds: Set<string>): string {
            // --- 转换为小写，移除特殊字符，将空格和连续空白替换为连字符 ---
            let slug = text.toLowerCase()
                .trim()
                .replace(/[\s]+/g, '-')
                .replace(/[^\w\u4e00-\u9fff-]/g, '')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            // --- 如果 slug 为空，使用默认值 ---
            if (!slug) {
                slug = 'heading';
            }
            // --- 处理重复的 id ---
            let finalSlug = slug;
            let counter = 1;
            while (usedIds.has(finalSlug)) {
                finalSlug = `${slug}-${counter}`;
                ++counter;
            }
            usedIds.add(finalSlug);
            return finalSlug;
        },
        /**
         * --- 将选中的右侧导航项滚动到可视区域 ---
         */
        scrollNavIntoView: function(this: IAnchorVue): void {
            /** --- 当前选中的项 --- */
            const selectedEl = this.$el.querySelector('.pe-anchor-item.pe-selected');
            if (!(selectedEl instanceof HTMLElement)) {
                return;
            }
            /** --- 上层容器 --- */
            const container = selectedEl.parentElement;
            if (!container) {
                return;
            }
            const containerRect = container.getBoundingClientRect();
            const selectedRect = selectedEl.getBoundingClientRect();
            // --- 检查选中项是否在容器可视区域内 ---
            if (selectedRect.top < containerRect.top) {
                // --- 超出上方，要向上滚动 ---
                container.scrollTo({
                    'top': selectedEl.offsetTop,
                    'behavior': 'smooth',
                });
            }
            else if (selectedRect.bottom > containerRect.bottom) {
                // --- 超出下方，要向下滚动 ---
                container.scrollTo({
                    'top': selectedEl.offsetTop - container.clientHeight + selectedEl.offsetHeight,
                    'behavior': 'smooth',
                });
            }
        },
        scrollTo: function(this: IAnchorVue, id: string): void {
            const el = document.getElementById(id);
            if (!el) {
                return;
            }
            window.scrollTo({
                'top': el.offsetTop - parseInt(getComputedStyle(el).getPropertyValue('--pe-headerheight')) - 20,
                'behavior': 'smooth',
            });
        },
        /**
         * --- 清理事件监听器 ---
         */
        cleanup: function(this: IAnchorVue): void {
            if (!this.access) {
                return;
            }
            if (this.access.scrollHandler) {
                window.removeEventListener('scroll', this.access.scrollHandler);
            }
            if (this.access.scrollTimer) {
                window.clearTimeout(this.access.scrollTimer);
            }
        },
    },
    mounted: function(this: IAnchorVue): void {
        const usedIds = new Set<string>();
        /** --- 标题元素列表 --- */
        const headingList: NodeListOf<HTMLElement> = this.$refs.left.querySelectorAll('h2,h3,h4,h5,h6');
        for (const item of headingList) {
            const text = item.textContent ?? '';
            const id = this.generateSlug(text, usedIds);
            this.list.push({
                'id': id,
                'text': text,
                'level': item.tagName.slice(1),
            });
            item.id = id;
        }
        // --- 初始化 access 用于存储运行时数据 ---
        this.access = {
            'scrollTimer': 0,
            'scrollHandler': null,
        };
        /** --- 滚动事件处理函数，节流器 --- */
        const scrollHandler = (): void => {
            if (this.access.scrollTimer) {
                return;
            }
            this.access.scrollTimer = window.setTimeout(() => {
                this.access.scrollTimer = 0;
                const oldSelected = this.selected;
                this.selected = '';
                if (!headingList.item(0)) {
                    return;
                }
                const wtop = window.scrollY;
                const headerheight = parseInt(getComputedStyle(headingList.item(0)).getPropertyValue('--pe-headerheight'));
                for (let i = 0; i < this.list.length; ++i) {
                    const item = this.list[i];
                    const el = headingList.item(i);
                    const top = el.offsetTop;
                    if (wtop < (top - headerheight - 20)) {
                        continue;
                    }
                    this.selected = item.id;
                }
                // --- 如果选中项变化，将其滚动到可视区域 ---
                if (this.selected !== oldSelected) {
                    // --- 等待页面更新 ---
                    window.setTimeout(() => {
                        this.scrollNavIntoView();
                    }, 34);
                }
            }, 50);
        };
        // --- 存储 scrollHandler 到 access ---
        this.access.scrollHandler = scrollHandler;
        window.addEventListener('scroll', scrollHandler);
        // --- 初始化时触发一次滚动检测 ---
        scrollHandler();
    },
    unmounted: function(this: IAnchorVue): void {
        // --- 移除事件监听器，避免内存泄漏 ---
        this.cleanup();
    },
};
