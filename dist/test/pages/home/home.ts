import * as purease from '../../../purease.js';

export default class extends purease.AbstractRouterPage {

    public number = 0;

    public main(): void {
        purease.display('Home page loaded.');
    }

}
