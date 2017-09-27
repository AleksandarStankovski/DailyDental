import {
    Component,
    OnInit } from '@angular/core';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    navList;

    constructor() { }

    ngOnInit() {
        this.navList = [
            {
                routerLink: '/about-us/clinic-info',
                routerText: 'Клиника',
                routerIcon: '010-protection.svg'
            },
            {
                routerLink: '/about-us/dental-offices',
                routerText: 'Кабинети',
                routerIcon: '015-chair.svg'
            },
            {
                routerLink: '/about-us/staff',
                routerText: 'Персонал',
                routerIcon: '001-dentist.svg'
            },
            {
                routerLink: '/about-us/price-list',
                routerText: 'Ценова листа',
                routerIcon: '014-clipboard.svg'
            }
        ]
    }
}
