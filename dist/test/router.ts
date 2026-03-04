import * as purease from '../purease.js';

class Page extends purease.AbstractPage {

    public async main(): Promise<void> {
    }

}

purease.launcher(Page, {
    'debug': true,
    'version': purease.version,
});
