"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPop = showPop;
exports.hidePop = hidePop;
exports.hasTouchButMouse = hasTouchButMouse;
exports.findParentByClass = findParentByClass;
exports.findParentByTag = findParentByTag;
exports.index = index;
exports.bindDown = bindDown;
let lastTouchTime = 0;
document.addEventListener('touchstart', function (e) {
    lastTouchTime = Date.now();
    doDown(e);
}, {
    'passive': true
});
document.addEventListener('mousedown', (e) => {
    doDown(e);
});
const showedPop = [];
const showedPopEl = [];
function showPop(e, pop) {
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
function hidePop(pop) {
    var _a;
    if (!pop) {
        if (!showedPop.length) {
            return;
        }
        for (let i = showedPop.length - 1; i >= 0; --i) {
            hidePop(showedPop[i]);
        }
        return;
    }
    const level = parseInt((_a = pop.dataset.pePopLevel) !== null && _a !== void 0 ? _a : '-1');
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
function refreshPopPosition() {
    for (let i = 0; i < showedPopEl.length; ++i) {
        const el = showedPopEl[i];
        const rect = el.getBoundingClientRect();
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
function hasTouchButMouse(e) {
    if (e instanceof TouchEvent || e.type === 'touchstart') {
        return false;
    }
    if ((e.pointerType === 'touch') && (e.type === 'contextmenu')) {
        return true;
    }
    const now = Date.now();
    if (now - lastTouchTime < 60000) {
        return true;
    }
    return false;
}
function findParentByClass(el, name) {
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
function doDown(e) {
    var _a;
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
    const level = parseInt((_a = isPop.dataset.pePopLevel) !== null && _a !== void 0 ? _a : '-1');
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
function findParentByTag(el, name) {
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
function index(el) {
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
function bindDown(oe, opt) {
    var _a;
    if (hasTouchButMouse(oe)) {
        return;
    }
    let ox, oy;
    if (oe instanceof MouseEvent) {
        ox = oe.clientX;
        oy = oe.clientY;
    }
    else {
        ox = oe.touches[0].clientX;
        oy = oe.touches[0].clientY;
    }
    let isStart = false;
    let end = undefined;
    const move = function (e) {
        if (!e.target || !document.body.contains(e.target) && e.cancelable) {
            e.preventDefault();
        }
        let dir = 'top';
        const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
        if (x === ox && y === oy) {
            return;
        }
        const xx = x - ox;
        const xy = y - oy;
        if (Math.abs(xy) > Math.abs(xx)) {
            if (xy < 0) {
                dir = 'top';
            }
            else {
                dir = 'bottom';
            }
        }
        else {
            if (xx < 0) {
                dir = 'left';
            }
            else {
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
        var _a, _b;
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
        (_a = opt.up) === null || _a === void 0 ? void 0 : _a.call(opt, e);
        if (isStart) {
            (_b = opt.end) === null || _b === void 0 ? void 0 : _b.call(opt, e);
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
    (_a = opt.down) === null || _a === void 0 ? void 0 : _a.call(opt, oe);
}
