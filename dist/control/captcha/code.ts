import * as types from '../../../types';

export const code = {
    'template': '',
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
