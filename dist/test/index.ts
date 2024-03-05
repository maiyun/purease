import * as purease from '../index';

class Page extends purease.AbstractPage {

    public main(): void | Promise<void> {
        console.log('x', purease);
    }

}
purease.launcher(new Page());