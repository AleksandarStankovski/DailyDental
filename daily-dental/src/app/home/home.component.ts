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
                routerLink: '/about-us/price-list',
                routerText: 'Клиника',
                routerIcon: 'dashboard'
            },
            {
                routerLink: '/patients',
                routerText: 'Пациенти',
                routerIcon: 'dashboard'
            },
            {
                routerLink: '/reception',
                routerText: 'Рецепция',
                routerIcon: 'dashboard'
            }
        ]
     }

}
