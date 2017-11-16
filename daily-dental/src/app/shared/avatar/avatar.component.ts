import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

    text: string;
    @Input() color: string;
    @Input() firstName: string;
    @Input() lastName: string;

    constructor() { }

    ngOnInit() {
        this.convertText();
    }

    convertText(): void {
        const firstName = this.firstName || '';
        const lastName = this.lastName || '';
        const primatyText = firstName.charAt(0) + lastName.charAt(0);
        this.text = primatyText.toUpperCase();
    }

}
