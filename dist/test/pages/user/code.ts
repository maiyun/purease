import * as purease from '../../../purease.js';

export default class extends purease.AbstractPanel {

    public main(): void {
        purease.display('UserPanel mounted, id:', this.routeInfo?.params['id']);
    }

}
