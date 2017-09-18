import {
    Component,
    OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    title;

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                switch(event.url) {
                    case '/home': {
                        this.title = 'Начална страница'
                        break;
                    }
                    case '/about-us/clinic-info': {
                        this.title = 'Клиника'
                        break;
                    }
                    case '/about-us/dental-offices': {
                        this.title = 'Кабинети'
                        break;
                    }
                    case '/about-us/staff': {
                        this.title = 'Персонал'
                        break;
                    }
                    case '/about-us/price-list': {
                        this.title = 'Ценова листа'
                        break;
                    }
                    case '/about-us/staff': {
                        this.title = 'Персонал'
                        break;
                    }
                    case '/patients': {
                        this.title = 'Пациенти'
                        break;
                    }
                    case '/reception': {
                        this.title = 'Рецепция'
                        break;
                    }
                    default: {
                        this.title = 'Default'
                    }
                }
            }
        }); 
    }

    ngOnInit() {}

}
