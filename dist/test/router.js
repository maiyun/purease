import * as purease from '../purease.js';
class Page extends purease.AbstractPage {
    async main() {
    }
}
purease.launcher(Page, {
    'debug': true,
    'version': purease.version,
});
