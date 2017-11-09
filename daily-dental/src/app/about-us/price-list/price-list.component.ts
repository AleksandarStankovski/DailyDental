import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Manipulation } from '../../shared/models/manipulation.model';
import { PaginationConfig } from '../../shared/models/pagination-config-model';
import { UserService } from '../../core/user.service';
import { ManipulationService } from './manipulation/manipulation.service';
import { ManipulationFormComponent } from './manipulation-form/manipulation-form.component';

@Component({
    selector: 'app-price-list',
    templateUrl: './price-list.component.html',
    styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

    manipulations: Manipulation[];
    modalConfig: ModalConfig;
    tutorialText: string;
    isRoleUser: boolean;
    paginationConfig: PaginationConfig;
    showPaginaion: boolean;

    constructor(
        private modalDialog: MatDialog,
        private manipulationService: ManipulationService,
        private userService: UserService) {}

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.paginationConfig = new PaginationConfig();
        this.isRoleUserCheck();
    }

    isRoleUserCheck(): void {
        this.userService.isRoleUser()
        .subscribe(response => {
            this.isRoleUser = response;
        });
        this.getManipulationsByPage();
    }

    getManipulationsByPage(newPaginationConfig?: PaginationConfig) {
        if (newPaginationConfig) {
            this.paginationConfig = newPaginationConfig;
        } 
        this.manipulationService.getManipulationsByPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage)
        .subscribe(response => {
            this.manipulations = response.manipulations;
            this.showPaginaion = response.manipulationsLength > this.paginationConfig.itemsPerPage
            this.paginationConfig.countPage = response.countPage;
            if (this.manipulations.length === 0) {
                this.tutorialText = 'Кликнете тук за да създадете манипулация';
            } else {
                this.tutorialText = undefined;
            }
        })
    }

    openModalDialog(manipulationId?: string): void {
        const id = manipulationId || undefined;
        const modalDialogRef = this.modalDialog.open(ManipulationFormComponent, {
            width: this.modalConfig.width,
            data: { manipulationId: id },
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed().subscribe(result => {
            this.getManipulationsByPage();
        })
    }

    addManipulation(): void {
        this.openModalDialog();
    }

    editManipulation(manipulationId: string): void {
        this.openModalDialog(manipulationId);
    }

    search(searchText: string) {
        if (typeof searchText !== "undefined") {
            if (searchText.length === 0) {
                this.getManipulationsByPage();
            } else {
                this.manipulationService.getFilteredManipulations(searchText)
                .subscribe(response => {
                    this.manipulations = response;
                    this.showPaginaion = false;
                }) 
            }
        }
    }

}
