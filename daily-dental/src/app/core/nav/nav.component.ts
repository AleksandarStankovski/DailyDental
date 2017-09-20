import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    @Input() navList;
    @Input() isVisibleMenu: boolean;
    @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    toggle() {
        this.toggleMenu.emit();
    }

}
