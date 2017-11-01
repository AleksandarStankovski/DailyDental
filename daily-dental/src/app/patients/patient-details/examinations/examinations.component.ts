import { 
    Component,
    OnInit,
    Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../../shared/models/modal-config.model';
import { Examination } from '../../../shared/models/examination.model';
import { ExaminationService } from './examination.service';
import { ExaminationFormComponent } from '../examination-form/examination-form.component';

@Component({
    selector: 'app-examinations',
    templateUrl: './examinations.component.html',
    styleUrls: ['./examinations.component.scss']
})
export class ExaminationsComponent implements OnInit {

    examinations: Examination[];
    modalConfig: ModalConfig;
    @Input() patientId: string;

    constructor(
        private modalDialog: MatDialog,
        private examinationService: ExaminationService) {}

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.getExaminationsByPatient()
    }

    getExaminationsByPatient(): void {
        this.examinationService.getExaminationsByPatient(this.patientId)
        .subscribe(resolve => {
            this.examinations = resolve;
        })
    }

    openModalDialog(examinationId?: string): void {
        const id = examinationId;
        const modalDialogRef = this.modalDialog.open(ExaminationFormComponent, {
            width: this.modalConfig.width,
            data: { patientId: this.patientId, examinationId: id },
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed().subscribe(result => {
            this.getExaminationsByPatient();
        })
    }

    addExamination(): void {
        this.openModalDialog();
    }

    editExaminationn(examinationId: string): void {
        this.openModalDialog(examinationId);
    }

}