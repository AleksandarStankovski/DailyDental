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
                routerIcon: 'icon-protection'
            },
            {
                routerLink: '/about-us/dental-offices',
                routerText: 'Кабинети',
                routerIcon: 'icon-chair-fill'
            },
            {
                routerLink: '/about-us/staff',
                routerText: 'Персонал',
                routerIcon: 'icon-doctor'
            },
            {
                routerLink: '/about-us/price-list',
                routerText: 'Ценова листа',
                routerIcon: 'icon-clipboard-2'
            }
        ]
    }
}
