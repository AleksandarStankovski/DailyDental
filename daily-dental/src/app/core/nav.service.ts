import { Injectable } from '@angular/core';

import { NavModel } from '../shared/models/nav.model';

@Injectable()
export class NavService {

    getHeaderNavList(): NavModel[]{
        let navList = [
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
        return navList;
    }

    getHomeNavList(): NavModel[]{
        let navList = [
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
        return navList;
    }

    getAboutUsNavList(): NavModel[]{
        let navList = [
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
        return navList;
    }
}