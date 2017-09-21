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
                routerIcon: 'dashboard'
            },
            {
                routerLink: '/about-us/dental-offices',
                routerText: 'Кабинети',
                routerIcon: 'dashboard'
            },
            {
                routerLink: '/about-us/staff',
                routerText: 'Персонал',
                routerIcon: 'dashboard'
            },
            {
                routerLink: '/about-us/price-list',
                routerText: 'Ценова листа',
                routerIcon: 'dashboard'
            }
        ]
    }
}
