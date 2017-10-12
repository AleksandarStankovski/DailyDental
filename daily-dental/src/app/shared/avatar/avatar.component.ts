import { 
    Component, 
    OnInit,
    Input } from '@angular/core';

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
        let primatyText = this.firstName.charAt(0) + this.lastName.charAt(0);
        this.text = primatyText.toUpperCase();
    }

}
