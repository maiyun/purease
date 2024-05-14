import * as purease from '../index';
import footer from '../test/footer';

class Page extends purease.AbstractPage {

    public text = '123';

    public select = 'h';

    // --- swipe ---

    public tab = 0;

    public main(): void | Promise<void> {
        console.log('Inited.', purease);
    }

}
purease.launcher(new Page({
    'debug': true
}), [
    {
        'selector': '#footer',
        'panel': footer
    }
]);