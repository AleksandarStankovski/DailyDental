import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';

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
    pageName: string;
    modalConfig: ModalConfig;

    constructor(
        private router: Router,
        private renderer: Renderer2,
        private modalDialog: MatDialog,
        private pageNameService: PageNameService,
        private pageImageService: PageImageService) {}

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.pageName = event.url;
                this.title = this.pageNameService.getPageName(event.url);
                this.image = this.pageImageService.getPageImage(event.url);
            }
        }); 
    }

    openProfile(): void {
        const modalDialogRef = this.modalDialog.open(UserFormComponent, {
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
    }

}
