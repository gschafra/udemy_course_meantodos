import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
    selector: 'app-confirm',
    templateUrl: 'confirm.component.html'
})
// see https://plnkr.co/edit/nYqPPQe58E2RW8C2yz49
export class ConfirmComponent extends DialogComponent {
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    confirm() {
        // on click on confirm button we set dialog result as true,
        // ten we can get dialog result from caller code
        this.result = true;
        this.close();
    }
}
