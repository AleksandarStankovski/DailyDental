import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { PageInfo } from '../../shared/models/page-info.model';
import { PagePresentationService } from '../page-presentation.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    title: string;
    wallpaper: string;
    pageUrl: string;
    pageInfo: PageInfo;

    constructor(
        private router: Router,
        private pagePresentationService: PagePresentationService) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.pageUrl = event.url;
                this.pagePresentationService.getPageInfo(event.url)
                .subscribe(response => {
                    this.pageInfo = response;
                });
            }
        });
    }

}
