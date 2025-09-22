/** --- 最后一次 touchstart 的时间戳 --- */
let lastTouchTime = 0;
// --- 添加 touchstart 事件，既优化了点击行为，也记录了 touch 的时间戳信息 ---
document.addEventListener('touchstart', function (e) {
    lastTouchTime = Date.now();
    doDown(e);
}, {
    'passive': true
});
document.addEventListener('mousedown', (e) => {
    doDown(e);
});
/** --- 正在显示中的 pop element --- */
const showedPop = [];
const showedPopEl = [];
/** --- 将 pop 显示出来 --- */
export function showPop(e, pop) {
    const el = e.currentTarget;
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
export function hidePop(pop) {
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
function refreshPopPosition() {
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
 * --- 判断当前的事件是否是含有 touch 的设备触发的，如果当前就是 touch 则直接返回 false（false 代表 OK，true 代表 touch 设备却触发了 mouse 事件） ---
 */
export function hasTouchButMouse(e) {
    if (e instanceof TouchEvent || e.type === 'touchstart') {
        return false;
    }
    if ((e.pointerType === 'touch') && (e.type === 'contextmenu')) {
        // --- 当前是 mouse 但是却是 touch 触发的 ---
        return true;
    }
    const now = Date.now();
    if (now - lastTouchTime < 60_000) {
        // --- 当前是 mouse 但是 60_000ms 内有 touch start ---
        return true;
    }
    return false;
}
/**
 * --- 通过 class 名查找上层所有标签是否存在 ---
 * @param el 当前标签
 * @param name 要查找的 class 名
 */
export function findParentByClass(el, name) {
    let parent = el.parentNode;
    while (parent) {
        if (!parent.tagName) {
            parent = parent.parentNode;
            continue;
        }
        if (parent.tagName.toLowerCase() === 'body') {
            break;
        }
        if (parent.classList.contains(name)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return null;
}
/** --- 响应按下事件 --- */
function doDown(e) {
    if (hasTouchButMouse(e)) {
        return;
    }
    if (!showedPop) {
        return;
    }
    const target = e.target;
    if (!target) {
        return;
    }
    let isPop = null;
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
export function findParentByTag(el, name) {
    let parent = el.parentNode;
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
        parent = parent.parentNode;
    }
    return null;
}
/**
 * --- 判断一个元素是当前同级的第几位 ---
 * @param el 要判断的元素
 */
export function index(el) {
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
export function bindDown(oe, opt) {
    if (hasTouchButMouse(oe)) {
        return;
    }
    /** --- 上一次的坐标 --- */
    let ox, oy;
    if (oe instanceof MouseEvent) {
        ox = oe.clientX;
        oy = oe.clientY;
    }
    else {
        ox = oe.touches[0].clientX;
        oy = oe.touches[0].clientY;
    }
    /** --- 是否是第一次执行 move --- */
    let isStart = false;
    let end = undefined;
    const move = function (e) {
        // --- 虽然上层已经有 preventDefault 了，但是有可能 e.target 会被注销，这样就响应不到上层的 preventDefault 事件，所以要在这里再加一个 ---
        if (!e.target || !document.body.contains(e.target) && e.cancelable) {
            e.preventDefault();
        }
        /** --- 本次的移动方向 --- */
        let dir = 'top';
        const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
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
                    window.removeEventListener('mousemove', move);
                    window.removeEventListener('mouseup', end);
                }
                else {
                    oe.target.removeEventListener('touchmove', move);
                    oe.target.removeEventListener('touchend', end);
                    oe.target.removeEventListener('touchcancel', end);
                }
                return;
            }
        }
        if (opt.move && (opt.move(e, dir) === false)) {
            if (e instanceof MouseEvent) {
                window.removeEventListener('mousemove', move);
                window.removeEventListener('mouseup', end);
            }
            else {
                if (oe.target) {
                    oe.target.removeEventListener('touchmove', move);
                    oe.target.removeEventListener('touchend', end);
                    oe.target.removeEventListener('touchcancel', end);
                }
            }
            return;
        }
    };
    end = function (e) {
        if (e instanceof MouseEvent) {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', end);
        }
        else {
            if (oe.target) {
                oe.target.removeEventListener('touchmove', move);
                oe.target.removeEventListener('touchend', end);
                oe.target.removeEventListener('touchcancel', end);
            }
        }
        opt.up?.(e);
        if (isStart) {
            opt.end?.(e);
        }
    };
    if (oe instanceof MouseEvent) {
        window.addEventListener('mousemove', move, {
            'passive': false
        });
        window.addEventListener('mouseup', end);
    }
    else {
        oe.target.addEventListener('touchmove', move, {
            'passive': false
        });
        oe.target.addEventListener('touchend', end);
        oe.target.addEventListener('touchcancel', end);
    }
    opt.down?.(oe);
}
/**
 * --- 判断是否是 rtl 布局 ---
 */
export function isRtl() {
    return document.getElementsByTagName('html')[0].classList.contains('pe-rtl');
}
