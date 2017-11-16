import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { PageInfo } from '../shared/models/page-info.model';

@Injectable()
export class PagePresentationService {

    constructor(private http: Http) { }

    getPageInfo(pageUrl: string): Observable<PageInfo> {
        return this.http.get(`/assets/json/page-presentation.json`)
        .map(response => {
            const result = response.json();
            let pageInfo: PageInfo;
            result.forEach(element => {
                if (element.url === pageUrl) {
                    pageInfo = element;
                }
            });
            if (!pageInfo) {
                pageInfo = result[0];
            }
            return pageInfo;
        });
    }

    // getPageName(pageUrl): string {
    //     let title: string;
    //     console.log('test');
    //     switch (pageUrl) {
    //         case '/home': {
    //             title = 'Material design'
    //             break;
    //         }
    //         case '/about-us/clinic-info': {
    //             title = 'Клиника'
    //             break;
    //         }
    //         case '/about-us/dental-offices': {
    //             title = 'Кабинети'
    //             break;
    //         }
    //         case '/about-us/staff': {
    //             title = 'Персонал'
    //             break;
    //         }
    //         case '/about-us/price-list': {
    //             title = 'Ценова листа'
    //             break;
    //         }
    //         case '/patients': {
    //             title = 'Пациенти'
    //             break;
    //         }
    //         case '/reception': {
    //             title = 'Рецепция'
    //             break;
    //         }
    //         default: {
    //             title = ''
    //         }
    //     }
    //     return title;
    // }

}
