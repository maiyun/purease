// --- 添加 touchstart 事件，优化点击行为 ---
document.addEventListener('touchstart', function() {
    // --- 空操作，仅为了激活某些浏览器的点击行为 ---
});

window.addEventListener('pointerdown', (e) => {
    doDown(e);
});

/** --- 正在显示中的 pop element --- */
const showedPop: HTMLElement[] = [];
const showedPopEl: HTMLElement[] = [];

/** --- 将 pop 显示出来 --- */
export function showPop(e: PointerEvent | HTMLElement, pop: HTMLElement): void {
    const el = e instanceof HTMLElement ? e : e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    pop.classList.add('pe-pshow');
    pop.style.left = rect.left + 'px';
    pop.style.top = rect.top + rect.height + 'px';
    pop.style.minWidth = rect.width + 'px';
    setTimeout(() => {
        pop.classList.add('pe-show');
        showedPop.push(pop);
        showedPopEl.push(el);
        pop.dataset.pePopLevel = (showedPop.length - 1).toString();
    }, 34);
}

/** --- 隐藏正在显示的中的 pop --- */
export function hidePop(pop?: HTMLElement): void {
    if (!pop) {
        if (!showedPop.length) {
            return;
        }
        for (let i = showedPop.length - 1; i >= 0; --i) {
            hidePop(showedPop[i]);
        }
        return;
    }
    const level = parseInt(pop.dataset.pePopLevel ?? '-1');
    if (level === -1) {
        return;
    }
    pop.classList.remove('pe-show');
    showedPop.splice(level, 1);
    showedPopEl.splice(level, 1);
    setTimeout(() => {
        if (pop.classList.contains('pe-show')) {
            return;
        }
        pop.classList.remove('pe-pshow');
    }, 334);
}

/** --- 刷新 pop 的位置 --- */
function refreshPopPosition(): void {
    for (let i = 0; i < showedPopEl.length; ++i) {
        /** --- 响应的元素 --- */
        const el = showedPopEl[i];
        const rect = el.getBoundingClientRect();
        /** --- 弹出的 pop --- */
        const pop = showedPop[i];
        const left = rect.left + 'px';
        const top = rect.top + rect.height + 'px';
        if ((left === pop.style.left) && (top === pop.style.top)) {
            continue;
        }
        pop.style.left = left;
        pop.style.top = top;
    }
    requestAnimationFrame(refreshPopPosition);
}
refreshPopPosition();

/**
 * --- 通过 class 名查找上层所有标签是否存在 ---
 * @param el 当前标签
 * @param name 要查找的 class 名
 */
export function findParentByClass(el: HTMLElement, name: string): HTMLElement | null {
    let parent = el.parentNode as HTMLElement;
    while (parent) {
        if (!parent.tagName) {
            parent = parent.parentNode as HTMLElement;
            continue;
        }
        if (parent.tagName.toLowerCase() === 'body') {
            break;
        }
        if (parent.classList.contains(name)) {
            return parent;
        }
        parent = parent.parentNode as HTMLElement;
    }
    return null;
}

/** --- 响应按下事件 --- */
function doDown(e: TouchEvent | PointerEvent): void {
    if (!showedPop) {
        return;
    }
    const target = e.target as HTMLElement | null;
    if (!target) {
        return;
    }
    let isPop: HTMLElement | null = null;
    if (target.classList.contains('pe-pop')) {
        isPop = target;
    }
    else {
        const pop = findParentByClass(target, 'pe-pop');
        if (pop) {
            isPop = pop;
        }
    }
    if (!isPop) {
        hidePop();
        return;
    }
    // --- 在 pop 上点击的，只隐藏点击之后的 pop 层 ---
    const level = parseInt(isPop.dataset.pePopLevel ?? '-1');
    if (level === -1) {
        hidePop();
        return;
    }
    if (showedPop.length - 1 === level) {
        return;
    }
    for (let i = showedPop.length - 1; i > level; --i) {
        hidePop(showedPop[i]);
    }
}

/**
 * --- 通过 tagname 查找上层所有标签是否存在 ---
 * @param el 当前标签
 * @param name 要查找的 tagname 名，小写，如 table
 */
export function findParentByTag(el: HTMLElement, name: string): HTMLElement | null {
    let parent = el.parentNode as HTMLElement;
    while (parent) {
        if (!parent.tagName) {
            continue;
        }
        const tag = parent.tagName.toLowerCase();
        if (tag === 'body') {
            break;
        }
        if (tag === name) {
            return parent;
        }
        parent = parent.parentNode as HTMLElement;
    }
    return null;
}

/**
 * --- 判断一个元素是当前同级的第几位 ---
 * @param el 要判断的元素
 */
export function index(el: HTMLElement): number {
    let index = 0;
    let p = el.previousElementSibling;
    while (true) {
        if (!p) {
            break;
        }
        ++index;
        p = p.previousElementSibling;
    }
    return index;
}

/**
 * --- 判断是否是 rtl 布局 ---
 */
export function isRtl(): boolean {
    return document.getElementsByTagName('html')[0].classList.contains('pe-rtl');
}

/**
 * --- 获取 CSS 变量的计算值 ---
 * @param name 变量名，如 --pe
 * @param el 获取变量的元素，默认为 html
 */
export function getCssVar(name: string, el?: HTMLElement): string {
    const element = el ?? document.documentElement;
    return getComputedStyle(element).getPropertyValue(name).trim();
}

/** --- 用于颜色转换的 canvas 上下文 --- */
let colorCtx: CanvasRenderingContext2D | null = null;

/**
 * --- 将 CSS 颜色值转换为十六进制格式 ---
 * @param color CSS 颜色值
 */
export function colorToHex(color: string): string {
    if (!colorCtx) {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        colorCtx = canvas.getContext('2d', { 'willReadFrequently': true });
    }
    if (!colorCtx) {
        return '#000000';
    }
    colorCtx.fillStyle = color;
    colorCtx.fillRect(0, 0, 1, 1);
    const data = colorCtx.getImageData(0, 0, 1, 1).data;
    const hex = '#' + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + data[2]).toString(16).slice(1);
    return hex.toUpperCase();
}
