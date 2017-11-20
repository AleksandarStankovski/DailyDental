import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Nav } from '../../shared/models/nav.model';
import { NavService } from '../nav.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    isVisibleMenu: boolean;
    navList: Nav[];

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private navService: NavService) {}

    ngOnInit() {
        this.isVisibleMenu = false;
        this.getNavList();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isVisibleMenu = false;
                this.toggleClassDisabledOverflow();
            }
        });
    }

    getNavList(): void {
        this.navService.getHeaderNavList()
        .subscribe(response => {
            this.navList = response;
        });
    }

    toggleMenu(): void {
        this.isVisibleMenu = !this.isVisibleMenu;
        this.toggleClassDisabledOverflow();
    }

    toggleClassDisabledOverflow(): void {
        if (this.isVisibleMenu) {
            this.renderer.addClass(document.body, 'disabled-overflow');
        } else {
            this.renderer.removeClass(document.body, 'disabled-overflow');
        }
    }

}
