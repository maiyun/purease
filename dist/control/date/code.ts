import * as lDom from '../../dom';
import * as lControl from '../../control';
import * as purease from '../../purease.js';

export const code = {
    'template': '',
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
                },
                'ar': {
                    'hour': 'س',
                    'minute': 'د',
                    'second': 'ث',
                    'zone': 'منطقة',
                    'cancel': 'إلغاء',
                    'ok': 'موافق',
                    'please click select': 'انقر للاختيار'
                },
                'id': {
                    'hour': 'Jam',
                    'minute': 'Mnt',
                    'second': 'Dtk',
                    'zone': 'Zona',
                    'cancel': 'Batal',
                    'ok': 'OK',
                    'please click select': 'Klik pilih'
                },
                'it': {
                    'hour': 'Ora',
                    'minute': 'Min',
                    'second': 'Sec',
                    'zone': 'Zona',
                    'cancel': 'Annulla',
                    'ok': 'OK',
                    'please click select': 'Clicca per selez.'
                },
                'tr': {
                    'hour': 'Sa',
                    'minute': 'Dak',
                    'second': 'Sn',
                    'zone': 'Bölge',
                    'cancel': 'İptal',
                    'ok': 'Tamam',
                    'please click select': 'Seç için tıkla'
                }
            }
        };
    },
    'methods': {
        // --- 单击事件 ---
        click: function(this: purease.IVue, e: MouseEvent, type: 'first' | 'zone'): void {
            const el = this.$refs[type + 'pop'];
            if (el.classList.contains('pe-show')) {
                lDom.hidePop(el);
                return;
            }
            if (type === 'first' && !this.propBoolean('date')) {
                lDom.showPop(e, this.$refs['timepop']);
                return;
            }
            lDom.showPop(e, el);
        },
        zoneOk: function(this: purease.IVue): void {
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
                const event: lControl.IDateChangedEvent = {
                    'detail': {
                        'value': this.timestamp
                    }
                };
                this.$emit('changed', event);
            }
            lDom.hidePop();
        },
        timeOk: function(this: purease.IVue): void {
            this.dateObj.setUTCHours(
                parseInt(this.vhour), parseInt(this.vminute), parseInt(this.vseconds), 0
            );
            this.timestamp = this.dateObj.getTime() - this.tzData * 60 * 60 * 1000;
            this.dateStr = this.dateObj.getUTCFullYear().toString() + '-' + (this.dateObj.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + this.dateObj.getUTCDate().toString().padStart(2, '0');
            this.timeStr = this.dateObj.getUTCHours().toString().padStart(2, '0') + ':' + this.dateObj.getUTCMinutes().toString().padStart(2, '0') + ':' + this.dateObj.getUTCSeconds().toString().padStart(2, '0');
            this.$emit('update:modelValue', this.timestamp);
            const event: lControl.IDateChangedEvent = {
                'detail': {
                    'value': this.timestamp
                }
            };
            this.$emit('changed', event);
            this.$emit('update:hourminute', this.vhour + this.vminute + this.vseconds);
            lDom.hidePop();
        },
        cancel: function(): void {
            lDom.hidePop();
        },
        clear: function(this: purease.IVue): void {
            this.timestamp = undefined;
            this.$emit('update:modelValue', undefined);
        },
        // --- date panel 的 changed ---
        changed: function(this: purease.IVue): void {
            this.$emit('update:modelValue', this.timestamp);
            const event: lControl.IDateChangedEvent = {
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
        selected: function(this: purease.IVue): void {
            lDom.hidePop(this.$refs.firstpop);
        }
    },
    'mounted': function(this: purease.IVue) {
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
