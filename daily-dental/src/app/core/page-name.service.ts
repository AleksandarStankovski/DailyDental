import { Injectable } from '@angular/core';

@Injectable()
export class PageNameService {

    getPageName(pageUrl): string {
        let title: string;
        switch(pageUrl) {
            case '/home': {
                title = 'Material design'
                break;
            }
            case '/about-us/clinic-info': {
                title = 'Клиника'
                break;
            }
            case '/about-us/dental-offices': {
                title = 'Кабинети'
                break;
            }
            case '/about-us/staff': {
                title = 'Персонал'
                break;
            }
            case '/about-us/price-list': {
                title = 'Ценова листа'
                break;
            }
            case '/about-us/staff': {
                title = 'Персонал'
                break;
            }
            case '/patients': {
                title = 'Пациенти'
                break;
            }
            case '/reception': {
                title = 'Рецепция'
                break;
            }
            default: {
                title = ''
            }
        }
        return title;
    }

}
