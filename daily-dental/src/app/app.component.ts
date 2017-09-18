import {
    Component,
    OnInit } from '@angular/core';
    
import { ActivatedRoute }    from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   
    title = 'app';
    navList;

    constructor(private route: ActivatedRoute) {}
    

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

        this.route.data.subscribe(result => {
            console.log(result)
            console.log(result['name'])
        })

        const myData = this.route.snapshot.data['name'];
        console.log(myData)

    }
}
