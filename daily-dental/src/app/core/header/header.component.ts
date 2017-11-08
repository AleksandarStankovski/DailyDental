import {
    Component,
    OnInit, 
    Renderer2 } from '@angular/core';
import { 
    Router, 
    NavigationEnd } from "@angular/router";
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { NavModel } from '../../shared/models/nav.model';
import { NavService } from '../nav.service';
import { PageNameService } from '../page-name.service';
import { PageImageService } from '../page-image.service';
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    title: string;
    image: string;
    isVisibleMenu: boolean;
    navList: NavModel[]
    pageName: string;
    modalConfig: ModalConfig;

    constructor(
        private router: Router,
        private renderer: Renderer2,
        private modalDialog: MatDialog,
        private pageNameService: PageNameService,
        private pageImageService: PageImageService,
        private navService: NavService) {}

    ngOnInit() {
        this.isVisibleMenu = false;
        this.modalConfig = new ModalConfig();
        this.getNavList();

        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.pageName = event.url;
                this.isVisibleMenu = false;
                this.toggleClassDisabledOverflow();
                this.title = this.pageNameService.getPageName(event.url);
                this.image = this.pageImageService.getPageImage(event.url);
            }
        }); 
    }

    getNavList(): void {
        this.navList = this.navService.getHeaderNavList();
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

    openProfile(): void {
        const modalDialogRef = this.modalDialog.open(UserFormComponent, {
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
    }

}
