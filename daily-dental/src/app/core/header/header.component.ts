import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { PageNameService } from '../page-name.service';
import { PageWallpaperService } from '../page-wallpaper.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    title: string;
    wallpaper: string;
    pageUrl: string;

    constructor(
        private router: Router,
        private pageNameService: PageNameService,
        private pageWallpaperService: PageWallpaperService) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.pageUrl = event.url;
                this.title = this.pageNameService.getPageName(event.url);
                this.wallpaper = this.pageWallpaperService.getPageWallpaper(event.url);
            }
        });
    }

}
