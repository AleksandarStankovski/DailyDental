import {
    Component,
    OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Manipulation } from '../../shared/models/manipulation.model';
import { PaginationConfig } from '../../shared/models/pagination-config-model';
import { ManipulationFormComponent } from './manipulation-form/manipulation-form.component';
import { ManipulationService } from './manipulation/manipulation.service';
import { UserService } from '../../core/user.service';

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
    manipulationsLength: number;
    searchText: string;

    constructor(
        private modalDialog: MdDialog,
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
            this.manipulationsLength = response.manipulationsLength;
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

    search() {
        this.manipulationService.getFilteredManipulations(this.searchText)
        .subscribe(response => {
            console.log(response)
        })
    }

    test(event) {
        console.log(event);
    }

}

// getAllManipulations(): void {
//     this.manipulationService.getAllManipulations()
//     .subscribe(response => {
//         this.manipulations = response;
//         if (this.manipulations.length === 0) {
//             this.tutorialText = 'Кликнете тук за да създадете манипулация';
//         } else {
//             this.tutorialText = undefined;
//         }
//     });
// }
