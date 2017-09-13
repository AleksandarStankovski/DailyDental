import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { Doctor } from '../../shared/models/doctor.model';
import { DoctorService } from './doctor/doctor.service';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  doctors: Doctor[];

  constructor(
    private doctorService: DoctorService,
    private modalDialog: MdDialog) {}

  ngOnInit() {
    this.getAllDoctors();
  }

  getAllDoctors(): void {
    this.doctorService.getAllDoctors()
    .subscribe(response => {
      this.doctors = response
    });
  }

  openModalDialog(doctorId?: string): void {
    const id = doctorId || undefined;
    const modalDialogRef = this.modalDialog.open(DoctorFormComponent, {
      data: { doctorId: id }
    })
    modalDialogRef.afterClosed().subscribe(result => {
      this.getAllDoctors();
    })
  }

  addDoctor(): void {
    this.openModalDialog();
  }

  editDoctor(doctorId: string): void {
    this.openModalDialog(doctorId);
  }
}
