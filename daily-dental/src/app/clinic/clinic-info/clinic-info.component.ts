import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Clinic } from '../../shared/models/clinic.model';
import { ClinicDetailsFormComponent } from './clinic-details-form/clinic-details-form.component';
import { ClinicDetailsService } from './clinic-details/clinic-details.service';

@Component({
  selector: 'app-clinic-info',
  templateUrl: './clinic-info.component.html',
  styleUrls: ['./clinic-info.component.scss']
})
export class ClinicInfoComponent implements OnInit {

  clinics: Clinic[];

  constructor(
    private modalDialog: MdDialog,
    private clinicDetailsService: ClinicDetailsService) { }

  ngOnInit() {
    this.getAllClinics();
  }

  getAllClinics(): void {
    this.clinicDetailsService.getAllClinics()
    .subscribe(resolve => {
      this.clinics = resolve;
    })
  }

  openModalDialog(clinicId?: string): void {
    const id = clinicId || undefined;
    const modalDialogRef = this.modalDialog.open(ClinicDetailsFormComponent, {
      data: { clinicId: id }
    })
  }

  addClinic(): void {
    this.openModalDialog();
  }

  editClinic(clinicId): void {
    this.openModalDialog(clinicId);
  }

}
