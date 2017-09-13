import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicDetailsService } from '../clinic-details/clinic-details.service';

@Component({
  selector: 'app-clinic-details-form',
  templateUrl: './clinic-details-form.component.html',
  styleUrls: ['./clinic-details-form.component.scss']
})
export class ClinicDetailsFormComponent implements OnInit {

  clinic: Clinic;

  constructor(
    private modalDialogRef: MdDialogRef<ClinicDetailsFormComponent>,
    private clinicDetailsService: ClinicDetailsService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.clinic = new Clinic('', '', '', '', '');
    if (this.data.clinicId) {
      this.getClinic()
    }
  }

  getClinic(): void {
    this.clinicDetailsService.getClinic(this.data.clinicId)
    .subscribe(response => {
      this.clinic = response;
    })
  }

  save(): void {
    if (this.data.clinicId) {
      this.clinicDetailsService.editClinic(this.clinic)
      .subscribe(response => {
        this.modalDialogRef.close('Edit')
      })
    } else {
      this.clinicDetailsService.createClinic(this.clinic)
      .subscribe(response => {
        this.modalDialogRef.close('Create')
      })
    }
  }

}
