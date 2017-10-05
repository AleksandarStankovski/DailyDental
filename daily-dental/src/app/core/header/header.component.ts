import {
    Component,
    OnInit } from '@angular/core';
import { 
    Router, 
    NavigationEnd } from "@angular/router";

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
            if(event instanceof NavigationEnd) {
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
                routerLink: '/reception',
                routerText: 'Рецепция',
                routerIcon: 'icon-reception-2'
            },
            {
                routerLink: '/patients',
                routerText: 'Пациенти',
                routerIcon: 'icon-family'
            },
            {
                routerLink: '/about-us/clinic-info',
                routerText: 'Клиника',
                routerIcon: 'icon-protection'
            },
            {
                routerLink: '/about-us/price-list',
                routerText: 'Ценова листа',
                routerIcon: 'icon-clipboard-2'
            }
        ]
    }

    toggleMenu(): void {
        this.isVisibleMenu = !this.isVisibleMenu;
    }

}
