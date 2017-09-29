import {
    Component,
    OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    navList: [{}];

    constructor() { }

    ngOnInit() {

        this.navList = [
            {
                routerLink: '/reception',
                routerText: 'Рецепция'
            },
            {
                routerLink: '/patients',
                routerText: 'Пациенти'
            },
            {
                routerLink: '/about-us/clinic-info',
                routerText: 'Клиника'
            },
            {
                routerLink: '/about-us/price-list',
                routerText: 'Ценова листа'
            }
        ]
     }

}
