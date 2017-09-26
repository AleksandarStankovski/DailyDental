import { 
    Component, 
    OnInit,
    Output,
    EventEmitter } from '@angular/core';

@Component({
    selector: 'app-floating-button',
    templateUrl: './floating-button.component.html',
    styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {

    @Output() openModalDialog: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    floatingButtonClick() {
        this.openModalDialog.emit();
    }

}
