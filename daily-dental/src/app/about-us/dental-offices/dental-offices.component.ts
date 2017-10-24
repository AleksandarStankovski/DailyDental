import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Office } from '../../shared/models/office.model';
import { OfficeFormComponent } from './office-form/office-form.component';
import { OfficeService } from './office/office.service';
import { UserService } from '../../core/user.service';

@Component({
    selector: 'app-dental-offices',
    templateUrl: './dental-offices.component.html',
    styleUrls: ['./dental-offices.component.scss']
})
export class DentalOfficesComponent implements OnInit {

    offices: Office[];
    modalConfig: ModalConfig;
    tutorialText: string;
    isRoleUser: boolean;

    constructor(
        private modalDialog: MdDialog,
        private officeService: OfficeService,
        private userService: UserService) { }

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.isisRoleUserCheck();
    }

    isisRoleUserCheck(): void {
        this.userService.isRoleUser()
        .subscribe(response => {
            this.isRoleUser = response;
        });
        this.getAllOffices();
    }

    getAllOffices(): void {
        this.officeService.getAllOffices()
        .subscribe(response => {
            this.offices = response;
            if (this.offices.length === 0) {
                this.tutorialText = 'Кликнете тук за да създадете кабинет';
            } else {
                this.tutorialText = undefined;
            }
        });
    }

    openModalDialog(officeId?: string): void {
        const id = officeId || undefined;
        const modalDialogRef = this.modalDialog.open(OfficeFormComponent, {
            width: this.modalConfig.width,
            data: { officeId: id },
            panelClass: 'loading-overlay-container'
        })
        modalDialogRef.afterClosed()
        .subscribe(result => {
            this.getAllOffices();
        })
    }

    addOffice(): void {
        this.openModalDialog();
    }

    editOffice(officeId: string): void {
        this.openModalDialog(officeId);
    }
}
