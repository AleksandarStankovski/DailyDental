import {
    Component,
    OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Manipulation } from '../../shared/models/manipulation.model';
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
    page: number;
    countPage: number;

    constructor(
        private modalDialog: MdDialog,
        private manipulationService: ManipulationService,
        private userService: UserService) {}

    ngOnInit() {
        this.page = 1;
        this.manipulations = [];
        this.modalConfig = new ModalConfig();
        this.isRoleUserCheck();
    }

    isRoleUserCheck(): void {
        this.userService.isRoleUser()
        .subscribe(response => {
            this.isRoleUser = response;
        });
        this.getManipulationsByPage();
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

    getManipulationsByPage() {
        this.manipulationService.getAllManipulationsByPage(this.page)
        .subscribe(response => {
            this.manipulations = response.manipulations;
            this.countPage = response.countPage;
        })
    }

    changePage(type: string): void {
        if (type === 'prev') {
            if (this.page > 1) {
                this.page --;
            }
        }
        if (type === 'next') {
            if (this.page < this.countPage) {
                this.page ++;
            }
        }
        this.getManipulationsByPage();
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

}
