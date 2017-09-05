import { Component, OnInit } from '@angular/core';

import { DoctorService } from './doctor/doctor.service';
import { Doctor } from '../../shared/models/doctor.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  doctors: Doctor[];
  private doctorService: DoctorService;

  constructor(doctorService: DoctorService) {
    this.doctorService = doctorService;
  }

  ngOnInit() {
    this.getAllDoctors();
  }

  getAllDoctors(): void {
    this.doctorService.getAllDoctors()
    .subscribe(response => this.doctors = response);
  }

}
