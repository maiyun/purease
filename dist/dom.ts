import * as types from '../types';

/** --- 最后一次 touchstart 的时间戳 */
let lastTouchTime: number = 0;
// --- 添加 touchstart 事件，既优化了点击行为，也记录了 touch 的时间戳信息 ---
document.addEventListener('touchstart', function(e: TouchEvent) {
    lastTouchTime = Date.now();
    doDown(e);
}, {
    'passive': true
});

document.addEventListener('mousedown', (e: MouseEvent) => {
    doDown(e);
});

/** --- 将 pop 显示出来 --- */
export function showPop(pop: HTMLElement) {
    pop.classList.add('pe-show');
    showedPop = pop;
}

/** --- 隐藏正在显示的中的 pop --- */
export function hidePop() {
    if (!showedPop) {
        return;
    }
    showedPop.classList.remove('pe-show');
    showedPop = null;
}

/**
 * --- 判断当前的事件是否是含有 touch 的设备触发的，如果当前就是 touch 则直接返回 false（false 代表 OK，true 代表 touch 设备却触发了 mouse 事件） ---
 */
export function hasTouchButMouse(e: MouseEvent | TouchEvent | PointerEvent): boolean {
    if (e instanceof TouchEvent || e.type === 'touchstart') {
        return false;
    }
    if (((e as any).pointerType === 'touch') && (e.type === 'contextmenu')) {
        // --- 当前是 mouse 但是却是 touch 触发的 ---
        return true;
    }
    const now = Date.now();
    if (now - lastTouchTime < 1000 * 60) {
        // --- 当前是 mouse 但是 10000ms 内有 touch start ---
        return true;
    }
    return false;
}

/**
 * --- 通过 class 名查找上层所有标签是否存在 ---
 * @param el 当前标签
 * @param name 要查找的 class 名
 */
export function findParentByClass(el: HTMLElement, name: string): HTMLElement | null {
    let parent = el.parentNode as HTMLElement;
    while (parent) {
        if (!parent.tagName) {
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

/** --- 正在显示中的 pop element --- */
let showedPop: HTMLElement | null = null;

/** --- 响应按下事件 --- */
function doDown(e: TouchEvent | MouseEvent) {
    if (hasTouchButMouse(e)) {
        return;
    }
    if (!showedPop) {
        return;
    }
    const target = e.target as HTMLElement | null;
    if (!target) {
        return;
    }
    if (target.classList.contains('pe-pop')) {
        return;
    }
    if (findParentByClass(target, 'pe-pop')) {
        return;
    }
    showedPop.classList.remove('pe-show');
    showedPop = null;
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
 * --- 绑定按下以及弹起事件，touch 和 mouse 只会绑定一个 ---
 * @param oe MouseEvent | TouchEvent
 * @param opt 回调选项
 */
export function bindDown<T extends MouseEvent | TouchEvent>(oe: T, opt: types.IBindDownOptions<T>): void {
    if (hasTouchButMouse(oe)) {
        return;
    }
    /** --- 上一次的坐标 --- */
    let ox: number, oy: number;
    if (oe instanceof MouseEvent) {
        ox = oe.clientX;
        oy = oe.clientY;
    }
    else {
        ox = oe.touches[0].clientX;
        oy = oe.touches[0].clientY;
    }

    /** --- 是否是第一次执行 move --- */
    let isStart: boolean = false;

    let end: (<TU extends T>(e: TU) => void) | undefined = undefined;
    const move = function<TU extends T>(e: TU): void {
        // --- 虽然上层已经有 preventDefault 了，但是有可能 e.target 会被注销，这样就响应不到上层的 preventDefault 事件，所以要在这里再加一个 ---
        if (!e.target || !document.body.contains(e.target as HTMLElement) && e.cancelable) {
            e.preventDefault();
        }
        /** --- 本次的移动方向 --- */
        let dir: 'top' | 'right' | 'bottom' | 'left' = 'top';
        const x: number = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const y: number = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
        if (x === ox && y === oy) {
            return;
        }
        const xx = x - ox;
        const xy = y - oy;
        if (Math.abs(xy) > Math.abs(xx)) {
            // --- 竖向滚动 ---
            if (xy < 0) {
                // -- 向上移 ---
                dir = 'top';
            }
            else {
                // -- 向下移 ---
                dir = 'bottom';
            }
        }
        else {
            // --- 横向滚动 ---
            if (xx < 0) {
                // -- 向左移 ---
                dir = 'left';
            }
            else {
                // -- 向右移 ---
                dir = 'right';
            }
        }
        ox = x;
        oy = y;

        if (!isStart) {
            isStart = true;
            if (opt.start && (opt.start(e) === false)) {
                if (e instanceof MouseEvent) {
                    window.removeEventListener('mousemove', move as EventListener);
                    window.removeEventListener('mouseup', end as EventListener);
                }
                else {
                    (oe.target as HTMLElement).removeEventListener('touchmove', move as EventListener);
                    (oe.target as HTMLElement).removeEventListener('touchend', end as EventListener);
                    (oe.target as HTMLElement).removeEventListener('touchcancel', end as EventListener);
                }
                return;
            }
        }
        if (opt.move && (opt.move(e, dir) === false)) {
            if (e instanceof MouseEvent) {
                window.removeEventListener('mousemove', move as EventListener);
                window.removeEventListener('mouseup', end as EventListener);
            }
            else {
                if (oe.target) {
                    (oe.target as HTMLElement).removeEventListener('touchmove', move as EventListener);
                    (oe.target as HTMLElement).removeEventListener('touchend', end as EventListener);
                    (oe.target as HTMLElement).removeEventListener('touchcancel', end as EventListener);
                }
            }
            return;
        }
    };
    end = function<TU extends T>(e: TU): void {
        if (e instanceof MouseEvent) {
            window.removeEventListener('mousemove', move as EventListener);
            window.removeEventListener('mouseup', end as EventListener);
        }
        else {
            if (oe.target) {
                (oe.target as HTMLElement).removeEventListener('touchmove', move as EventListener);
                (oe.target as HTMLElement).removeEventListener('touchend', end as EventListener);
                (oe.target as HTMLElement).removeEventListener('touchcancel', end as EventListener);
            }
        }
        opt.up?.(e);
        if (isStart) {
            opt.end?.(e);
        }
    };
    if (oe instanceof MouseEvent) {
        window.addEventListener('mousemove', move as (e: MouseEvent) => void, {
            'passive': false
        });
        window.addEventListener('mouseup', end as (e: MouseEvent) => void);
    }
    else {
        (oe.target as HTMLElement).addEventListener('touchmove', move as (e: TouchEvent) => void, {
            'passive': false
        });
        (oe.target as HTMLElement).addEventListener('touchend', end as (e: TouchEvent) => void);
        (oe.target as HTMLElement).addEventListener('touchcancel', end as (e: TouchEvent) => void);
    }
    opt.down?.(oe);
}
