import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Doctor } from '../../../shared/models/doctor.model';
import { DoctorService } from '../doctor/doctor.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

  doctor: Doctor;

  constructor(
    private modalDialogRef: MdDialogRef<DoctorFormComponent>,
    private doctorService: DoctorService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.doctor = new Doctor('', '', '', '', '', '', '');
    if (this.data.doctorId) {
      this.getDoctor();
    }
  }

  getDoctor(): void {
    this.doctorService.getDoctor(this.data.doctorId)
    .subscribe(response => {
      this.doctor = response;
    })
  }

  save(): void {
    if (this.data.doctorId) {
      this.doctorService.editDoctor(this.doctor)
      .subscribe(response => {
        this.modalDialogRef.close('Edit');
      })
    } else {
      this.doctorService.createDoctor(this.doctor)
      .subscribe(response => {
        this.modalDialogRef.close('Create');
      })
    }
  }

  delete(): void {
    this.doctorService.deleteDoctor(this.doctor._id)
    .subscribe(response => {
      this.modalDialogRef.close('Delete');
    })
  }
}
