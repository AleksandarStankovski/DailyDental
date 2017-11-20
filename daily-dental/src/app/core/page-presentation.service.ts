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
                pageInfo = {
                    url: '',
                    title: '',
                    wallpaper: 'default.jpg'
                }
            }
            return pageInfo;
        });
    }

}
