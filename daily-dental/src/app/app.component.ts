import {
    Component,
    OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'app';

    navList;

    ngOnInit() {
        this.navList = [
            {
                routerLink: '/home',
                routerText: 'Начало'
            },
            {
                routerLink: '/clinic/price-list',
                routerText: 'Клиника'
            },
            {
                routerLink: '/patients',
                routerText: 'Пациенти'
            },
            {
                routerLink: '/reception',
                routerText: 'Рецепция'
            }
        ]
    }
}
