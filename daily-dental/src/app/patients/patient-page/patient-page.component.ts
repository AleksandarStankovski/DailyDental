import { 
    Component, 
    OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ModalConfig } from '../../shared/models/modal-config.model';
import { Patient } from '../../shared/models/patient.model';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { PatientService } from '../patient/patient.service';

@Component({
    selector: 'app-patient-page',
    templateUrl: './patient-page.component.html',
    styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements OnInit {

    patient: Patient;
    patientId: string;
    modalConfig: ModalConfig;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalDialog: MatDialog,
        private patientService: PatientService,) {}

    ngOnInit() {
        this.modalConfig = new ModalConfig();
        this.patient = new Patient('', '', '', '', '', { lastName: '', speciality: ''});
        this.getRouteParams();
    }

    getRouteParams(): void {
        this.activatedRoute.params.subscribe(params => {
            this.patientId = params['id'];
            this.getPatient();
        });
    }

    getPatient(): void {
        this.patientService.getPatient(this.patientId)
        .subscribe(resolve => {
            this.patient = resolve;
        });
    }

    openModalDialog(): void {
        const modalDialogRef = this.modalDialog.open(PatientFormComponent, {
            data: { patientId: this.patient._id },
            width: this.modalConfig.width,
            panelClass: 'loading-overlay-container'
        });
        modalDialogRef.afterClosed()
        .subscribe(result => {
            if (result === 'Delete') {
                this.router.navigate(['/patients']);
            } else {
                this.getPatient();  
            } 
        })
    }

    editPatient(): void {
        this.openModalDialog();
    }

}
