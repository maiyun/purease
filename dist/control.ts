import * as purease from './index';
import * as tool from './tool';
import * as dom from './dom';
import * as types from '../types';

/** --- 通用的一些方法和 computed --- */
export const common = {
    'computed': {
        propBoolean: function(this: types.IVue) {
            return (name: string): boolean => {
                return tool.getBoolean(this.$props[name]);
            };
        },
        propNumber: function(this: types.IVue) {
            return (name: string): number => {
                return tool.getNumber(this.$props[name]);
            };
        },
        propInt: function(this: types.IVue) {
            return (name: string): number => {
                return Math.round(this.propNumber(name));
            };
        },
        /** --- 获取 props 中的 array 类型的值 --- */
        propArray: function(this: types.IVue) {
            return (name: string): any[] => {
                return tool.getArray(this.$props[name]);
            };
        },
        /** --- 根据 control name 查询上层控件 --- */
        parentByName: function(this: types.IVue) {
            return (controlName: string): (Record<string, any>) | null => {
                let parent = this.$parent;
                while (true) {
                    if (!parent) {
                        return null;
                    }
                    if (parent.controlName === controlName) {
                        return parent;
                    }
                    parent = parent.$parent;
                }
            };
        },
        l: function(
            this: types.IVue
        ) {
            return (key: string, data?: string[]): string => {
                const loc = (this as any).localeData?.[this.$root.locale][key] ?? '[LocaleError]' + key;
                if (!data) {
                    return loc;
                }
                let i: number = -1;
                return (this as any).localeData[this.$root.locale][key].replace(/\?/g, function() {
                    ++i;
                    if (!data[i]) {
                        return '';
                    }
                    return data[i];
                });
            };
        },
        /** --- 获取 alignH 的 css 属性模式，请确保 p$rops.alignH 存在 --- */
        alignHComp: function(this: types.IVue): string | undefined {
            if (!this.$props.alignH) {
                return undefined;
            }
            switch (this.$props.alignH) {
                case 'center': {
                    return 'center';
                }
                case 'left':
                case 'start': {
                    return 'flex-start';
                }
            }
            return 'flex-end';
        },
        /** --- 获取 alignH 的 css 属性模式，请确保 props.alignH 存在 --- */
        alignVComp: function(this: types.IVue): string | undefined {
            if (!this.$props.alignV) {
                return undefined;
            }
            switch (this.$props.alignV) {
                case 'center': {
                    return 'center';
                }
                case 'top':
                case 'start': {
                    return 'flex-start';
                }
            }
            return 'flex-end';
        }
    }
};

export const list: Record<string, {
    'template': string;
    'props'?: Record<string, {
        'default': any;
    }>;
    'data'?: () => Record<string, any>;
    'computed'?: Record<string, any>;

    [key: string]: any;
}> = {};

// --- AUTO CODE ---

list['pe-banner'] = {
    'template': `<div class="pe-banner" :class="['pe-direction-'+direction]"><div class="pe-banner-content"><slot></slot></div></div>`,
    'props': {
        'direction': {
            'default': 'h'
        }
    },
};

list['pe-bar'] = {
    'template': `<div class="pe-bar" :class="['pe-theme-'+theme]"><a v-if="logoHref" class="pe-bar-logo" :href="logoHref"></a><slot></slot></div>`,
    'props': {
        'logoHref': {
            'default': ''
        },
        'theme': {
            'default': 'default'
        }
    }
};

list['pe-bar-item'] = {
    'template': `<a class="pe-bar-item" :href="href" :class="[menuCount&&'pe-list',hover&&'pe-hover']" @touchstart="enter" @mouseenter="enter" @mouseleave="leave"><slot></slot></a>`,
    'props': {
        'href': {
            'default': undefined
        }
    },
    'data': function() {
        return {
            'menuCount': 0,
            'hover': false,
        };
    },
    'methods': {
        enter: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            const target = e.target as HTMLElement;
            if (target.classList.contains('pe-menu') || dom.findParentByClass(target, 'pe-menu')) {
                return;
            }
            if (!this.href) {
                e.preventDefault();
            }
            this.hover = !this.hover;
        },
        leave: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            this.hover = false;
        },
    },
};

list['pe-btab'] = {
    'template': `<div class="pe-btab" :class="[isScroll&&(translate<0)&&'pe-btab-left',isScroll&&(translate>-max)&&'pe-btab-right','pe-type-'+type]" @mousedown="down" @touchstart="down"><div class="pe-btab-content" ref="content" :style="{'transform':'translateX(' + this.translate + 'px)'}"><div v-for="item, i of data" class="pe-btab-item" :class="[(i===index)&&'pe-selected']" @click="select(i)">{{item}}</div></div></div>`,
    'props': {
        'modelValue': {
            'default': 0
        },
        'data': {
            'default': [],
        },
        'type': {
            'default': 'default',
        },
    },
    data: function() {
        return {
            /** --- 当前位置 --- */
            'translate': 0,
            /** --- 当前选中 --- */
            'index': 0,
            /** --- 最大位移 --- */
            'max': 0,
            /** --- 全宽 --- */
            'width': 0,
            /** --- 内容宽 --- */
            'cwidth': 0,
        };
    },
    'computed': {
        isScroll: function(this: types.IVue): boolean {
            return this.cwidth > this.width;
        },
    },
    'methods': {
        select: function(this: types.IVue, index: number) {
            this.index = index;
            this.$emit('modelValue', index);
        },
        down: function(this: types.IVue, e: TouchEvent | MouseEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            if (this.cwidth <= this.width) {
                return;
            }
            /** --- 最大能滚动 --- */
            const target = e.target as HTMLElement | null;
            if (!target) {
                return;
            }
            /** --- 原始 x 位置 --- */
            const ox = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
            /** --- 上次的 x 位置 --- */
            let x = ox;
            dom.bindDown(e, {
                move: (ne) => {
                    // --- 当前的位置 ---
                    const nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                    /** --- 移动的差值 --- */
                    const cx = nx - x;
                    x = nx;
                    this.translate += cx;
                    if (this.translate < -this.max) {
                        this.translate = -this.max;
                    }
                    else if (this.translate > 0) {
                        this.translate = 0;
                    }
                },
            });
        },
        resize: function(this: types.IVue) {
            this.width = this.$el.offsetWidth;
            this.cwidth = this.$refs.content.offsetWidth;
            if (this.cwidth <= this.width) {
                this.max = 0;
                this.translate = 0;
                return;
            }
            this.max = this.cwidth - this.width;
            if (this.translate < -this.max) {
                this.translate = -this.max;
            }
            else if (this.translate > 0) {
                this.translate = 0;
            }
        },
    },
    mounted: function(this: types.IVue) {
        this.$watch('modelValue', () => {
            this.index = this.$props.modelValue;
        }, {
            'immediate': true,
        });
        window.addEventListener('resize', this.resize);
        this.resize();
    },
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        window.removeEventListener('resize', this.resize);
    }
};

list['pe-captcha'] = {
    'template': `<div class="pe-captcha" :class="[notInit&&'pe-not','pe-captcha-'+state,'pe-captcha-'+factory]" @click="click"></div>`,
    'props': {
        'factory': {
            'default': 'tc',
        },
        'akey': {
            'default': '',
        },
    },
    'emits': {
        'result': null,
    },
    'data': function() {
        return {
            /** --- 是否没有初始化 --- */
            'notInit': false,
            /** --- 当前状态 --- */
            'state': '',
            'localeData': {
                'en': {
                    'click': 'Click to verify',
                    'failed': 'Failed, retry',
                    'successful': 'Verified'
                },
                'sc': {
                    'click': '点击进行验证',
                    'failed': '失败，点击重试',
                    'successful': '验证成功'
                },
                'tc': {
                    'click': '點選進行驗證',
                    'failed': '失敗，點選重試',
                    'successful': '驗證成功'
                },
                'ja': {
                    'click': '認証する',
                    'failed': '失敗、再試行',
                    'successful': '成功'
                },
                'ko': {
                    'click': '인증하기',
                    'failed': '실패, 재시도',
                    'successful': '성공'
                },
                'th': {
                    'click': 'ยืนยัน',
                    'failed': 'ล้มเหลว, ลองอีก',
                    'successful': 'สำเร็จ'
                },
                'es': {
                    'click': 'Verificar',
                    'failed': 'Error, reintenta',
                    'successful': 'Verificado'
                },
                'de': {
                    'click': 'Prüfen',
                    'failed': 'Fehler, retry',
                    'successful': 'Erfolgreich'
                },
                'fr': {
                    'click': 'Vérifier',
                    'failed': 'Échec, réessayer',
                    'successful': 'Réussi'
                },
                'pt': {
                    'click': 'Verificar',
                    'failed': 'Falha, retry',
                    'successful': 'Sucesso'
                },
                'ru': {
                    'click': 'Проверить',
                    'failed': 'Ошибка, повтор',
                    'successful': 'Успешно'
                },
                'vi': {
                    'click': 'Xác minh',
                    'failed': 'Thất bại, thử lại',
                    'successful': 'Thành công'
                }
            },
        };
    },
    'methods': {
        /** --- 供外部调用的 --- */
        reset: function(this: types.IVue): void {
            if (this.factory === 'tc') {
                // --- 腾讯云验证码 ---
                this.state = '';
                this.$el.innerHTML = this.l('click');
                return;
            }
            // --- CF 验证码 ---
            if (!this.access.lib || !this.access.instance) {
                return;
            }
            this.access.lib.reset(this.access.instance);
        },
        /** --- 腾讯云验证码显示 --- */
        click: function(this: types.IVue): void {
            if (!this.access.instance) {
                return;
            }
            if (this.$props.factory !== 'tc') {
                return;
            }
            this.access.instance.show();
        },
    },
    mounted: async function(this: types.IVue) {
        this.access = {
            'instance': undefined,
        };
        if (this.$props.factory === 'tc') {
            // --- 腾讯云验证码 ---
            if (!(window as any).TencentCaptcha) {
                await loader.loadScripts([
                    'https://turing.captcha.qcloud.com/TJCaptcha.js'
                ]);
            }
            const tcc = (window as any).TencentCaptcha;
            if (!tcc) {
                this.notInit = true;
                this.$el.innerHTML = 'Captcha module not found.';
                return;
            }
            this.$el.innerHTML = this.l('click');
            try {
                const captcha = new tcc(this.$props.akey, (res: any) => {
                    if (res.ret === 0 && !res.errorCode) {
                        this.state = 'successful';
                        this.$el.innerHTML = this.l('successful');
                    }
                    else {
                        this.state = 'failed';
                        this.$el.innerHTML = this.l('failed');
                    }
                    const event: types.ICaptchaResultEvent = {
                        'detail': {
                            'result': (res.ret === 0 && !res.errorCode) ? 1 : 0,
                            'token': res.ticket + '|' + res.randstr,
                        },
                    };
                    this.$emit('result', event);
                }, {
                    'needFeedBack': false,
                });
                this.access.instance = captcha;
            }
            catch {
                this.notInit = true;
                this.$el.innerHTML = 'Captcha module not found.';
                return;
            }
            // --- 初始化成功 ---
            return;
        }
        // --- CF 验证码 ---
        if (!(window as any).turnstile) {
            await loader.loadScripts([
                'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
            ]);
        }
        const cft = (window as any).turnstile;
        if (!cft) {
            this.notInit = true;
            this.$el.innerHTML = 'Captcha module not found.';
            return;
        }
        if (!this.$props.akey) {
            this.notInit = true;
            this.$el.innerHTML = 'Missing: akey';
            return;
        }
        const captcha = cft.render(this.$el, {
            'sitekey': this.$props.akey,
            'size': 'flexible',
            callback: (token: string) => {
                const event: types.ICaptchaResultEvent = {
                    'detail': {
                        'result': 1,
                        'token': token,
                    },
                };
                this.$emit('result', event);
            },
        });
        this.access.instance = captcha;
        // --- 初始化成功 ---
    },
    unmounted: function(this: types.IVue) {
        if (this.$props.factory === 'tc') {
            this.access.instance = undefined;
            return;
        }
        if (!this.access.instance) {
            return;
        }
        (window as any).turnstile.remove(this.access.instance);
    }
};

list['pe-check'] = {
    'template': `<div class="pe-check" :class="[value&&'pe-checked']" @click="click" tabindex="0"><div class="pe-check-box"><svg viewBox="0 0 24 24" stroke="none"><path d="M9.00001 18.25C8.8993 18.2466 8.80034 18.2227 8.70921 18.1797C8.61807 18.1367 8.53667 18.0756 8.47001 18L3.47001 13C3.37467 12.9382 3.29463 12.8556 3.23592 12.7583C3.17721 12.661 3.14136 12.5517 3.13109 12.4385C3.12082 12.3254 3.13639 12.2114 3.17663 12.1051C3.21686 11.9989 3.28071 11.9031 3.36336 11.8252C3.446 11.7472 3.54528 11.689 3.65369 11.6551C3.76211 11.6211 3.87682 11.6122 3.98918 11.629C4.10155 11.6458 4.20861 11.688 4.3023 11.7523C4.39599 11.8165 4.47385 11.9013 4.53001 12L9.00001 16.44L19.47 6.00003C19.611 5.90864 19.7785 5.86722 19.9458 5.88241C20.1131 5.89759 20.2705 5.96851 20.3927 6.08379C20.5149 6.19907 20.5948 6.35203 20.6197 6.51817C20.6446 6.68431 20.613 6.85399 20.53 7.00003L9.53001 18C9.46334 18.0756 9.38194 18.1367 9.29081 18.1797C9.19967 18.2227 9.10072 18.2466 9.00001 18.25Z"/></svg></div><div class="pe-check-label"><slot></slot></div></div>`,
    'props': {
        'modelValue': {
            'default': false
        }
    },
    'data': function() {
        return {
            'value': false
        };
    },
    'methods': {
        click: function(this: types.IVue, e: MouseEvent) {
            const target = e.target as HTMLElement | null;
            if (!target) {
                return;
            }
            if (target.tagName.toLowerCase() === 'a') {
                return;
            }
            if (dom.findParentByTag(target, 'a')) {
                return;
            }
            this.value = !this.value;
            this.$emit('update:modelValue', this.value);
        },
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                this.value = this.modelValue;
            },
            'immediate': true
        }
    },
};

list['pe-date'] = {
    'template': `<div class="pe-date-wrap" :class="[propBoolean('disabled')&&'pe-disabled']"><div class="pe-date-first"><div @click="click($event, 'first')" ref="first" v-if="propBoolean('date') || propBoolean('time')"><template v-if="timestamp === undefined"><div>{{l('please click select')}}</div></template><template v-else><div v-if="propBoolean('date')">{{dateStr}}</div><div v-if="propBoolean('time')">{{timeStr}}</div></template></div><div v-if="propBoolean('zone')" @click="click($event, 'zone')" ref="zone">UTC{{tzData >= 0 ? '+' : ''}}{{tzData}}</div></div><div class="pe-date-clear" @click="clear" v-if="timestamp !== undefined"><svg viewBox="0 0 24 24" stroke="none"><path d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z" /></svg></div><div v-if="propBoolean('date')" ref="firstpop" class="pe-pop"><pe-datepanel plain :tz="tzData" :yearmonth="yearmonth" :hourminute="hourminute" @update:yearmonth="$emit('update:yearmonth')" :clearbtn="false" :time="propBoolean('time')" :start="start" :end="end" v-model="timestamp" @changed="changed" @selected="selected"><template v-if="$slots['default']" v-slot="col"><slot :year="col.year" :month="col.month" :date="col.date" :day="col.day" :str="col.str" :time="col.time"></slot></template></pe-datepanel></div><div v-if="!propBoolean('date') && propBoolean('time')" ref="timepop" class="pe-pop pe-date-list"><div><div class="pe-date-item"><div class="pe-date-title">{{l('hour')}}</div><pe-dlist :data="hours" v-model="vhour"></pe-dlist></div><div class="pe-date-item"><div class="pe-date-title">{{l('minute')}}</div><pe-dlist :data="minutes" v-model="vminute"></pe-dlist></div><div class="pe-date-item"><div class="pe-date-title">{{l('second')}}</div><pe-dlist :data="seconds" v-model="vseconds"></pe-dlist></div></div><div><div class="pe-button pe-pgrey" @click="cancel">{{l('cancel')}}</div><div class="pe-button pe-pgrey" @click="timeOk">{{l('ok')}}</div></div></div><div v-if="propBoolean('zone')" ref="zonepop" class="pe-pop pe-date-list"><div><div class="pe-date-item"><div class="pe-date-title">{{l('zone')}}</div><pe-dlist :data="zones" v-model="vzone"></pe-dlist></div><div class="pe-date-item"><div class="pe-date-title">{{l('minute')}}</div><pe-dlist :data="zdecs" v-model="vzdec"></pe-dlist></div></div><div><div class="pe-button pe-pgrey" @click="cancel">{{l('cancel')}}</div><div class="pe-button pe-pgrey" @click="zoneOk">{{l('ok')}}</div></div></div></div>`,
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'update:tz': null,
        'update:yearmonth': null,
        'update:hourminute': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },

        /** --- 当前日期时间戳，毫秒 --- */
        'modelValue': {
            'default': undefined,
        },
        /** --- 小时，如 8 --- */
        'tz': {
            'default': undefined,
        },
        /** --- 年份月份的组合，如 200708，自动跳转到此页面但不选中 --- */
        'yearmonth': {
            'default': '',
        },
        /** --- 时分秒的字符串，跳转也自动选中 --- */
        'hourminute': {
            'default': '',
        },
        /** --- 限定可选的最小时间 --- */
        'start': {
            'default': undefined,
        },
        /** --- 限定可选的最大时间 --- */
        'end': {
            'default': undefined,
        },

        'date': {
            'default': true,
        },
        'time': {
            'default': true,
        },
        'zone': {
            'default': false,
        }
    },
    data: function() {
        return {
            'dateObj': new Date(),

            /** --- 时间戳基数（真正的选择的时间戳） --- */
            'timestamp': undefined,
            'dateStr': '',
            'timeStr': '',
            /** --- 当前时区信息（小时） --- */
            'tzData': 0,
            'vhour': '00',
            'hours': [],
            'vminute': '00',
            'minutes': [],
            'vseconds': '00',
            'seconds': [],
            'vzone': '+0',
            'zones': [],
            'vzdec': '00',
            'zdecs': ['00', '15', '30', '45'],

            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'hour': 'Hr',
                    'minute': 'Min',
                    'second': 'Sec',
                    'zone': 'Zone',
                    'cancel': 'Cancel',
                    'ok': 'OK',
                    'please click select': 'Click to select'
                },
                'sc': {
                    'hour': '时',
                    'minute': '分',
                    'second': '秒',
                    'zone': '时区',
                    'cancel': '取消',
                    'ok': '确定',
                    'please click select': '请点击选择'
                },
                'tc': {
                    'hour': '時',
                    'minute': '分',
                    'second': '秒',
                    'zone': '時區',
                    'cancel': '取消',
                    'ok': '確定',
                    'please click select': '請點擊選擇'
                },
                'ja': {
                    'hour': '時',
                    'minute': '分',
                    'second': '秒',
                    'zone': '時區', // --- タイムゾーン ---
                    'cancel': '取消',
                    'ok': '確定',
                    'please click select': '選択して下さい'
                },
                'ko': {
                    'hour': '시',
                    'minute': '분',
                    'second': '초',
                    'zone': '時區', // --- 시간대 ---
                    'cancel': '취소',
                    'ok': '확인',
                    'please click select': '선택 클릭'
                },
                'th': {
                    'hour': 'ชม.',
                    'minute': 'น.',
                    'second': 'วิ',
                    'zone': 'เขต',
                    'cancel': 'ยกเลิก',
                    'ok': 'ตกลง',
                    'please click select': 'คลิกเลือก'
                },
                'es': {
                    'hour': 'Hr',
                    'minute': 'Min',
                    'second': 'Seg',
                    'zone': 'Zona',
                    'cancel': 'Cancelar',
                    'ok': 'OK',
                    'please click select': 'Clic para elegir'
                },
                'de': {
                    'hour': 'Std',
                    'minute': 'Min',
                    'second': 'Sek',
                    'zone': 'Zone',
                    'cancel': 'Abbr.',
                    'ok': 'OK',
                    'please click select': 'Klicken Sie wählen'
                },
                'fr': {
                    'hour': 'Hr',   // 或 'H'
                    'minute': 'Min',
                    'second': 'Sec',
                    'zone': 'Zone',
                    'cancel': 'Annul.',
                    'ok': 'OK',
                    'please click select': 'Cliquer choisir'
                },
                'pt': {
                    'hour': 'Hr',
                    'minute': 'Min',
                    'second': 'Seg',
                    'zone': 'Fuso',
                    'cancel': 'Cancelar',
                    'ok': 'OK',
                    'please click select': 'Clique para sel.'
                },
                'ru': {
                    'hour': 'Час',
                    'minute': 'Мин',
                    'second': 'Сек',
                    'zone': 'Зона',
                    'cancel': 'Отмена',
                    'ok': 'ОК',
                    'please click select': 'Нажмите выбрать'
                },
                'vi': {
                    'hour': 'Giờ',
                    'minute': 'Phút',
                    'second': 'Giây',
                    'zone': 'Múi',
                    'cancel': 'Hủy',
                    'ok': 'OK',
                    'please click select': 'Nhấn chọn'
                }
            }
        };
    },
    'methods': {
        // --- 单击事件 ---
        click: function(this: types.IVue, e: MouseEvent, type: 'first' | 'zone'): void {
            const el = this.$refs[type + 'pop'];
            if (el.classList.contains('pe-show')) {
                dom.hidePop(el);
                return;
            }
            if (type === 'first' && !this.propBoolean('date')) {
                dom.showPop(e, this.$refs['timepop']);
                return;
            }
            dom.showPop(e, el);
        },
        zoneOk: function(this: types.IVue): void {
            const vz = parseInt(this.vzone);
            if (vz >= 0) {
                this.tzData = vz + (parseInt(this.vzdec) / 60);
            }
            else {
                this.tzData = vz - (parseInt(this.vzdec) / 60);
            }
            this.$emit('update:tz', this.tzData);
            const ts = this.dateObj.getTime() - this.tzData * 60 * 60 * 1000;
            if (this.timestamp !== undefined && ts !== this.timestamp) {
                this.timestamp = ts;
                this.$emit('update:modelValue', this.timestamp);
                const event: types.IDateChangedEvent = {
                    'detail': {
                        'value': this.timestamp
                    }
                };
                this.$emit('changed', event);
            }
            dom.hidePop();
        },
        timeOk: function(this: types.IVue): void {
            this.dateObj.setUTCHours(
                parseInt(this.vhour), parseInt(this.vminute), parseInt(this.vseconds), 0
            );
            this.timestamp = this.dateObj.getTime() - this.tzData * 60 * 60 * 1000;
            this.dateStr = this.dateObj.getUTCFullYear().toString() + '-' + (this.dateObj.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + this.dateObj.getUTCDate().toString().padStart(2, '0');
            this.timeStr = this.dateObj.getUTCHours().toString().padStart(2, '0') + ':' + this.dateObj.getUTCMinutes().toString().padStart(2, '0') + ':' + this.dateObj.getUTCSeconds().toString().padStart(2, '0');
            this.$emit('update:modelValue', this.timestamp);
            const event: types.IDateChangedEvent = {
                'detail': {
                    'value': this.timestamp
                }
            };
            this.$emit('changed', event);
            this.$emit('update:hourminute', this.vhour + this.vminute + this.vseconds);
            dom.hidePop();
        },
        cancel: function(): void {
            dom.hidePop();
        },
        clear: function(this: types.IVue): void {
            this.timestamp = undefined;
            this.$emit('update:modelValue', undefined);
        },
        // --- date panel 的 changed ---
        changed: function(this: types.IVue): void {
            this.$emit('update:modelValue', this.timestamp);
            const event: types.IDateChangedEvent = {
                'detail': {
                    'value': this.timestamp
                }
            };
            this.$emit('changed', event);
            if (this.timestamp === undefined) {
                return;
            }
            this.dateObj.setTime(this.timestamp + this.tzData * 60 * 60 * 1000);
            this.dateStr = this.dateObj.getUTCFullYear().toString() + '-' + (this.dateObj.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + this.dateObj.getUTCDate().toString().padStart(2, '0');
            const hour = this.dateObj.getUTCHours().toString().padStart(2, '0');
            const minute = this.dateObj.getUTCMinutes().toString().padStart(2, '0');
            const seconds = this.dateObj.getUTCSeconds().toString().padStart(2, '0');
            this.timeStr = hour + ':' + minute + ':' + seconds;
            const hourminute = hour + minute + seconds;
            if (hourminute !== this.$props.hourminute) {
                this.$emit('update:hourminute', hour + minute + seconds);
            }
        },
        selected: function(this: types.IVue): void {
            dom.hidePop(this.$refs.firstpop);
        }
    },
    'mounted': function(this: types.IVue) {
        // --- 填充年时分秒时区 ---
        for (let i = 0; i <= 23; ++i) {
            this.hours.push(i.toString().padStart(2, '0'));
        }
        for (let i = 0; i <= 59; ++i) {
            this.minutes.push(i.toString().padStart(2, '0'));
        }
        for (let i = 0; i <= 59; ++i) {
            this.seconds.push(i.toString().padStart(2, '0'));
        }
        for (let i = -12; i <= 14; ++i) {
            this.zones.push((i >= 0 ? '+' : '') + i.toString());
        }
        // --- 监测 prop 时区信息变动 ---
        this.$watch('tz', () => {
            let tz: number = 0;
            if (this.$props.tz === undefined) {
                tz = -(this.dateObj.getTimezoneOffset() / 60);
                this.$emit('update:tz', tz);
            }
            else {
                tz = this.propNumber('tz');
            }
            if (this.tzData === tz) {
                return;
            }
            this.tzData = tz;
            const z = this.tzData.toString().split('.');
            this.vzone = (parseInt(z[0]) >= 0 ? '+' : '') + z[0];
            this.vzdec = z[1] ? (parseFloat('0.' + z[1]) * 60).toString() : '00';
            // --- 更新时间戳 ---
            if (this.timestamp !== undefined) {
                this.$emit('update:modelValue', this.dateObj.getTime() - this.tzData * 60 * 60_000);
            }
        }, {
            'immediate': true
        });
        this.$watch('modelValue', () => {
            if (this.$props.modelValue === undefined) {
                this.timestamp = undefined;
                this.vhour = '00';
                this.vminute = '00';
                this.vseconds = '00';
                return;
            }
            if (this.timestamp === this.propInt('modelValue')) {
                return;
            }
            this.timestamp = this.propInt('modelValue');
            this.dateObj.setTime(this.timestamp + this.tzData * 60 * 60 * 1_000);
            this.dateStr = this.dateObj.getUTCFullYear().toString() + '-' + (this.dateObj.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + this.dateObj.getUTCDate().toString().padStart(2, '0');
            this.timeStr = this.dateObj.getUTCHours().toString().padStart(2, '0') + ':' + this.dateObj.getUTCMinutes().toString().padStart(2, '0') + ':' + this.dateObj.getUTCSeconds().toString().padStart(2, '0');
            this.vhour = this.dateObj.getUTCHours().toString().padStart(2, '0');
            this.vminute = this.dateObj.getUTCMinutes().toString().padStart(2, '0');
            this.vseconds = this.dateObj.getUTCSeconds().toString().padStart(2, '0');
        }, {
            'immediate': true
        });
        // --- 时分秒 ---
        this.$watch('hourminute', () => {
            const hm = this.vhour + this.vminute + this.vseconds;
            if (!this.$props.hourminute) {
                this.$emit('update:hourminute', hm);
                return;
            }
            if (this.$props.hourminute !== hm) {
                this.vhour = this.$props.hourminute.slice(0, 2);
                this.vminute = this.$props.hourminute.slice(2, 4);
                this.vseconds = this.$props.hourminute.slice(4);
            }
        }, {
            'immediate': true
        });
    }
};

list['pe-datepanel'] = {
    'template': `<div class="pe-datepanel-wrap" :class="[propBoolean('plain')&&'pe-plain',propBoolean('disabled')&&'pe-disabled']"><div class="pe-datepanel-header"><div class="pe-datepanel-left"><pe-select :data="years" v-model="vyear"></pe-select><div class="pe-button pe-pgrey pe-datepanel-monthleft" :class="[(prevYm<startYm)&&'pe-disabled']" @click="prev"><div class="pe-datepanel-arrow"></div></div><pe-select :data="months" v-model="vmonth"></pe-select><div class="pe-button pe-pgrey pe-datepanel-monthright" :class="(nextYm>endYm)&&'pe-disabled'" @click="next"><div class="pe-datepanel-arrow"></div></div></div><div class="pe-datepanel-right"><div class="pe-button pe-pgrey" v-if="propBoolean('clearbtn') && (timestamp !== undefined)" @click="clear">{{l('clear')}}</div><div class="pe-button pe-pgrey" v-if="propBoolean('backbtn') && (timestamp !== undefined) && ((dateValue.year !== parseInt(vyear)) || (dateValue.month !== parseInt(vmonth) - 1))" @click="back">{{l('back')}}</div><div class="pe-button pe-pgrey" @click="today">{{l('today')}}</div></div></div><div class="pe-datepanel-week"><div v-for="col of 7">{{l('w' + (col - 1))}}</div></div><div class="pe-datepanel-row" v-for="row of maps"><div class="pe-datepanel-col" v-for="col of row" :style="{'color': col.month !== (vmonth - 1) ? 'var(--pe-disabled-color)' : undefined}" :class="[{'pe-selected': timestamp !== undefined && (dateValue.year === col.year) && (dateValue.month === col.month) && (dateValue.date === col.date)}, toclass(col), isDisabled(col) && 'pe-disabled']" @click="colClick(col)" @mouseenter="colenter($event, col)" @touchstart="colenter($event, col)"><div class="pe-datepanel-colh">{{col.date}}</div><div class="pe-datepanel-colb" v-if="$slots['default']"><slot :year="col.year" :month="col.month" :date="col.date" :day="col.day" :str="col.str" :time="col.time"></slot></div></div></div><div class="pe-datepanel-footer" v-if="propBoolean('time') || propBoolean('zone')"><template v-if="propBoolean('time')"><pe-select :data="hours" v-model="vhour"></pe-select><label>:</label><pe-select :data="minutes" v-model="vminute"></pe-select><label>:</label><pe-select :data="seconds" v-model="vseconds"></pe-select></template><template v-if="propBoolean('zone')"><label>UTC</label><pe-select :data="zones" v-model="vzone"></pe-select><pe-select :data="zdecs" v-model="vzdec"></pe-select></template></div></div>`,
    'emits': {
        'changed': null,
        'selected': null,
        'range': null,

        'update:modelValue': null,
        'update:tz': null,
        'update:yearmonth': null,
        'update:hourminute': null,
        'update:cursor': null
    },
    'props': {
        'disabled': {
            'default': false,
        },
        'readonly': {
            'default': false,
        },
        'plain': {
            'default': false,
        },

        'modelValue': {
            'default': undefined,
        },
        'start': {
            'default': undefined,
        },
        'end': {
            'default': undefined,
        },
        'tz': {
            'default': undefined,
        },
        'yearmonth': {
            'default': '',
        },
        'hourminute': {
            'default': '',
        },
        'cursor': {
            'default': '',
        },
        'jump': {
            'default': true,
        },

        'time': {
            'default': true,
        },
        'zone': {
            'default': false,
        },

        'range': {
            'default': false,
        },
        'clearbtn': {
            'default': true,
        },
        'backbtn': {
            'default': true
        }
    },
    data: function() {
        return {
            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'w0': 'Sun',
                    'w1': 'Mon',
                    'w2': 'Tue',
                    'w3': 'Wed',
                    'w4': 'Thu',
                    'w5': 'Fri',
                    'w6': 'Sat',
                    'm1': 'Jan',
                    'm2': 'Feb',
                    'm3': 'Mar',
                    'm4': 'Apr',
                    'm5': 'May',
                    'm6': 'Jun',
                    'm7': 'Jul',
                    'm8': 'Aug',
                    'm9': 'Sep',
                    'm10': 'Oct',
                    'm11': 'Nov',
                    'm12': 'Dec',
                    'year': 'Year',
                    'today': 'Today',
                    'back': 'Back',
                    'clear': 'Clear'
                },
                'sc': {
                    'w0': '日',
                    'w1': '一',
                    'w2': '二',
                    'w3': '三',
                    'w4': '四',
                    'w5': '五',
                    'w6': '六',
                    'm1': '1月',
                    'm2': '2月',
                    'm3': '3月',
                    'm4': '4月',
                    'm5': '5月',
                    'm6': '6月',
                    'm7': '7月',
                    'm8': '8月',
                    'm9': '9月',
                    'm10': '10月',
                    'm11': '11月',
                    'm12': '12月',
                    'year': '年',
                    'today': '今天',
                    'back': '返回',
                    'clear': '清除',
                },
                'tc': {
                    'w0': '日',
                    'w1': '一',
                    'w2': '二',
                    'w3': '三',
                    'w4': '四',
                    'w5': '五',
                    'w6': '六',
                    'm1': '1月',
                    'm2': '2月',
                    'm3': '3月',
                    'm4': '4月',
                    'm5': '5月',
                    'm6': '6月',
                    'm7': '7月',
                    'm8': '8月',
                    'm9': '9月',
                    'm10': '10月',
                    'm11': '11月',
                    'm12': '12月',
                    'year': '年',
                    'today': '今天',
                    'back': '返回',
                    'clear': '清除',
                },
                'ja': {
                    'w0': '日',
                    'w1': '月',
                    'w2': '火',
                    'w3': '水',
                    'w4': '木',
                    'w5': '金',
                    'w6': '土',
                    'm1': '1月',
                    'm2': '2月',
                    'm3': '3月',
                    'm4': '4月',
                    'm5': '5月',
                    'm6': '6月',
                    'm7': '7月',
                    'm8': '8月',
                    'm9': '9月',
                    'm10': '10月',
                    'm11': '11月',
                    'm12': '12月',
                    'year': '年',
                    'today': '今日',
                    'back': '戻る',
                    'clear': 'クリア',
                },
                'ko': {
                    'w0': '일',
                    'w1': '월',
                    'w2': '화',
                    'w3': '수',
                    'w4': '목',
                    'w5': '금',
                    'w6': '토',
                    'm1': '1월',
                    'm2': '2월',
                    'm3': '3월',
                    'm4': '4월',
                    'm5': '5월',
                    'm6': '6월',
                    'm7': '7월',
                    'm8': '8월',
                    'm9': '9월',
                    'm10': '10월',
                    'm11': '11월',
                    'm12': '12월',
                    'year': '년',
                    'today': '오늘',
                    'back': '뒤로',
                    'clear': '지우기',
                },
                'th': {
                    'w0': 'อา',
                    'w1': 'จ',
                    'w2': 'อ',
                    'w3': 'พ',
                    'w4': 'พฤ',
                    'w5': 'ศ',
                    'w6': 'ส',
                    'm1': 'ม.ค.',
                    'm2': 'ก.พ.',
                    'm3': 'มี.ค.',
                    'm4': 'เม.ย.',
                    'm5': 'พ.ค.',
                    'm6': 'มิ.ย.',
                    'm7': 'ก.ค.',
                    'm8': 'ส.ค.',
                    'm9': 'ก.ย.',
                    'm10': 'ต.ค.',
                    'm11': 'พ.ย.',
                    'm12': 'ธ.ค.',
                    'year': 'ปี',
                    'today': 'วันนี้',
                    'back': 'กลับ',
                    'clear': 'ล้าง',
                },
                'es': {
                    'w0': 'Dom',
                    'w1': 'Lun',
                    'w2': 'Mar',
                    'w3': 'Mié',
                    'w4': 'Jue',
                    'w5': 'Vie',
                    'w6': 'Sáb',
                    'm1': 'Ene',
                    'm2': 'Feb',
                    'm3': 'Mar',
                    'm4': 'Abr',
                    'm5': 'May',
                    'm6': 'Jun',
                    'm7': 'Jul',
                    'm8': 'Ago',
                    'm9': 'Sep',
                    'm10': 'Oct',
                    'm11': 'Nov',
                    'm12': 'Dic',
                    'year': 'Año',
                    'today': 'Hoy',
                    'back': 'Volver',
                    'clear': 'Claro',
                },
                'de': {
                    'w0': 'So',
                    'w1': 'Mo',
                    'w2': 'Di',
                    'w3': 'Mi',
                    'w4': 'Do',
                    'w5': 'Fr',
                    'w6': 'Sa',
                    'm1': 'Jan',
                    'm2': 'Feb',
                    'm3': 'Mär',
                    'm4': 'Apr',
                    'm5': 'Mai',
                    'm6': 'Jun',
                    'm7': 'Jul',
                    'm8': 'Aug',
                    'm9': 'Sep',
                    'm10': 'Okt',
                    'm11': 'Nov',
                    'm12': 'Dez',
                    'year': 'Jahr',
                    'today': 'Heute',
                    'back': 'Zurück',
                    'clear': 'Löschen',
                },
                'fr': {
                    'w0': 'Dim',
                    'w1': 'Lun',
                    'w2': 'Mar',
                    'w3': 'Mer',
                    'w4': 'Jeu',
                    'w5': 'Ven',
                    'w6': 'Sam',
                    'm1': 'Jan',
                    'm2': 'Fév',
                    'm3': 'Mar',
                    'm4': 'Avr',
                    'm5': 'Mai',
                    'm6': 'Juin',
                    'm7': 'Juil',
                    'm8': 'Aoû',
                    'm9': 'Sep',
                    'm10': 'Oct',
                    'm11': 'Nov',
                    'm12': 'Déc',
                    'year': 'Année',
                    'today': 'Aujourd\'hui',
                    'back': 'Retour',
                    'clear': 'Effacer',
                },
                'pt': {
                    'w0': 'Dom',
                    'w1': 'Seg',
                    'w2': 'Ter',
                    'w3': 'Qua',
                    'w4': 'Qui',
                    'w5': 'Sex',
                    'w6': 'Sáb',
                    'm1': 'Jan',
                    'm2': 'Fev',
                    'm3': 'Mar',
                    'm4': 'Abr',
                    'm5': 'Mai',
                    'm6': 'Jun',
                    'm7': 'Jul',
                    'm8': 'Ago',
                    'm9': 'Set',
                    'm10': 'Out',
                    'm11': 'Nov',
                    'm12': 'Dez',
                    'year': 'Ano',
                    'today': 'Hoje',
                    'back': 'Voltar',
                    'clear': 'Limpar',
                },
                'ru': {
                    'w0': 'Вс',
                    'w1': 'Пн',
                    'w2': 'Вт',
                    'w3': 'Ср',
                    'w4': 'Чт',
                    'w5': 'Пт',
                    'w6': 'Сб',
                    'm1': 'Янв',
                    'm2': 'Фев',
                    'm3': 'Мар',
                    'm4': 'Апр',
                    'm5': 'Май',
                    'm6': 'Июн',
                    'm7': 'Июл',
                    'm8': 'Авг',
                    'm9': 'Сен',
                    'm10': 'Окт',
                    'm11': 'Ноя',
                    'm12': 'Дек',
                    'year': 'Год',
                    'today': 'Сегодня',
                    'back': 'Назад',
                    'clear': 'Очистить',
                },
                'vi': {
                    'w0': 'CN',
                    'w1': 'T2',
                    'w2': 'T3',
                    'w3': 'T4',
                    'w4': 'T5',
                    'w5': 'T6',
                    'w6': 'T7',
                    'm1': 'Th1',
                    'm2': 'Th2',
                    'm3': 'Th3',
                    'm4': 'Th4',
                    'm5': 'Th5',
                    'm6': 'Th6',
                    'm7': 'Th7',
                    'm8': 'Th8',
                    'm9': 'Th9',
                    'm10': 'Th10',
                    'm11': 'Th11',
                    'm12': 'Th12',
                    'year': 'Năm',
                    'today': 'Hôm nay',
                    'back': 'Trở lại',
                    'clear': 'Xóa',
                }
            },
            /** --- 当前 date 对象 --- */
            'dateObj': new Date(),
            /** --- 当前 date 对象的 utc 值 --- */
            'dateValue': {
                'year': 0,
                'month': 0,
                'date': 0
            },
            'timestamp': undefined,
            'startDate': new Date(),
            'startTs': 0,
            'startValue': {
                'year': 0,
                'month': 0,
                'date': 0
            },
            'endDate': new Date(),
            'endTs': 0,
            'endValue': {
                'year': 0,
                'month': 0,
                'date': 0
            },
            /** --- 当前时区信息（小时） --- */
            'tzData': 0,
            /** --- 日历视图表 --- */
            'maps': [],
            'vyear': '',
            'prevNextDate': new Date(),
            /** --- 上个月的年月字符串 --- */
            'prevYm': '',
            /** --- 下个月的年月字符串 --- */
            'nextYm': '',
            'vmonth': '',
            'vhour': '',
            'hours': [],
            'vminute': '',
            'minutes': [],
            'vseconds': '',
            'seconds': [],
            'vzone': '',
            'zones': [],
            'vzdec': '',
            'zdecs': ['00', '15', '30', '45'],
            /** --- 当前鼠标放置的日期无符号 --- */
            'cursorDate': '',
            /** --- 另一个参数值 --- */
            'rangeDate': undefined
        };
    },
    'computed': {
        dateValueStr: function(this: types.IVue): string {
            return this.dateValue.year.toString() + (this.dateValue.month + 1).toString().padStart(2, '0') + this.dateValue.date.toString().padStart(2, '0');
        },
        startYm: function(this: types.IVue): string {
            return this.startValue.year.toString() + (this.startValue.month + 1).toString().padStart(2, '0');
        },
        startYmd: function(this: types.IVue): string {
            return this.startYm + this.startValue.date.toString().padStart(2, '0');
        },
        endYm: function(this: types.IVue): string {
            return this.endValue.year.toString() + (this.endValue.month + 1).toString().padStart(2, '0');
        },
        endYmd: function(this: types.IVue): string {
            return this.endYm + this.endValue.date.toString().padStart(2, '0');
        },
        years: function(this: types.IVue): Array<{
            'label': string;
            'value': string;
        }> {
            return Array.from({ 'length': this.endValue.year - this.startValue.year + 1 }, (_, i) => ({
                'label': (this.startValue.year + i).toString(),
                'value': (this.startValue.year + i).toString(),
            }));
        },
        months: function(this: types.IVue): Array<{
            'label': string;
            'value': string;
            'disabled': boolean;
        }> {
            const arr: Array<{
                'label': string;
                'value': string;
                'disabled': boolean;
            }> = [];
            for (let i = 1; i <= 12; ++i) {
                const ym = this.vyear + i.toString().padStart(2, '0');
                arr.push({
                    'label': this.l('m' + i.toString()),
                    'value': i.toString(),
                    'disabled': ym > this.endYm || ym < this.startYm ? true : false,
                });
            }
            return arr;
        },
        isDisabled: function(this: types.IVue) {
            return (col: {
                'date': number;
                'month': number;
                'year': number;
            }): boolean => {
                const cols = col.year.toString() + (col.month + 1).toString().padStart(2, '0') + col.date.toString().padStart(2, '0');
                return cols > this.endYmd || cols < this.startYmd ? true : false;
            };
        },
        /** --- col 显示的 class 效果，有四种，1: undefined, 2: range, 3: range-left, 4: range-right --- */
        toclass: function(this: types.IVue) {
            return (col: {
                'date': number;
                'month': number;
                'year': number;
            }): string | undefined => {
                if (!this.propBoolean('range') || this.cursorDate === '' || this.timestamp === undefined) {
                    return undefined;
                }
                /** --- cols 是要判断的盒子 --- */
                const cols = col.year.toString() + (col.month + 1).toString().padStart(2, '0') + col.date.toString().padStart(2, '0');
                if (this.cursorDate <= this.dateValueStr) {
                    // --- 如果鼠标小于等于选中的位置，那么啥也不管 ---
                    return undefined;
                }
                if (cols > this.cursorDate || cols < this.dateValueStr) {
                    return undefined;
                }
                if (cols === this.cursorDate) {
                    return 'pe-datepanel-range-left';
                }
                if (cols === this.dateValueStr) {
                    return 'pe-datepanel-range-right';
                }
                return 'pe-datepanel-range';
            };
        }
    },
    'methods': {
        refreshStartValue: function(this: types.IVue): void {
            this.startValue.date = this.startDate.getUTCDate();
            this.startValue.month = this.startDate.getUTCMonth();
            this.startValue.year = this.startDate.getUTCFullYear();
        },
        refreshEndValue: function(this: types.IVue): void {
            this.endValue.date = this.endDate.getUTCDate();
            this.endValue.month = this.endDate.getUTCMonth();
            this.endValue.year = this.endDate.getUTCFullYear();
        },
        /**
         * --- 刷新视图（当时间戳或时区变动时执行） ---
         */
        refreshView: function(this: types.IVue): void {
            const now = new Date(Date.UTC(parseInt(this.vyear), parseInt(this.vmonth) - 1, 1));
            /** --- 当月 1 号在周几，0 代表周日 --- */
            const day1 = now.getUTCDay();
            if (day1 > 0) {
                now.setUTCDate(1 - day1);
            }
            this.maps.length = 0;
            const zone = this.tzData * 60 * 60_000;
            for (let i = 0; i < 6; ++i) {
                // --- 生成行列 ---
                this.maps[i] = Array.from({ length: 7 }, () => {
                    const col = {
                        'time': now.getTime() - zone,
                        'date': now.getUTCDate(),
                        'month': now.getUTCMonth(),
                        'year': now.getUTCFullYear(),
                        'day': now.getUTCDay(),
                        'str': `${now.getUTCFullYear()}${(now.getUTCMonth() + 1).toString().padStart(2, '0')}${now.getUTCDate().toString().padStart(2, '0')}`
                    };
                    now.setUTCDate(now.getUTCDate() + 1);
                    return col;
                });
            }
        },
        /**
         * --- 刷新 date value 的数据为最新的 ---
         */
        refreshDateValue: function(this: types.IVue): void {
            this.dateValue.date = this.dateObj.getUTCDate();
            this.dateValue.month = this.dateObj.getUTCMonth();
            this.dateValue.year = this.dateObj.getUTCFullYear();
        },
        /**
         * --- 更新 time stamp，会自动根据 dateObj 设置时间戳基 ---
         */
        updateTimestamp: function(this: types.IVue): void {
            if (this.timestamp === undefined) {
                if (this.$props.modelValue !== undefined) {
                    const event: types.IDatepanelChangedEvent = {
                        'detail': {
                            'value': undefined
                        }
                    };
                    this.$emit('changed', event);
                }
                return;
            }
            this.timestamp = this.dateObj.getTime() - this.tzData * 60 * 60_000;
            if (this.propNumber('modelValue') !== this.timestamp) {
                this.$emit('update:modelValue', this.timestamp);
                const event: types.IDatepanelChangedEvent = {
                    'detail': {
                        'value': this.timestamp
                    }
                };
                this.$emit('changed', event);
            }
        },
        /**
         * --- 跳转到当前选中的年份和月份 ---
         */
        goSelected: function(this: types.IVue): void {
            let change = false;
            if (parseInt(this.vyear) !== this.dateValue.year) {
                this.vyear = this.dateValue.year.toString();
                change = true;
            }
            if (parseInt(this.vmonth) - 1 !== this.dateValue.month) {
                this.vmonth = (this.dateValue.month + 1).toString();
                change = true;
            }
            if (change) {
                const ym = `${this.vyear}${this.vmonth.padStart(2, '0')}`;
                if (this.$props.yearmonth !== ym) {
                    this.$emit('update:yearmonth', ym);
                }
            }
        },
        /** --- col 点击 --- */
        colClick: function(this: types.IVue, col: {
            'time': number;
            'date': number;
            'month': number;
            'year': number;
            'day': number;
            'str': string;
        }): void {
            if (this.rangeDate === undefined && (this.timestamp !== undefined) && this.propBoolean('range')) {
                const cols = col.year.toString() + (col.month + 1).toString().padStart(2, '0') + col.date.toString().padStart(2, '0');
                if (cols === this.dateValueStr) {
                    // --- range 状态，自己点击自己，只选择一天 ---
                    const endDate = new Date(Date.UTC(col.year, col.month, col.date, 23, 59, 59, 0));
                    const event: types.IDatepanelRangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'start': this.timestamp,
                            'end': endDate.getTime() - this.tzData * 60 * 60_000
                        }
                    };
                    this.$emit('range', event);
                    if (event.go) {
                        this.rangeDate = endDate;
                    }
                    return;
                }
                if (cols > this.dateValueStr) {
                    const nhour = parseInt(this.vhour ?? '00');
                    const nminute = parseInt(this.vminute ?? '00');
                    const nseconds = parseInt(this.vseconds ?? '00');
                    /** --- 开始日 --- */
                    const sdate = new Date(this.dateObj.getTime());
                    if (nhour === 23 && nminute === 59 && nseconds === 59) {
                        sdate.setUTCHours(0, 0, 0, 0);
                    }
                    /** --- 截止日 --- */
                    const edate = new Date(Date.UTC(col.year, col.month, col.date, nhour, nminute, nseconds, 0));
                    if (nhour === 0 && nminute === 0 && nseconds === 0) {
                        edate.setUTCHours(23, 59, 59, 0);
                    }
                    const event: types.IDatepanelRangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'start': sdate.getTime() - this.tzData * 60 * 60_000,
                            'end': edate.getTime() - this.tzData * 60 * 60_000
                        }
                    };
                    this.$emit('range', event);
                    if (event.go) {
                        this.rangeDate = edate;
                    }
                    return;
                }
            }
            this.rangeDate = undefined;
            if (this.cursorDate !== '') {
                this.cursorDate = '';
                this.$emit('update:cursor', this.cursorDate);
            }
            // --- 解除 undefined 限制，使选中的时间戳可以 emit 上去 ---
            this.timestamp = 0;
            this.dateObj.setUTCFullYear(col.year, col.month, col.date);
            this.dateObj.setUTCHours(parseInt(this.vhour ?? '00'), parseInt(this.vminute ?? '00'), parseInt(this.vseconds ?? '00'), 0);
            this.refreshDateValue();
            this.updateTimestamp();
            this.goSelected();
            const event: types.IDatepanelSelectedEvent = {
                'detail': {
                    'time': col.time,
                    'date': col.date,
                    'month': col.month,
                    'year': col.year,
                    'day': col.day,
                    'str': col.str
                }
            };
            this.$emit('selected', event);
        },
        /** --- 跳转到今天 --- */
        today: function(this: types.IVue): void {
            // --- 解除 undefined 限制，使选中的时间戳可以 emit 上去 ---
            this.timestamp = 0;
            const now = new Date();
            this.dateObj.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
            this.refreshDateValue();
            this.updateTimestamp();
            this.goSelected();
        },
        /** --- 返回选中年月 --- */
        back: function(this: types.IVue): void {
            this.vyear = this.dateValue.year.toString();
            this.vmonth = (this.dateValue.month + 1).toString();
            this.$emit('update:yearmonth', this.vyear + this.vmonth.padStart(2, '0'));
        },
        /** --- 选上个月 --- */
        prev: function(this: types.IVue): void {
            const month = parseInt(this.vmonth);
            if (month === 1) {
                const year = parseInt(this.vyear);
                this.vyear = (year - 1).toString();
                this.vmonth = '12';
                return;
            }
            this.vmonth = (month - 1).toString();
        },
        // --- 选下个月 ---
        next: function(this: types.IVue): void {
            const month = parseInt(this.vmonth);
            if (month === 12) {
                const year = parseInt(this.vyear);
                this.vyear = (year + 1).toString();
                this.vmonth = '1';
                return;
            }
            this.vmonth = (month + 1).toString();
        },
        /** --- 鼠标移动到 col 上的事件 --- */
        colenter: function(this: types.IVue, e: MouseEvent | TouchEvent, col: {
            'date': number;
            'month': number;
            'year': number;
        }): void {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            if (!this.propBoolean('range')) {
                return;
            }
            if (this.rangeDate) {
                return;
            }
            this.cursorDate = col.year.toString() + (col.month + 1).toString().padStart(2, '0') + col.date.toString().padStart(2, '0');
            this.$emit('update:cursor', this.cursorDate);
        },
        /** --- 清除所有状态 --- */
        clear: function(this: types.IVue): void {
            this.timestamp = undefined;
            this.$emit('update:modelValue', undefined);
            this.rangeDate = undefined;
            const event: types.IDatepanelChangedEvent = {
                'detail': {
                    'value': undefined
                }
            };
            this.$emit('changed', event);
            if (this.cursorDate !== '') {
                this.cursorDate = '';
                this.$emit('update:cursor', '');
            }
        }
    },
    mounted: function(this: types.IVue) {
        // --- 监听最大最小值限定 ---
        this.$watch('start', () => {
            if (this.$props.start === undefined) {
                this.startDate.setUTCFullYear(1900, 0, 1);
                this.startDate.setUTCHours(0, 0, 0, 0);
                this.startTs = this.startDate.getTime();
                this.startDate.setTime(this.startTs + this.tzData * 60 * 60 * 1000);
                this.startDate.setMilliseconds(0);
            }
            else {
                this.startTs = this.propNumber('start');
                this.startDate.setTime(this.startTs + this.tzData * 60 * 60 * 1000);
                this.startDate.setMilliseconds(0);
            }
            this.refreshStartValue();
            // --- 判断选中的是不是小于 start ---
            if (this.timestamp !== undefined && this.timestamp < this.startTs) {
                this.dateObj.setTime(this.startDate.getTime());
                this.refreshDateValue();
                this.updateTimestamp();
            }
        }, {
            'immediate': true
        });
        this.$watch('end', () => {
            if (this.$props.end === undefined) {
                this.endDate.setTime(Date.now());
                this.endDate.setUTCFullYear(this.endDate.getUTCFullYear() + 100);
                this.endDate.setUTCHours(23, 59, 59, 0);
                this.endTs = this.endDate.getTime();
                this.endDate.setTime(this.endTs + this.tzData * 60 * 60 * 1000);
                this.endDate.setMilliseconds(0);
            }
            else {
                this.endTs = this.propNumber('end');
                this.endDate.setTime(this.endTs + this.tzData * 60 * 60 * 1000);
                this.endDate.setMilliseconds(0);
            }
            this.refreshEndValue();
            // --- 判断选中的是不是大于 end ---
            if (this.timestamp !== undefined && this.timestamp > this.endTs) {
                this.dateObj.setTime(this.endDate.getTime());
                this.refreshDateValue();
                this.updateTimestamp();
            }
        }, {
            'immediate': true
        });
        // --- 填充年月日时分秒时区 ---
        for (let i = 0; i <= 23; ++i) {
            this.hours.push(i.toString().padStart(2, '0'));
        }
        for (let i = 0; i <= 59; ++i) {
            this.minutes.push(i.toString().padStart(2, '0'));
        }
        for (let i = 0; i <= 59; ++i) {
            this.seconds.push(i.toString().padStart(2, '0'));
        }
        for (let i = -12; i <= 14; ++i) {
            this.zones.push((i >= 0 ? '+' : '') + i.toString());
        }
        // --- 检测年月变动 ---
        this.prevNextDate.setUTCHours(0, 0, 0, 0);
        this.$watch(() => {
            return this.vyear + '-' + this.vmonth;
        }, () => {
            if (!this.vyear || !this.vmonth) {
                return;
            }
            this.prevNextDate.setUTCFullYear(parseInt(this.vyear), parseInt(this.vmonth) - 2, 1);
            this.prevYm = this.prevNextDate.getUTCFullYear().toString() + (this.prevNextDate.getUTCMonth() + 1).toString().padStart(2, '0');
            this.prevNextDate.setUTCFullYear(parseInt(this.vyear), parseInt(this.vmonth), 1);
            this.nextYm = this.prevNextDate.getUTCFullYear().toString() + (this.prevNextDate.getUTCMonth() + 1).toString().padStart(2, '0');
            /** --- year + month --- */
            const ym = this.vyear + this.vmonth.padStart(2, '0');
            if (this.$props.yearmonth !== ym) {
                this.$emit('update:yearmonth', ym);
            }
            this.refreshView();
        });
        // --- 检测时分秒变动 ---
        this.$watch(() => {
            return (this.vhour ?? '') + ':' + (this.vminute ?? '') + ':' + (this.vseconds ?? '');
        }, () => {
            if (!this.vhour || !this.vminute || !this.vseconds) {
                return;
            }
            /** --- hour + minute + seconds --- */
            const hm = this.vhour + this.vminute + this.vseconds;
            if (this.$props.hourminute !== hm) {
                this.$emit('update:hourminute', hm);
            }
            this.dateObj.setUTCHours(
                parseInt(this.vhour), parseInt(this.vminute), parseInt(this.vseconds)
            );
            this.updateTimestamp();
        });
        // --- 检测按钮操作的时区变动 ---
        this.$watch(() => {
            return this.vzone + ' ' + this.vzdec;
        }, () => {
            if (!this.vzone || !this.vzdec) {
                return;
            }
            const vz = parseInt(this.vzone);
            if (vz >= 0) {
                this.tzData = vz + (parseInt(this.vzdec) / 60);
            }
            else {
                this.tzData = vz - (parseInt(this.vzdec) / 60);
            }
            this.$emit('update:tz', this.tzData);
            this.updateTimestamp();
            // --- 更新 start 和 end ---
            this.startDate.setTime(this.startTs + this.tzData * 60 * 60 * 1000);
            this.startDate.setMilliseconds(0);
            this.refreshStartValue();
            this.endDate.setTime(this.endTs + this.tzData * 60 * 60 * 1000);
            this.endDate.setMilliseconds(0);
            this.refreshEndValue();
        });
        // --- 监测 prop 时区信息变动 ---
        this.$watch('tz', () => {
            if (this.$props.tz === undefined) {
                this.tzData = -(this.dateObj.getTimezoneOffset() / 60);
                this.$emit('update:tz', this.tzData);
            }
            else {
                if (this.tzData === this.propNumber('tz')) {
                    return;
                }
                this.tzData = this.propNumber('tz');
            }
            const z = this.tzData.toString().split('.');
            this.vzone = (parseInt(z) >= 0 ? '+' : '') + z[0];
            this.vzdec = z[1] ? (parseFloat('0.' + z[1]) * 60).toString() : '00';
            this.updateTimestamp();
            // --- 更新 start 和 end ---
            this.startDate.setTime(this.startTs + this.tzData * 60 * 60 * 1000);
            this.startDate.setMilliseconds(0);
            this.refreshStartValue();
            this.endDate.setTime(this.endTs + this.tzData * 60 * 60 * 1000);
            this.endDate.setMilliseconds(0);
            this.refreshEndValue();
        }, {
            'immediate': true
        });
        this.$watch('cursor', () => {
            this.cursorDate = this.$props.cursor;
        }, {
            'immediate': true
        });
        // --- 初始化 ---
        // --- 监听 modelValue 变动 ---
        let mvfirst = true;
        this.$watch('modelValue', () => {
            if (this.$props.modelValue !== undefined) {
                this.timestamp = this.propNumber('modelValue');
                this.dateObj.setTime(this.timestamp + this.tzData * 60 * 60 * 1000);
                this.dateObj.setMilliseconds(0);
                this.vhour = this.dateObj.getUTCHours().toString().padStart(2, '0');
                this.vminute = this.dateObj.getUTCMinutes().toString().padStart(2, '0');
                this.vseconds = this.dateObj.getUTCSeconds().toString().padStart(2, '0');
                if (this.propBoolean('jump')) {
                    this.vyear = this.dateObj.getUTCFullYear().toString();
                    this.vmonth = (this.dateObj.getUTCMonth() + 1).toString();
                    this.refreshDateValue();
                    if (!mvfirst) {
                        // --- 不是第一次 ---
                        const ym = this.vyear + this.vmonth.padStart(2, '0');
                        if (this.$props.yearmonth !== ym) {
                            this.$emit('update:yearmonth', ym);
                        }
                    }
                }
                const hm = this.vhour + this.vminute + this.vseconds;
                if (this.$props.hourminute !== hm) {
                    this.$emit('update:hourminute', hm);
                }
            }
            else {
                this.timestamp = undefined;
                if (mvfirst) {
                    const date = new Date();
                    this.vyear = date.getUTCFullYear().toString();
                    this.vmonth = (date.getUTCMonth() + 1).toString();
                    this.vhour = '00';
                    this.vminute = '00';
                    this.vseconds = '00';
                }
            }
            mvfirst = false;
        }, {
            'immediate': true
        });
        // --- 年月翻页 ---
        this.$watch('yearmonth', () => {
            if (!this.$props.yearmonth) {
                this.$emit('update:yearmonth', this.vyear + this.vmonth.padStart(2, '0'));
                return;
            }
            const ym = this.vyear + this.vmonth.padStart(2, '0');
            if (ym !== this.$props.yearmonth) {
                this.vyear = this.$props.yearmonth.slice(0, 4);
                let vmonth = this.$props.yearmonth.slice(4);
                if (vmonth.startsWith('0')) {
                    vmonth = vmonth[1];
                }
                this.vmonth = vmonth;
            }
        }, {
            'immediate': true
        });
        // --- 时分秒 ---
        this.$watch('hourminute', () => {
            const hm = this.vhour + this.vminute + this.vseconds;
            if (!this.$props.hourminute) {
                this.$emit('update:hourminute', hm);
                return;
            }
            if (this.$props.hourminute !== hm) {
                this.vhour = this.$props.hourminute.slice(0, 2);
                this.vminute = this.$props.hourminute.slice(2, 4);
                this.vseconds = this.$props.hourminute.slice(4);
            }
        }, {
            'immediate': true
        });
    }
};

list['pe-daterange'] = {
    'template': `<div class="pe-daterange-wrap" :class="[propBoolean('disabled')&&'pe-disabled']"><div class="pe-daterange-first"><div @click="click($event, 'first')" ref="first"><template v-if="dateStr.length"><div>{{dateStr[0]}}</div><div v-if="propBoolean('time')">{{timeStr[0]}}</div><div>-</div><div>{{dateStr[1]}}</div><div v-if="propBoolean('time')">{{timeStr[1]}}</div></template><template v-else><div>{{l('please click select')}}</div></template></div><div v-if="propBoolean('zone')" @click="click($event, 'zone')" ref="zone">UTC{{tzData >= 0 ? '+' : ''}}{{tzData}}</div></div><div class="pe-daterange-clear" @click="clear" v-if="dateStr.length"><svg viewBox="0 0 24 24" stroke="none"><path d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z" /></svg></div><div ref="firstpop" class="pe-pop pe-daterange-first"><pe-datepanel plain :tz="tzData" :time="propBoolean('time')" v-model="ts" v-model:cursor="cursor" range :clearbtn="false" ref="firstpanel" @range="onRange" @changed="firstChanged" :yearmonth="firstym" @update:yearmonth="firstym=$event;onYmChange()" :start="start" :end="end"><template v-if="$slots['default']" v-slot="col"><slot :year="col.year" :month="col.month" :date="col.date" :day="col.day" :str="col.str" :time="col.time"></slot></template></pe-datepanel><pe-datepanel v-show="showTwoDatePanel" plain :tz="tzData" hourminute="235959" :time="propBoolean('time')" :modelValue="ts2" v-model:cursor="cursor" range :start="ts" :end="end" :clearbtn="false" :backbtn="false" ref="endpanel" @range="onRange" :yearmonth="endym" @update:yearmonth="endym=$event;onYmChange()" :jump="false"><template v-if="$slots['default']" v-slot="col"><slot :year="col.year" :month="col.month" :date="col.date" :day="col.day" :str="col.str" :time="col.time"></slot></template></pe-datepanel></div><div v-if="propBoolean('zone')" ref="zonepop" class="pe-pop pe-daterange-list"><div><div class="pe-daterange-item"><div class="pe-daterange-title">{{l('zone')}}</div><pe-dlist :data="zones" v-model="vzone"></pe-dlist></div><div class="pe-daterange-item"><div class="pe-daterange-title">{{l('minute')}}</div><pe-dlist :data="zdecs" v-model="vzdec"></pe-dlist></div></div><div><div class="pe-button pe-pgrey" @click="cancel">{{l('cancel')}}</div><div class="pe-button pe-pgrey" @click="zoneOk">{{l('ok')}}</div></div></div></div>`,
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'update:tz': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },

        'modelValue': {
            'default': [],
        },
        'tz': {
            'default': undefined,
        },
        'start': {
            'default': undefined,
        },
        'end': {
            'default': undefined,
        },

        'time': {
            'default': true,
        },
        'zone': {
            'default': false,
        },
    },
    data: function() {
        return {
            'dateObj': [
                new Date(), new Date()
            ],
            'cursor': '',

            /** --- first 的 ts --- */
            'ts': undefined,

            /** --- end 的 ts --- */
            'ts2': undefined,

            'dateStr': ['', ''],

            'timeStr': ['', ''],

            /** --- 当前时区信息（小时） --- */
            'tzData': 0,

            'vzone': '+0',

            'zones': [],

            'vzdec': '00',

            'zdecs': ['00', '15', '30', '45'],

            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'minute': 'Min',
                    'zone': 'Zone',
                    'cancel': 'Cancel',
                    'ok': 'OK',
                    'please click select': 'Click to select'
                },
                'sc': {
                    'minute': '分',
                    'zone': '时区',
                    'cancel': '取消',
                    'ok': '确定',
                    'please click select': '请点击选择'
                },
                'tc': {
                    'minute': '分',
                    'zone': '時區',
                    'cancel': '取消',
                    'ok': '確定',
                    'please click select': '請點擊選擇'
                },
                'ja': {
                    'minute': '分',
                    'zone': '時區', // --- タイムゾーン ---
                    'cancel': '取消',
                    'ok': '確定',
                    'please click select': '選択して下さい'
                },
                'ko': {
                    'minute': '분',
                    'zone': '時區', // --- 시간대 ---
                    'cancel': '취소',
                    'ok': '확인',
                    'please click select': '선택 클릭'
                },
                'th': {
                    'minute': 'น.',
                    'zone': 'เขต',
                    'cancel': 'ยกเลิก',
                    'ok': 'ตกลง',
                    'please click select': 'คลิกเลือก'
                },
                'es': {
                    'minute': 'Min',
                    'zone': 'Zona',
                    'cancel': 'Cancelar',
                    'ok': 'OK',
                    'please click select': 'Clic para elegir'
                },
                'de': {
                    'minute': 'Min',
                    'zone': 'Zone',
                    'cancel': 'Abbr.',
                    'ok': 'OK',
                    'please click select': 'Klicken Sie wählen'
                },
                'fr': {
                    'minute': 'Min',
                    'zone': 'Zone',
                    'cancel': 'Annul.',
                    'ok': 'OK',
                    'please click select': 'Cliquer choisir'
                },
                'pt': {
                    'minute': 'Min',
                    'zone': 'Fuso',
                    'cancel': 'Cancelar',
                    'ok': 'OK',
                    'please click select': 'Clique para sel.'
                },
                'ru': {
                    'minute': 'Мин',
                    'zone': 'Зона',
                    'cancel': 'Отмена',
                    'ok': 'ОК',
                    'please click select': 'Нажмите выбрать'
                },
                'vi': {
                    'minute': 'Phút',
                    'zone': 'Múi',
                    'cancel': 'Hủy',
                    'ok': 'OK',
                    'please click select': 'Nhấn chọn'
                }
            },

            /** --- 小屏不显示两个 --- */
            'showTwoDatePanel': false,

            // --- yearmonth 处理 ---

            'firstym': '',

            'endym': ''
        };
    },
    'methods': {
        // --- 单击事件 ---
        click: function(this: types.IVue, e: MouseEvent, type: 'first' | 'zone'): void {
            const el = this.$refs[type + 'pop'];
            if (el.classList.contains('pe-show')) {
                dom.hidePop(el);
                return;
            }
            if (type === 'first') {
                this.showTwoDatePanel = window.innerWidth >= 600 ? true : false;
            }
            dom.showPop(e, el);
        },
        zoneOk: function(this: types.IVue): void {
            const vz = parseInt(this.vzone);
            if (vz >= 0) {
                this.tzData = vz + (parseInt(this.vzdec) / 60);
            }
            else {
                this.tzData = vz - (parseInt(this.vzdec) / 60);
            }
            this.$emit('update:tz', this.tzData);
            if (this.dateStr[0]) {
                this.$emit('update:modelValue', [
                    this.dateObj[0].getTime() - this.tzData * 60 * 60_000,
                    this.dateObj[1].getTime() - this.tzData * 60 * 60_000
                ]);
            }
            dom.hidePop();
        },
        cancel: function(): void {
            dom.hidePop();
        },
        // --- 清除已选中的 ---
        clear: function(this: types.IVue): void {
            this.ts = undefined;
            this.dateStr.length = 0;
            this.$emit('update:modelValue', []);
        },
        onRange: function(this: types.IVue, e: types.IDatepanelRangeEvent): void {
            e.preventDefault();
            const value: number[] = [];
            // --- start ---
            let res = tool.formatTime(e.detail.start, this.tzData);
            this.dateStr[0] = res.date;
            this.timeStr[0] = res.time;
            value.push(e.detail.start);
            this.dateObj[0].setTime(e.detail.start + this.tzData * 60 * 60_000);
            // --- end ---
            res = tool.formatTime(e.detail.end, this.tzData);
            this.dateStr[1] = res.date;
            this.timeStr[1] = res.time;
            value.push(e.detail.end);
            this.dateObj[1].setTime(e.detail.end + this.tzData * 60 * 60_000);
            // --- 提交数据 ---
            this.$emit('update:modelValue', value);
            dom.hidePop(this.$refs.firstpop);
            // --- 清空选中 ---
            this.$refs.firstpanel.clear();
            this.$refs.endpanel.clear();
        },
        /** --- 左侧的 changed --- */
        firstChanged: function(this: types.IVue, e: types.IDatepanelChangedEvent): void {
            if (e.detail.value === undefined) {
                this.ts2 = undefined;
                return;
            }
            const date = new Date(e.detail.value);
            date.setUTCHours(23, 59, 59, 0);
            this.ts2 = date.getTime() - this.tzData * 60 * 60_000;
        },
        onYmChange: function(this: types.IVue): void {
            if (this.endym > this.firstym) {
                return;
            }
            const date = new Date();
            date.setUTCFullYear(parseInt(this.firstym.slice(0, 4)), parseInt(this.firstym.slice(4)), 1);
            this.endym = date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString().padStart(2, '0');
        }
    },
    'mounted': function(this: types.IVue) {
        // --- 填充时区 ---
        for (let i = -12; i <= 14; ++i) {
            this.zones.push((i >= 0 ? '+' : '') + i.toString());
        }
        // --- 监测 prop 时区信息变动 ---
        this.$watch('tz', () => {
            if (this.$props.tz === undefined) {
                this.tzData = -(this.dateObj[0].getTimezoneOffset() / 60);
                this.$emit('update:tz', this.tzData);
            }
            else {
                this.tzData = this.propNumber('tz');
            }
            const z = this.tzData.toString().split('.');
            this.vzone = (parseInt(z[0]) >= 0 ? '+' : '') + z[0];
            this.vzdec = z[1] ? (parseFloat('0.' + z[1]) * 60).toString() : '00';
            // --- 更新时间戳 ---
            if (this.dateStr[0]) {
                this.$emit('update:modelValue', [
                    this.dateObj[0].getTime() - this.tzData * 60 * 60_000,
                    this.dateObj[1].getTime() - this.tzData * 60 * 60_000
                ]);
            }
        }, {
            'immediate': true
        });
        this.$watch('modelValue', () => {
            if (this.$props.modelValue[0] === undefined || this.$props.modelValue[1] === undefined) {
                this.dateStr.length = 0;
                return;
            }
            const modelValue = this.propArray('modelValue');
            for (let i = 0; i <= 1; ++i) {
                const ts = typeof modelValue[i] === 'string' ? parseInt(modelValue[i]) : modelValue[i];
                const res = tool.formatTime(ts, this.tzData);
                this.dateStr[i] = res.date;
                this.timeStr[i] = res.time;
            }
        }, {
            'immediate': true,
            'deep': true
        });
    }
};

list['pe-dialog'] = {
    'template': `<div class="pe-dialog" :class="[propBoolean('show')&&'pe-show']"><div class="pe-dialog-form"><div class="pe-dialog-title" v-if="title">{{title}}</div><div v-if="content" class="pe-dialog-content" v-html="content"></div><div v-else class="pe-dialog-content"><slot></slot></div><div class="pe-dialog-bottom"><div v-for="item, i of buttons" class="pe-button" :class="[(i===buttons.length-1)&&'pe-dark']" @click="$emit('select', item)">{{item}}</div></div></div></div>`,
    'props': {
        'title': {
            'default': ''
        },
        'content': {
            'default': ''
        },
        'buttons': {
            'default': ['OK']
        },
        'show': {
            'default': false
        }
    },
    'emits': {
        'select': null
    },
};

list['pe-dlist'] = {
    'template': `<div class="pe-dlist" :class="[!data.length&&'pe-empty',propBoolean('plain')&&'pe-plain']"><div v-if="data.length" v-for="item, i of data" class="pe-dlist-item" :class="[(value===(item[mapComp.value]??item[mapComp.label]??item))&&'pe-selected',item.disabled&&'pe-disabled']" @click="click(i)">{{item[mapComp.label]??item[mapComp.value]??item}}</div><div v-else>{{l('empty')}}</div></div>`,
    'props': {
        'modelValue': {
            'default': ''
        },
        'data': {
            'default': []
        },
        'plain': {
            'default': false
        },
        /** --- label, value, children, title --- */
        'map': {
            'default': {}
        },
        'multi': {
            'default': false
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'click': null,
    },
    'computed': {
        /** --- 初始化后的 map 对象 --- */
        mapComp: function(this: types.IVue): {
            'label': string;
            'value': string;
            'children': string;
            'title': string;
        } {
            return {
                'children': this.$props.map.children ?? 'children',
                'label': this.$props.map.label ?? 'label',
                'value': this.$props.map.value ?? 'value',
                'title': this.$props.map.title ?? 'title',
            };
        }
    },
    'methods': {
        click: function(this: types.IVue, i: number) {
            const item = this.$props.data[i];
            this.value = item[this.mapComp.value] ?? item[this.mapComp.label] ?? item;
            this.$emit('update:modelValue', this.value);
            const event: types.IDlistChangedEvent = {
                'detail': {
                    'value': this.value,
                    'index': i,
                    'label': item[this.mapComp.label] ?? item[this.mapComp.value] ?? item
                }
            };
            this.$emit('changed', event);
            this.$emit('click', event);
        },
        refreshModelValue: function(this: types.IVue) {
            let found = false;
            for (const item of this.$props.data) {
                const val = item[this.mapComp.value] ?? item[this.mapComp.label] ?? item;
                if (val !== this.value) {
                    continue;
                }
                found = true;
                break;
            }
            if (found) {
                return;
            }
            if (!this.$props.data[0]) {
                if (this.value !== '') {
                    this.value = '';
                    this.$emit('update:modelValue', '');
                    const event: types.IDlistChangedEvent = {
                        'detail': {
                            'value': '',
                            'index': -1,
                            'label': ''
                        }
                    };
                    this.$emit('changed', event);
                }
                return;
            }
            const fitem = this.$props.data[0];
            this.value = fitem[this.mapComp.value] ?? fitem[this.mapComp.label] ?? fitem;
            const lab = fitem[this.mapComp.label] ?? fitem[this.mapComp.value] ?? fitem;
            this.$emit('update:modelValue', this.value);
            const event: types.IDlistChangedEvent = {
                'detail': {
                    'value': this.value,
                    'index': 0,
                    'label': lab
                }
            };
            this.$emit('changed', event);
        }
    },
    'data': function() {
        return {
            /** --- 当前选定的值 --- */
            'value': '',
            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'empty': 'Empty',
                },
                'sc': {
                    'empty': '空',
                },
                'tc': {
                    'empty': '空',
                },
                'ja': {
                    'empty': '空っぽ',
                },
                'ko': {
                    'empty': '비어 있음',
                },
                'th': {
                    'empty': 'ว่างเปล่า',
                },
                'es': {
                    'empty': 'Vacío',
                },
                'de': {
                    'empty': 'Leer',
                },
                'fr': {
                    'empty': 'Vide',
                },
                'pt': {
                    'empty': 'Vazio',
                },
                'ru': {
                    'empty': 'Пусто',
                },
                'vi': {
                    'empty': 'Trống',
                }
            }
        };
    },
    'mounted': function(this: types.IVue) {
        this.$watch('modelValue', () => {
            if (this.value && (this.value === this.$props.modelValue)) {
                return;
            }
            this.value = this.$props.modelValue;
            this.refreshModelValue();
        }, {
            'immediate': true
        });
        this.$watch('data', () => {
            if (this.value !== this.$props.modelValue) {
                this.value = this.$props.modelValue;
            }
            this.refreshModelValue();
        }, {
            'deep': true
        });
    },
};

list['pe-drawer'] = {
    'template': `<div class="pe-drawer" :class="[propBoolean('modelValue')&&'pe-show']" @click="click"><div class="pe-drawer-body" :style="{'width':widthComp}"><div class="pe-drawer-header" v-if="title"><div class="pe-drawer-title">{{title}}</div><div class="pe-drawer-close" @click="closeClick" v-show="propBoolean('modelValue')"><svg width="24" height="24" viewBox="0 0 24 24" stroke="none"><path d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z" /></svg></div></div><div class="pe-drawer-content" :class="['pe-'+direction]" :style="{'align-items': direction === 'v' ? alignHComp : alignVComp, 'justify-content': direction === 'v' ? alignVComp : alignHComp, 'gap': propNumber('gutter') ? (gutter + 'px') : '0'}" v-show="propBoolean('modelValue')"><slot></slot></div><div v-if="$slots['footer']" class="pe-drawer-footer" v-show="propBoolean('modelValue')"><slot name="footer"></slot></div></div></div>`,
    'props': {
        'modelValue': {
            'default': false
        },
        'title': {
            'default': '',
        },
        'width': {
            'default': '35%',
        },

        'direction': {
            'default': 'h',
        },
        'gutter': {
            'default': '',
        },
        'alignH': {
            'default': undefined,
        },
        'alignV': {
            'default': undefined
        }
    },
    'computed': {
        widthComp: function(this: types.IVue) {
            if (typeof this.$props.width === 'number') {
                return this.$props.width.toString() + 'px';
            }
            return this.$props.width;
        }
    },
    'methods': {
        /** --- 关闭按钮 --- */
        closeClick: function(this: types.IVue) {
            this.$emit('update:modelValue', false);
        },
        click: function(this: types.IVue, e: MouseEvent): void {
            if (e.target !== this.$el) {
                return;
            }
            this.$emit('update:modelValue', false);
        }
    }
};

list['pe-footer'] = {
    'template': `<div class="pe-footer" :class="[propBoolean('dark')&&'pe-dark']"><div class="pe-footer-content"><slot></slot></div><div v-if="$slots['bottom']" class="pe-footer-bottom"><slot name="bottom"></slot></div></div>`,
    'props': {
        'dark': {
            'default': false,
        }
    },
};

list['pe-group'] = {
    'template': `<div class="pe-group" :class="[$slots['title']&&'pe-hastitle']"><div v-if="$slots['title']" class="pe-group-title"><slot name="title"></slot></div><div class="pe-group-content"><slot></slot></div><div v-if="$slots['bottom']" class="pe-group-bottom"><slot name="bottom"></slot></div></div>`
};

list['pe-header'] = {
    'template': `<div class="pe-header" :class="[propBoolean('fixed')&&'pe-fixed','pe-theme-'+theme,headerPop&&'pe-show',propBoolean('line')&&'pe-line']"><a class="pe-logo" :href="logoHref"></a><div class="pe-nav"><div class="pe-nav-left"><div class="pe-nav-top"><slot></slot></div><div v-if="$slots['bottom']" class="pe-nav-bottom"><slot name="bottom"></slot></div></div><div class="pe-nav-right"><slot name="right"></slot></div></div><svg v-if="headerPop" @click="headerPop=false" class="pe-header-control" viewBox="0 0 24 24" fill="none"><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke-width="1.5" stroke-linecap="round"/></svg><svg v-else @click="headerPop=true" class="pe-header-control" viewBox="0 0 24 24" fill="none"><path d="M4 7L7 7M20 7L11 7" stroke-width="1.5" stroke-linecap="round"/><path d="M20 17H17M4 17L13 17" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12H7L20 12" stroke-width="1.5" stroke-linecap="round"/></svg></div>`,
    'props': {
        'logoHref': {
            'default': '',
        },
        'fixed': {
            'default': false,
        },
        'theme': {
            'default': 'default',
        },
        'line': {
            'default': false,
        }
    },
    'computed': {
        'headerPop': {
            get: function() {
                return purease.global.headerPop;
            },
            set: function(v: boolean) {
                purease.global.headerPop = v;
            }
        }
    }
};

list['pe-header-item'] = {
    'template': `<a class="pe-header-item" :href="href" :class="[menuCount&&'pe-list',hover&&'pe-hover']" @touchstart="enter" @mouseenter="enter" @mouseleave="leave"><slot></slot></a>`,
    'props': {
        'href': {
            'default': undefined
        }
    },
    'data': function() {
        return {
            'menuCount': 0,
            'hover': false,
        };
    },
    'methods': {
        enter: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            const target = e.target as HTMLElement;
            if (target.classList.contains('pe-menu') || dom.findParentByClass(target, 'pe-menu')) {
                return;
            }
            if (!this.href) {
                e.preventDefault();
            }
            this.hover = !this.hover;
        },
        leave: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            this.hover = false;
        },
    },
};

list['pe-icon'] = {
    'template': `<svg v-if="name==='link'" class="pe-icon" viewBox="0 0 24 24" fill="none"><path d="M13 11L22 2M22 2H16.6562M22 2V7.34375" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2.49073 19.5618 2.16444 18.1934 2.0551 16" stroke-width="1.5" stroke-linecap="round"/></svg><svg v-else-if="name==='language'" class="pe-icon" viewBox="0 0 24 24"><path d="M8 15H3.5A2.502 2.502 0 0 1 1 12.5v-9A2.502 2.502 0 0 1 3.5 1h9A2.502 2.502 0 0 1 15 3.5V8h-1V3.5A1.502 1.502 0 0 0 12.5 2h-9A1.502 1.502 0 0 0 2 3.5v9A1.502 1.502 0 0 0 3.5 14H8zm-.038-4.811a9.77 9.77 0 0 1-3.766 1.796l-.242-.97a8.816 8.816 0 0 0 3.282-1.532A9.264 9.264 0 0 1 4.888 5H4V4h3.279l-.544-.544.707-.707L8.692 4H12v1h-.914A9.836 9.836 0 0 1 9.78 8.152a3.853 3.853 0 0 0-1.82 2.037zm.032-1.383A8.167 8.167 0 0 0 10.058 5H5.922a8.18 8.18 0 0 0 2.072 3.806zM23 20.447v-8.894A2.525 2.525 0 0 0 20.484 9h-8.931A2.556 2.556 0 0 0 9 11.553v8.894A2.556 2.556 0 0 0 11.553 23h8.894A2.556 2.556 0 0 0 23 20.447zM20.484 10A1.517 1.517 0 0 1 22 11.516v8.968A1.517 1.517 0 0 1 20.484 22h-8.968A1.517 1.517 0 0 1 10 20.484v-8.968A1.517 1.517 0 0 1 11.516 10zm-2.086 8h-4.796l-1.159 2.23-.886-.46L16 11.215l4.443 8.555-.886.46zm-.52-1L16 13.385 14.122 17z" stroke-width=".5"/></svg><svg v-else-if="name==='backspace'" class="pe-icon" viewBox="0 0 24 24" fill="none"><path d="M22 12C22 15.7712 22 17.6569 20.7961 18.8284C19.5921 20 17.6544 20 13.779 20H11.142C8.91458 20 7.80085 20 6.87114 19.4986C5.94144 18.9971 5.35117 18.0781 4.17061 16.24L3.48981 15.18C2.4966 13.6336 2 12.8604 2 12C2 11.1396 2.4966 10.3664 3.48981 8.82001L4.17061 7.76001C5.35117 5.92191 5.94144 5.00286 6.87114 4.50143C7.80085 4 8.91458 4 11.142 4L13.779 4C17.6544 4 19.5921 4 20.7961 5.17157C21.4673 5.82475 21.7643 6.69989 21.8957 8" stroke-width="1.5" stroke-linecap="round"/><path d="M15.5 9.50002L10.5 14.5M10.5 9.5L15.5 14.5" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'props': {
        'name': {
            'default': 'link'
        }
    }
};

list['pe-label'] = {
    'template': `<span class="pe-label" :class="['pe-label-'+mode]"><template v-if="content">{{contentComp}}</template><slot v-else></slot></span>`,
    'props': {
        // --- 'default' | 'tip' | 'mtip' | 'date' ---
        'mode': {
            'default': 'default'
        },
        'content': {
            'default': ''
        },

        'time': {
            'default': true
        },
        'date': {
            'default': true
        },
        'zone': {
            'default': false
        },
        'tz': {
            'default': undefined
        }
    },
    'computed': {
        /** --- 替换 slot 数据 --- */
        contentComp: function(this: types.IVue): string {
            if (this.$props.mode !== 'date') {
                return this.$props.content;
            }
            if (this.propNumber('content') === 0) {
                return '';
            }
            const dateTxt: string[] = [];
            const date = new Date(this.propNumber('content') * 1000);
            /** --- 当前设定的时区 --- */
            const tz = this.$props.tz === undefined ? -(date.getTimezoneOffset() / 60) : this.propNumber('tz');
            date.setTime(date.getTime() + tz * 60 * 60 * 1000);
            if (this.propBoolean('date')) {
                dateTxt.push(date.getUTCFullYear().toString() + '-' + (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + date.getUTCDate().toString().padStart(2, '0'));
            }
            if (this.propBoolean('time')) {
                dateTxt.push(date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0') + ':' + date.getUTCSeconds().toString().padStart(2, '0'));
            }
            if (this.propBoolean('zone')) {
                dateTxt.push('UTC' + (tz >= 0 ? '+' : '') + tz.toString());
            }
            return dateTxt.join(' ');
        }
    }
};

list['pe-lnav'] = {
    'template': `<div class="pe-lnav"><div class="pe-lnav-left" ref="left" @click="leftClick"><div class="pe-lnav-left-content"><slot name="left"></slot></div></div><div class="pe-lnav-right"><slot></slot></div></div>`,
    'methods': {
        'leftClick': function(this: types.IVue, e: MouseEvent) {
            if (!(e.target as HTMLElement).classList.contains('pe-lnav-left')) {
                return;
            }
            this.$refs.left.classList.remove('pe-show');
        }
    },
};

list['pe-menu'] = {
    'template': `<div class="pe-menu"><slot></slot></div>`,
    mounted: function(this: types.IVue) {
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        ++this.$parent.menuCount;
    },
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        --this.$parent.menuCount;
    }
};

list['pe-nboard'] = {
    'template': `<div class="pe-nboard" :class="[propBoolean('disabled')&&'pe-disabled',propBoolean('plain')&&'pe-plain']"><template v-if="$slots['title']"><div class="pe-nboard-title"><slot name="title"></slot></div></template><div class="pe-nboard-wrap"><div class="pe-nboard-input"><div v-for="item of length" class="pe-nboard-item"><span v-if="value[item - 1]">{{value[item - 1]}}</span></div></div></div><div class="pe-nboard-line"><div @click="click('1')">1</div><div @click="click('2')">2</div><div @click="click('3')">3</div></div><div class="pe-nboard-line"><div @click="click('4')">4</div><div @click="click('5')">5</div><div @click="click('6')">6</div></div><div class="pe-nboard-line"><div @click="click('7')">7</div><div @click="click('8')">8</div><div @click="click('9')">9</div></div><div class="pe-nboard-line"><div></div><div @click="click('0')">0</div><div @click="back"><pe-icon name="backspace"></pe-icon></div></div></div>`,
    'emits': {
        'changed': null,
        'update:modelValue': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },
        'plain': {
            'default': false,
        },

        'modelValue': {
            'default': '',
        },
        'length': {
            'default': 6
        },
    },
    data: function() {
        return {
            'value': [],
        };
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.modelValue === this.value.join('')) {
                    return;
                }
                this.value.length = 0;
                for (const char of this.modelValue) {
                    if (this.value.length === this.length) {
                        break;
                    }
                    if (!/[0-9]/.test(char)) {
                        continue;
                    }
                    this.value.push(char);
                }
                const mv = this.value.join('');
                if (this.modelValue === mv) {
                    return;
                }
                this.$emit('update:modelValue', mv);
                this.$emit('changed');
            },
            'immediate': true,
        },
    },
    'methods': {
        click: function(this: types.IVue, num: string) {
            if (this.value.length === this.length) {
                return;
            }
            this.value.push(num);
            const mv = this.value.join('');
            if (this.modelValue === mv) {
                return;
            }
            this.$emit('update:modelValue', mv);
            this.$emit('changed');
        },
        back: function(this: types.IVue) {
            if (!this.value.length) {
                return;
            }
            this.value.pop();
            const mv = this.value.join('');
            if (this.modelValue === mv) {
                return;
            }
            this.$emit('update:modelValue', mv);
            this.$emit('changed');
        },
    },
};

list['pe-page'] = {
    'template': `<div class="pe-page"><div class="pe-page-list"><pe-select v-if="countsComp.length" :data="countsComp" v-model="countSelect" @changed="changed"></pe-select><div v-if="page > 1" tabindex="0" class="pe-page-left" @click="--page;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div><div v-if="page > 1" tabindex="0" @click="page=1;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">1</div><div v-if="page > propNumber('control') + 2" tabindex="0" v-html="svg" @click="page-=10;if(page<1){page=1}$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div><div tabindex="0" v-for="item of prevs" @click="page=item;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">{{item}}</div><div tabindex="0" class="pe-selected">{{page}}</div><div tabindex="0" v-for="item of nexts" @click="page=item;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">{{item}}</div><div v-if="page < maxPage - propNumber('control') - 1" tabindex="0" v-html="svg" @click="page+=10;if(page>maxPage){page=maxPage}$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div><div v-if="page < maxPage" tabindex="0" @click="page=maxPage;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown">{{maxPage}}</div><div v-if="page < maxPage" tabindex="0" class="pe-page-right" @click="++page;$emit('update:modelValue',page);$emit('change',page);refresh()" @keydown="keydown"></div></div><div v-if="propInt('total')" class="pe-page-total">{{l('total-of').replace('?',propInt('total'))}}</div></div>`,
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

list['pe-select'] = {
    'template': `<div class="pe-select" :class="[propBoolean('plain')&&'pe-plain',propBoolean('disabled')&&'pe-disabled',propBoolean('search')&&'pe-search']" :tabindex="!propBoolean('disabled') ? '0' : undefined" @click="open"><div class="pe-select-label">{{label || '\u3000'}}</div><div class="pe-select-arrow"></div><div class="pe-pop" ref="pop"><pe-text v-if="propBoolean('search')" v-model="searchValue" :placeholder="l('search')" plain></pe-text><pe-dlist :data="searchComp" :modelValue="value" @update:modelValue="onModelValue" @click="click" plain></pe-dlist></div></div>`,
    'props': {
        'modelValue': {
            'default': ''
        },
        'data': {
            'default': []
        },
        'disabled': {
            'default': false
        },
        'plain': {
            'default': false
        },
        'search': {
            'default': false
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null
    },
    'data': function() {
        return {
            'label': '',
            'value': '',
            'searchValue': '',

            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'search': 'Search'
                },
                'sc': {
                    'search': '搜索'
                },
                'tc': {
                    'search': '搜尋'
                },
                'ja': {
                    'search': '検索'
                },
                'ko': {
                    'search': '검색'
                },
                'th': {
                    'search': 'ค้นหา'
                },
                'es': {
                    'search': 'buscar'
                },
                'de': {
                    'search': 'suchen'
                },
                'fr': {
                    'search': 'rechercher'
                },
                'pt': {
                    'search': 'pesquisar'
                },
                'ru': {
                    'search': 'поиск'
                },
                'vi': {
                    'search': 'tìm kiếm'
                }
            }
        };
    },
    'methods': {
        open: function(this: types.IVue, e: MouseEvent) {
            const el = e.target as HTMLElement;
            if (!el.classList.contains('pe-select-label') && !el.classList.contains('pe-select-arrow')) {
                return;
            }
            dom.showPop(e, this.$refs.pop);
        },
        onModelValue: function(this: types.IVue, v: string) {
            if (this.value === v) {
                return;
            }
            this.value = v;
            for (const item of this.$props.data) {
                const val = item.value ?? item.label ?? item;
                if (val !== this.value) {
                    continue;
                }
                this.label = item.label ?? item.value ?? item;
                break;
            }
            this.$emit('update:modelValue', this.value);
        },
        click: function(this: types.IVue, e: types.IDlistClickEvent) {
            this.searchValue = '';
            const event: types.ISelectChangedEvent = {
                'detail': {
                    'value': e.detail.value,
                    'index': e.detail.index,
                    'label': e.detail.label
                }
            };
            this.$emit('changed', event);
            dom.hidePop(this.$refs.pop);
        },
    },
    'computed': {
        dataComp: function(this: types.IVue) {
            const ds: Array<{
                'label': string;
                'value': string;
                'disabled': boolean;
            }> = [];
            for (const item of this.$props.data) {
                if (typeof item === 'string') {
                    ds.push({
                        'label': item,
                        'value': item,
                        'disabled': false,
                    });
                    continue;
                }
                ds.push({
                    'label': item.label ?? item.value ?? '',
                    'value': item.value ?? item.label ?? '',
                    'disabled': item.disabled ?? false,
                });
            }
            return ds;
        },
        searchComp: function(this: types.IVue) {
            if (!this.searchValue) {
                return this.dataComp;
            }
            const ds: Array<{
                'label': string;
                'value': string;
                'disabled': boolean;
            }> = [];
            for (const item of this.dataComp) {
                let include = true;
                for (const char of this.searchValue) {
                    if (item.label.includes(char) || item.value.includes(char)) {
                        continue;
                    }
                    // --- 没包含 ---
                    include = false;
                    break;
                }
                if (include) {
                    ds.push({
                        'label': item.label,
                        'value': item.value,
                        'disabled': item.disabled
                    });
                }
            }
            return ds;
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.value === this.$props.modelValue) {
                    return;
                }
                this.value = this.$props.modelValue;
                for (const item of this.$props.data) {
                    const val = item.value ?? item.label ?? item;
                    if (val !== this.value) {
                        continue;
                    }
                    this.label = item.label ?? item.value ?? item;
                    break;
                }
            },
            'immediate': true
        }
    }
};

list['pe-slider'] = {
    'template': `<div class="pe-slider"><div v-if="propBoolean('range')" class="pe-slider-bar" :style="{'width': barWidth + '%', 'left': 'calc(' + barLeft + '% - 11px)'}"></div><div class="pe-slider-block" :style="{'left': 'calc(' + pos[0] + '% - 11px)'}" tabindex="0" @mousedown="down($event, 0)" @touchstart="down($event, 0)"></div><div v-if="propBoolean('range')" class="pe-slider-block" :style="{'left': 'calc(' + pos[1] + '% - 11px)'}" tabindex="0" @mousedown="down($event, 1)" @touchstart="down($event, 1)"></div></div>`,
    'props': {
        'modelValue': {
            'default': [0, 0]
        },
        'min': {
            'default': 0
        },
        'max': {
            'default': 100
        },
        'range': {
            'default': false
        },
    },
    data: function() {
        return {
            // --- 圆坨坨左侧位置百分比，如 80 ---
            'pos': [0, 0]
        };
    },
    'computed': {
        barWidth: function(this: types.IVue) {
            /**
            原公式：
            100 - this.pos[0] - (100 - this.pos[1])
            展开括号：
            100 - this.pos[0] - 100 + this.pos[1]
            合并常数：
            100 - 100 - this.pos[0] + this.pos[1]
            0 - this.pos[0] + this.pos[1]
            */
            return this.pos[1] - this.pos[0];
        },
        barLeft: function(this: types.IVue) {
            return this.pos[0];
        }
    },
    methods: {
        down: function(this: types.IVue, e: TouchEvent | MouseEvent, i: number) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            const bcr = this.$el.getBoundingClientRect();
            /** --- slider 的宽度 --- */
            const width = bcr.width;
            const left = bcr.left;
            dom.bindDown(e, {
                move: (ne) => {
                    // --- 当前的位置 ---
                    const nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                    /** --- 当前滑块位置 --- */
                    let pos = (nx - left) / width * 100;
                    // --- 先判断滑块不能大于 100% 小于 0% ---
                    if (pos < 0) {
                        pos = 0;
                    }
                    else if (pos > 100) {
                        pos = 100;
                    }
                    // --- 然后判断滑块不能小于左侧不能大于右侧 ---
                    if (this.propBoolean('range')) {
                        if (i === 0) {
                            // --- 左侧 ---
                            if (pos > this.pos[1]) {
                                pos = this.pos[1];
                            }
                        }
                        else {
                            // --- 右侧 ---
                            if (pos < this.pos[0]) {
                                pos = this.pos[0];
                            }
                        }
                    }
                    this.pos[i] = pos;
                    this.$emit('update:modelValue', [
                        this.propInt('min') + Math.round(this.pos[0] / 100 * (this.propInt('max') - this.propInt('min'))),
                        this.propBoolean('range') ? this.propInt('min') + Math.round(this.pos[1] / 100 * (this.propInt('max') - this.propInt('min'))) : 0,
                    ]);
                }
            });
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (!Array.isArray(this.modelValue)) {
                    this.$emit('update:modelValue', [0, 0]);
                    return;
                }
                let change = false;
                if (typeof this.modelValue[0] !== 'number') {
                    this.modelValue[0] = parseInt(this.modelValue[0]);
                    if (Number.isNaN(this.modelValue[0])) {
                        this.modelValue[0] = 0;
                    }
                    change = true;
                }
                if (typeof this.modelValue[1] !== 'number') {
                    this.modelValue[1] = parseInt(this.modelValue[1]);
                    change = true;
                }
                if (this.propBoolean('range')) {
                    if (this.modelValue[0] > this.modelValue[1]) {
                        this.modelValue[0] = this.modelValue[1];
                        change = true;
                    }
                }
                if (change) {
                    this.$emit('update:modelValue', this.modelValue);
                }
                this.pos[0] = (this.modelValue[0] - this.propInt('min')) / (this.propInt('max') - this.propInt('min')) * 100;
                this.pos[1] = (this.modelValue[1] - this.propInt('min')) / (this.propInt('max') - this.propInt('min')) * 100;
            },
            'immediate': true
        }
    }
};

list['pe-swipe'] = {
    'template': `<div class="pe-swipe" :class="['pe-control-'+control]"><div class="pe-swipe-wrap" @mousedown="down" @touchstart="down" :style="{'border-radius':radius?radius+'px':undefined}"><div class="pe-swipe-items" ref="items"><slot></slot></div></div><div class="pe-swipe-page" :class="['pe-'+page]"><div v-for="i of pageCount" class="pe-swipe-page-item" :class="[(selected===i-1)&&'pe-selected']" @click="pdown(i)"></div></div><div v-if="pageCount > 1" class="pe-swipe-prev" @click="prev"></div><div v-if="pageCount > 1" class="pe-swipe-next" @click="next"></div></div>`,
    'props': {
        'modelValue': {
            'default': 0
        },
        // ---- 自动滚动 ---
        'auto': {
            'default': false
        },
        'page': {
            // --- left, center, right, none ---
            'default': 'center'
        },
        'control': {
            // --- inner, outer ---
            'default': 'inner'
        },
        // --- 外大圆角 ---
        'radius': {
            'default': undefined
        },
        // --- 一页显示多个 item，默认 1 只显示一个 ---
        'item': {
            'default': 1
        },
        'minitem': {
            'default': 1
        },
        // --- 内页间距 ---
        'gutter': {
            'default': 0
        }
    },
    data: function() {
        return {
            /** --- 总数 --- */
            'itemCount': 0,
            /** --- 当前显示中的 swipe --- */
            'selected': 0,
            /** --- 用户设置的 selected --- */
            'mvselected': 0,
            /** --- 自动滚动的 timer  --- */
            'timer': null,

            /** --- 当前 swipe 的位置 --- */
            'translate': 0,
            /** --- 当前 swipe 的宽度 --- */
            'width': 0,

            /** --- 当前是否正在执行动画 --- */
            'going': false
        };
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.selected === this.modelValue) {
                    return;
                }
                this.mvselected = this.modelValue;
                if (this.going) {
                    return;
                }
                this.selected = this.mvselected;
                this.go();
            },
            'immediate': true
        },
        'auto': {
            handler: function(this: types.IVue) {
                if (tool.getBoolean(this.auto)) {
                    // --- 静 变 动 ---
                    this.timer = setTimeout(() => {
                        this.timer = null;
                        ++this.selected;
                        this.go();
                        this.mvselected = this.selected;
                        this.$emit('update:modelValue', this.mvelected);
                    }, 3000);
                    return;
                }
                clearTimeout(this.timer);
                this.timer = null;
            }
        }
    },
    'computed': {
        /** --- 总宽度 --- */
        awidth: function(this: types.IVue) {
            return (this.width * this.pageCount) + (this.propNumber('gutter') * (this.pageCount - 1));
        },
        /** --- 每个 item 应该的宽度 --- */
        iwidth: function(this: types.IVue): string {
            const iwidth = 100 / this.pitem;
            if (this.pitem > 1) {
                return 'calc((100% - ' + (this.pitem - 1) * this.propNumber('gutter') + 'px) / ' + this.pitem + ')';
            }
            return iwidth + '%';
        },
        /** --- 总页数 --- */
        pageCount: function(this: types.IVue) {
            return Math.ceil(this.itemCount / this.pitem);
        },
        /** --- 一页面有多少个 item --- */
        pitem: function(this: types.IVue): number {
            return tool.getNumber(this.$root.windowWidth >= 800 ? this.$props.item : this.$props.minitem);
        },
    },
    methods: {
        down: function(this: types.IVue, e: TouchEvent | MouseEvent) {
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            if (this.going) {
                return;
            }
            if (this.pageCount < 2) {
                return;
            }
            const target = e.target as HTMLElement | null;
            if (!target) {
                return;
            }
            if (target.tagName.toLowerCase() === 'a') {
                return;
            }
            const a = dom.findParentByTag(target, 'a');
            if (a) {
                return;
            }
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            /** --- 原始 x 位置 --- */
            const ox = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
            /** --- 上次的 x 位置 --- */
            let x = ox;
            const time = Date.now();
            dom.bindDown(e, {
                move: (ne) => {
                    // --- 当前的位置 ---
                    const nx = ne instanceof MouseEvent ? ne.clientX : ne.touches[0].clientX;
                    /** --- 移动的差值 --- */
                    const cx = nx - x;
                    x = nx;
                    this.translate += cx;
                    if (this.translate > this.width) {
                        this.translate = this.width;
                    }
                    else if (this.translate < -this.awidth) {
                        this.translate = -this.awidth;
                    }
                    this.$refs.items.style.transform = 'translateX(' + this.translate + 'px)';
                },
                end: () => {
                    const cx = x - ox;
                    const speed = Math.abs(cx / (Date.now() - time));
                    /** --- 看看当前滚动哪儿了 --- */
                    const info = -(this.translate / this.width);
                    /** --- 当前的位置 --- */
                    const index = Math.floor(info);
                    /** --- 当前的小数 --- */
                    const dec = tool.getDecimal(info);
                    if (speed > 0.6) {
                        // --- 速度很快，一定到下一条 ---
                        // --- cx 大于 0 为向左滑动 ---
                        this.selected = cx > 0 ? index : index + 1;
                        this.go();
                        this.mvselected = this.selected;
                        this.$emit('update:modelValue', this.mvselected);
                        return;
                    }
                    // --- 速度很慢，根据位置选择显示 ---
                    if (index >= 0) {
                        this.selected = dec >= 0.5 ? index + 1 : index;
                    }
                    else {
                        this.selected = dec >= -0.5 ? index + 1 : index;
                    }
                    this.go();
                    this.mvselected = this.selected;
                    this.$emit('update:modelValue', this.mvselected);
                }
            });
        },
        prev: function(this: types.IVue) {
            if (this.going) {
                return;
            }
            this.translate += 10;
            --this.selected;
            this.go();
            this.mvselected = this.selected;
            this.$emit('update:modelValue', this.mvselected);
        },
        next: function(this: types.IVue) {
            if (this.going) {
                return;
            }
            this.translate -= 10;
            ++this.selected;
            this.go();
            this.mvselected = this.selected;
            this.$emit('update:modelValue', this.mvselected);
        },
        pdown: function(this: types.IVue, p: number) {
            if (this.going) {
                return;
            }
            --p;
            if (p === this.selected) {
                return;
            }
            this.selected = p;
            this.go();
            this.mvselected = this.selected;
            this.$emit('update:modelValue', this.mvselected);
        },
        go: async function(this: types.IVue) {
            this.going = true;
            const index = this.selected;
            if (this.selected === -1) {
                this.selected = this.pageCount - 1;
            }
            else if (this.selected === this.pageCount) {
                this.selected = 0;
            }
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.$refs.items.style.transition = 'var(--pe-transition)';
            // --- 设置允许缓动 ---
            await tool.sleep(34);
            this.$refs.items.style.transform = 'translateX(' + (-(index * this.width + index * this.propNumber('gutter'))).toString() + 'px)';
            // --- 应用缓动后等待动画执行完成 ---
            await tool.sleep(334);
            this.$refs.items.style.transition = '';
            await tool.sleep(34);
            // --- 移除缓动效果后重置位置 ---
            this.translate = -(this.selected * this.width + this.selected * this.propNumber('gutter'));
            this.$refs.items.style.transform = 'translateX(' + this.translate + 'px)';
            this.going = false;
            // --- 判断 ---
            if (this.mvselected !== this.selected) {
                this.selected = this.mvselected;
                this.go();
                return;
            }
            if (tool.getBoolean(this.auto)) {
                this.timer = setTimeout(() => {
                    this.translate -= 10;
                    this.timer = null;
                    ++this.selected;
                    this.go();
                    this.mvselected = this.selected;
                    this.$emit('update:modelValue', this.mvselected);
                }, 3000);
            }
        },
        resize: function(this: types.IVue) {
            this.width = this.$el.offsetWidth;
            this.translate = -(this.selected * this.width);
            this.$refs.items.style.transform = 'translateX(' + this.translate + 'px)';
        }
    },
    mounted: async function(this: types.IVue) {
        await tool.sleep(68);
        this.width = this.$el.offsetWidth;
        if (tool.getBoolean(this.auto)) {
            this.timer = setTimeout(() => {
                this.timer = null;
                ++this.selected;
                this.go();
                this.mvselected = this.selected;
                this.$emit('update:modelValue', this.mvelected);
            }, 3000);
        }
        window.addEventListener('resize', this.resize);
    },
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        window.removeEventListener('resize', this.resize);
        if (!this.timer) {
            return;
        }
        clearTimeout(this.timer);
    }
};

list['pe-swipe-item'] = {
    'template': `<div class="pe-swipe-item" :class="['pe-direction-'+direction]" :style="{'left': left, 'width': iwidth}"><slot></slot></div>`,
    'props': {
        'direction': {
            'default': 'h'
        }
    },
    'data': function() {
        return {
            'index': 0
        };
    },
    'computed': {
        /** --- 当前 item 应该在第几页显示 --- */
        npage: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return Math.floor(this.index / this.$parent.pitem);
        },
        /** --- 当前 item 在当前页的 index --- */
        pindex: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.index % this.$parent.pitem;
        },
        left: function(this: types.IVue): string {
            if (!this.$parent) {
                return '0';
            }
            const gutter = tool.getNumber(this.$parent.$props.gutter);
            let left = this.width * this.npage + (this.npage * gutter);
            if (this.translate > 0) {
                if (this.npage === this.$parent.pageCount - 1) {
                    // --- 最后页显示在最前面 ---
                    left = -this.width - gutter;
                }
            }
            else if (this.translate < -this.awidth + this.width) {
                if (this.npage === 0) {
                    // --- 当前是第一个页面要显示在最后 ---
                    left = this.awidth + gutter;
                }
            }
            // --- 单页偏移 ---
            if (this.pindex > 0) {
                return 'calc(' + (left + (gutter * this.pindex)) + 'px + ' + this.iwidth + ' * ' + this.pindex + ')';
            }
            return left + 'px';
        },
        // --- 一个页面的宽度 ---
        width: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.width;
        },
        // --- 总宽度 ---
        awidth: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.awidth;
        },
        // --- 当前 item 应该的宽度百分比 ---
        iwidth: function(this: types.IVue) {
            if (!this.$parent) {
                return '100%';
            }
            return this.$parent.iwidth;
        },
        translate: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.translate;
        }
    },
    mounted: function(this: types.IVue) {
        if (!this.$parent) {
            return;
        }
        if (this.$parent.itemCount === undefined) {
            return;
        }
        ++this.$parent.itemCount;
        this.index = dom.index(this.$el);
    },
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        if (!this.$parent) {
            return;
        }
        if (this.$parent.itemCount === undefined) {
            return;
        }
        --this.$parent.itemCount;
    }
};

list['pe-switch'] = {
    'template': `<div class="pe-switch" :class="[value===mapComp.true&&'pe-checked',propBoolean('disabled')&&'pe-disabled']" :tabindex="!propBoolean('disabled') ? '0' : undefined" @click="click" @keydown="keydown"><div class="pe-switch-block"></div></div>`,
    'props': {
        'disabled': {
            'default': false,
        },
        'map': {
            'default': {},
        },

        'modelValue': {
            'default': false,
        }
    },
    'data': function() {
        return {
            'value': false
        };
    },
    'computed': {
        mapComp: function(this: types.IVue): {
            'true': any;
            'false': any;
        } {
            return {
                'true': this.$props.map.true ?? true,
                'false': this.$props.map.false ?? false
            };
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.$props.modelValue === undefined) {
                    return;
                }
                this.value = this.$props.modelValue;
            },
            'immediate': true
        }
    },
    'methods': {
        click: function(this: types.IVue): void {
            const event: types.ISwitchChangeEvent = {
                'go': true,
                preventDefault: function() {
                    this.go = false;
                },
                'detail': {
                    'value': this.value
                }
            };
            this.$emit('change', event);
            if (event.go) {
                this.value = this.value === this.mapComp.true ? this.mapComp.false : this.mapComp.true;
                this.$emit('update:modelValue', this.value);
            }
        },
        keydown: function(this: types.IVue, e: KeyboardEvent): void {
            if (e.key !== 'Enter') {
                return;
            }
            e.preventDefault();
            this.click();
        },
    }
};

list['pe-tab'] = {
    'template': `<div class="pe-tab" :class="[propBoolean('plain')&&'pe-plain']"><slot></slot></div>`,
    'data': function() {
        return {
            'selected': 0
        };
    },
    'props': {
        'modelValue': {
            'default': 0
        },
        'plain': {
            'default': false,
        }
    },
    'watch': {
        'selected': {
            handler: function(this: types.IVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.$emit('update:modelValue', this.selected);
            }
        },
        'modelValue': {
            handler: function(this: types.IVue) {
                if (this.modelValue === this.selected) {
                    return;
                }
                this.selected = this.modelValue;
            },
            'immediate': true
        }
    }
};

list['pe-tab-item'] = {
    'template': `<div class="pe-tab-item" :class="[isSelected&&'pe-selected']" @mouseenter="hover" @touchstart="hover"><slot></slot></div>`,
    'data': function() {
        return {
            'index': 0
        };
    },
    'computed': {
        isSelected: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.selected === this.index;
        }
    },
    'methods': {
        hover: function(this: types.IVue, e: MouseEvent | TouchEvent) {
            if (!this.$parent) {
                return;
            }
            if (dom.hasTouchButMouse(e)) {
                return;
            }
            this.$parent.selected = this.index;
        }
    },
    mounted: function(this: types.IVue) {
        if (!this.$parent) {
            return;
        }
        if (this.$parent.selected === undefined) {
            return;
        }
        this.index = dom.index(this.$el);
    },
};

list['pe-table'] = {
    'template': `<div class="pe-table" :class="[propBoolean('adaption')&&'pe-adaption',propBoolean('plain')&&'pe-plain']"><slot></slot></div>`,
    'data': function() {
        return {
            'controlName': 'table',
            'headCount': 0,
        };
    },
    'props': {
        'adaption': {
            'default': false
        },
        'plain': {
            'default': false
        }
    },
};

list['pe-table-cell'] = {
    'template': `<div class="pe-table-cell"><slot></slot></div>`,
};

list['pe-table-head'] = {
    'template': `<div class="pe-table-head"><slot></slot></div>`,
    mounted: function(this: types.IVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('+');
        }
    },
    unmounted: function(this: types.IVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('-');
        }
    }
};

list['pe-table-row'] = {
    'template': `<div class="pe-table-row" :class="[isAdaption&&'pe-adaption',(index===0)&&'pe-table-header',propBoolean('title')&&'pe-table-row-title']" :style="{'--pe-cols': table?.headCount.toString()}"><slot></slot></div>`,
    'data': function() {
        return {
            'controlName': 'table-row',
            'headCount': 0,
            'table': null,
            'index': -1
        };
    },
    'props': {
        'title': {
            'default': false
        },
    },
    'computed': {
        'isAdaption': function(this: types.IVue) {
            return this.table?.propBoolean('adaption') ?? false;
        },
    },
    'methods': {
        updateHeadCount: function(this: types.IVue, o: '+' | '-') {
            if (o === '+') {
                ++this.headCount;
            }
            else {
                --this.headCount;
            }
            this.table ??= this.parentByName('table');
            if (this.index === -1) {
                this.index = dom.index(this.$el);
            }
            // --- 一些参数 ---
            if (this.table) {
                this.table.headCount = this.headCount;
            }
        }
    },
    mounted: function(this: types.IVue) {
        const table = this.parentByName('table');
        if (table) {
            this.table = table;
        }
    }
};

list['pe-tag'] = {
    'template': `<div class="pe-tag" :class="['pe-type-'+type, propBoolean('plain')&&'pe-plain', 'pe-size-' + size]" ><slot></slot><svg v-if="propBoolean('close')" width="16" height="16" viewBox="0 0 24 24" stroke="none" @click="$emit('close')"><path d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z" /></svg></div>`,
    'emits': {
        'close': null
    },
    'props': {
        'type': {
            // --- default' | 'primary' | 'info' | 'warning' | 'danger' | 'cg' ---
            'default': 'default'
        },
        'plain': {
            'default': false
        },
        'size': {
            // --- 'm' | 'l' ---
            'default': 'm'
        },
        'close': {
            'default': false
        }
    },
};

list['pe-text'] = {
    'template': `<div class="pe-text" :class="[isFocus&&'pe-focus',propBoolean('plain')&&'pe-plain',propBoolean('disabled')&&'pe-disabled']"><div v-if="$slots['before']" class="pe-before"><slot name="before"></slot></div><div v-if="$slots['prepend']" class="pe-prepend"><slot name="prepend"></slot></div><textarea v-if="type==='multi'" ref="text" :placeholder="placeholder" :value="value" @input="input" @focus="tfocus" @blur="tblur"></textarea><input v-else ref="text" :placeholder="placeholder" :value="value" @input="input" @focus="tfocus" @blur="tblur" :type="type"><div v-if="$slots['append']" class="pe-append"><slot name="append"></slot></div><div v-if="$slots['after']" class="pe-after"><slot name="after"></slot></div></div>`,
    'props': {
        'modelValue': {
            'default': ''
        },
        'readonly': {
            'default': false
        },
        'type': {
            // --- 'text' | 'multi' | 'password' | 'number' ---
            'default': 'text'
        },
        'placeholder': {
            'default': ''
        },
        'disabled': {
            'default': false
        },
        'plain': {
            'default': false
        },
        'maxlength': {
            'default': 0
        },
        'max': {
            'default': undefined
        },
        'min': {
            'default': undefined
        },
    },
    'emits': {
        'beforechange': null,
        'focus': null,
        'blur': null,

        'update:modelValue': null
    },
    'data': function() {
        return {
            'isFocus': false,
            'value': ''
        };
    },
    'methods': {
        /** --- 检测 value 值是否符合 max 和 min --- */
        checkNumber: function(this: types.IVue, target?: HTMLInputElement | HTMLTextAreaElement) {
            target ??= this.$refs.text as unknown as HTMLInputElement | HTMLTextAreaElement;
            if (this.$props.type !== 'number') {
                return false;
            }
            let change = false;
            if (!target.value && this.value) {
                change = true;
            }
            if (target.value) {
                const val = parseFloat(target.value);
                if (this.$props.max !== undefined && this.$props.max !== 'undefined' && val > this.propNumber('max')) {
                    target.value = this.propNumber('max').toString();
                    change = true;
                }
                if (this.$props.min !== undefined && this.$props.min !== 'undefined' && val < this.propNumber('min')) {
                    target.value = this.propNumber('min').toString();
                    change = true;
                }
            }
            return change;
        },
        /** --- 文本框的 input 事件 --- */
        input: function(this: types.IVue, e: InputEvent) {
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            if (this.propNumber('maxlength') && (target.value.length > this.propNumber('maxlength'))) {
                target.value = target.value.slice(0, this.propNumber('maxlength'));
                return;
            }
            const event: types.ITextBeforechangeEvent = {
                'go': true,
                preventDefault: function() {
                    this.go = false;
                },
                'detail': {
                    'value': target.value,
                    'change': undefined
                }
            };
            this.$emit('beforechange', event);
            if (!event.go) {
                target.value = this.value;
                return;
            }
            if (event.detail.change !== undefined) {
                target.value = event.detail.change;
            }
            this.value = target.value;
            this.$emit('update:modelValue', this.value);
        },
        /** --- 文本框的 focus 事件 --- */
        tfocus: function(this: types.IVue): void {
            this.isFocus = true;
            this.$emit('focus');
        },
        tblur: function(this: types.IVue, e: FocusEvent): void {
            // --- 如果是 number 则要判断数字是否符合 min max，不能在 input 判断，因为会导致用户无法正常输入数字，比如最小值是 10，他在输入 1 的时候就自动重置成 10 了 ---
            const target = e.target as HTMLInputElement | HTMLTextAreaElement;
            if (this.checkNumber(target)) {
                const event: types.ITextBeforechangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': target.value,
                        'change': undefined
                    }
                };
                this.$emit('beforechange', event);
                if (event.go) {
                    // --- 允许 ---
                    if (event.detail.change !== undefined) {
                        target.value = event.detail.change;
                    }
                    this.value = target.value;
                    this.$emit('update:modelValue', this.value);
                }
                else {
                    // --- 禁止 ---
                    target.value = this.value;
                }
            }
            this.isFocus = false;
            this.$emit('blur');
        },
    },
    'watch': {
        'modelValue': {
            handler: async function(this: types.IVue) {
                if (this.value === this.$props.modelValue) {
                    return;
                }
                this.value = this.$props.modelValue;
                await this.$nextTick();
                this.checkNumber();
                if (this.propNumber('maxlength') && this.$refs.text.value.length > this.propNumber('maxlength')) {
                    this.$refs.text.value = this.$refs.text.value.slice(0, this.propNumber('maxlength'));
                }
                // --- 有可能设置后控件实际值和设置的值不同，所以要重新判断一下 ---
                if (this.$refs.text.value === this.value) {
                    return;
                }
                const event: types.ITextBeforechangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': this.$refs.text.value,
                        'change': undefined
                    }
                };
                this.$emit('beforechange', event);
                if (!event.go) {
                    this.$refs.text.value = this.value;
                    return;
                }
                this.value = event.detail.change ?? this.$refs.text.value;
                this.$emit('update:modelValue', this.value);
            },
            'immediate': true
        },
        'type': {
            handler: async function(this: types.IVue) {
                await this.$nextTick();
                if (this.checkNumber()) {
                    const event: types.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': this.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        this.$refs.text.value = this.value;
                        return;
                    }
                    this.value = event.detail.change ?? this.$refs.text.value;
                    this.$emit('update:modelValue', this.value);
                }
            }
        },
        'max': {
            handler: function(this: types.IVue) {
                if (this.checkNumber()) {
                    const event: types.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': this.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        this.$refs.text.value = this.value;
                        return;
                    }
                    this.value = event.detail.change ?? this.$refs.text.value;
                    this.$emit('update:modelValue', this.value);
                }
            }
        },
        'min': {
            handler: function(this: types.IVue) {
                if (this.checkNumber()) {
                    const event: types.ITextBeforechangeEvent = {
                        'go': true,
                        preventDefault: function() {
                            this.go = false;
                        },
                        'detail': {
                            'value': this.value,
                            'change': undefined
                        }
                    };
                    this.$emit('beforechange', event);
                    if (!event.go) {
                        this.$attrsrefs.text.value = this.value;
                        return;
                    }
                    this.value = event.detail.change ?? this.$refs.text.value;
                    this.$emit('update:modelValue', this.value);
                }
            }
        },
        'maxlength': {
            handler: function(this: types.IVue) {
                if (!this.propNumber('maxlength')) {
                    return;
                }
                if (this.value.length <= this.propNumber('maxlength')) {
                    return;
                }
                const value = this.value.slice(0, this.propNumber('maxlength'));
                const event: types.ITextBeforechangeEvent = {
                    'go': true,
                    preventDefault: function() {
                        this.go = false;
                    },
                    'detail': {
                        'value': value,
                        'change': undefined
                    }
                };
                this.$emit('beforechange', event);
                if (!event.go) {
                    return;
                }
                this.value = event.detail.change ?? value;
                this.$emit('update:modelValue', this.value);
            }
        }
    },
};

list['pe-vnumber'] = {
    'template': `<div class="pe-vnumber-wrap" :class="[isFocus&&'pe-focus',propBoolean('disabled')&&'pe-disabled']"><input class="pe-vnumber-input" @focus="isFocus=true" @blur="isFocus=false" @input="input" ref="input" type="number" /><div v-for="item of propInt('length')" class="pe-vnumber-item"><span v-if="value[item - 1]">{{value[item - 1]}}</span><span v-else-if="isFocus && (value.length + 1) === item" class="pe-vnumber-insert">▁</span><span v-else></span></div></div>`,
    'emits': {
        'changed': null,
        'update:modelValue': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },

        'modelValue': {
            'default': '',
        },
        'length': {
            'default': 6
        },
    },
    data: function() {
        return {
            'value': [],
            'isFocus': false
        };
    },
    'watch': {
        'modelValue': {
            handler: function(this: types.IVue) {
                if (!this.$refs.input) {
                    return;
                }
                if (this.modelValue === this.$refs.input.value) {
                    return;
                }
                this.value.length = 0;
                for (const char of this.modelValue) {
                    if (this.value.length === this.propInt('length')) {
                        break;
                    }
                    if (!/[0-9]/.test(char)) {
                        continue;
                    }
                    this.value.push(char);
                }
                this.$refs.input.value = this.value.join('');
                if (this.modelValue === this.$refs.input.value) {
                    return;
                }
                this.$emit('update:modelValue', this.$refs.input.value);
                this.$emit('changed');
            },
            'immediate': true
        }
    },
    'methods': {
        input: function(this: types.IVue) {
            const value = this.$refs.input.value;
            this.value.length = 0;
            for (const char of value) {
                if (this.value.length === this.propInt('length')) {
                    break;
                }
                if (!/[0-9]/.test(char)) {
                    continue;
                }
                this.value.push(char);
            }
            const mv = this.value.join('');
            if (this.$refs.input.value !== mv) {
                this.$refs.input.value = mv;
            }
            this.$emit('update:modelValue', mv);
            this.$emit('changed');
        }
    },
};
