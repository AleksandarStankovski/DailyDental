import { Injectable } from '@angular/core';

@Injectable()
export class PageNameService {

  title: string;

  constructor() { }

  getPageName(pageUrl): string {
    switch(pageUrl) {
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
    return this.title;
  }

}
