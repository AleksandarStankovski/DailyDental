import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ModalConfig } from '../shared/models/modal-config.model';
import { Patient } from '../shared/models/patient.model';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientService } from './patient/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients: Patient[];
  modalConfig: ModalConfig;

  constructor(
    private modalDialog: MdDialog,
    private patientService: PatientService) { }

  ngOnInit() {
    this.getAllPatients();
    this.modalConfig = new ModalConfig();
  }

  getAllPatients(): void {
    this.patientService.getAllPatients()
    .subscribe(response => {
      this.patients = response;
    })
  }

  openModalDialog(patientId?: string): void {
    const id = patientId || undefined;
    const modalDialogRef = this.modalDialog.open(PatientFormComponent, {
      data: { patientId: id },
      width: this.modalConfig.width,
      panelClass: 'loading-overlay-container'
    });
    modalDialogRef.afterClosed()
    .subscribe(result => {
      this.getAllPatients();
    })
  }

  addPatient(): void {
    this.openModalDialog();
  }

  editPatient(patientId): void {
    this.openModalDialog(patientId);
  }

}
