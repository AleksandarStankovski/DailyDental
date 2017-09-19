import {
    Component,
    OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   
    title: string = 'app';
    navList: [{}];

    ngOnInit() {
        this.navList = [
            {
                routerLink: '/home',
                routerText: 'Начало'
            },
            {
                routerLink: '/about-us/price-list',
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
