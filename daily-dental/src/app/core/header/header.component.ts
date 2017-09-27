import {
    Component,
    OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { PageNameService } from '../page-name.service';
import { PageImageService } from '../page-image.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    title: string;
    image: string;
    isVisibleMenu: boolean;
    navList: [{}];
    pageName: string;

    constructor(
        private router: Router,
        private pageNameService: PageNameService,
        private pageImageService: PageImageService) {}

    ngOnInit() {
        this.isVisibleMenu = false;

        this.router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                this.pageName = event.url;
                this.isVisibleMenu = false;
                this.title = this.pageNameService.getPageName(event.url);
                this.image = this.pageImageService.getPageImage(event.url);
            }
        }); 

        this.navList = [
            {
                routerLink: '/home',
                routerText: 'Начало',
                routerIcon: 'icon-home'
            },
            {
                routerLink: '/about-us/clinic',
                routerText: 'Клиника',
                routerIcon: 'icon-protection'
            },
            {
                routerLink: '/patients',
                routerText: 'Пациенти',
                routerIcon: 'icon-family'
            },
            {
                routerLink: '/reception',
                routerText: 'Рецепция',
                routerIcon: 'icon-reception-2'
            }
        ]
    }

    toggleMenu(): void {
        this.isVisibleMenu = !this.isVisibleMenu;
    }

}
