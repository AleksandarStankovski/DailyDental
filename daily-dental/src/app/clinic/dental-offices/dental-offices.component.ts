import { Component, OnInit } from '@angular/core';

import { Office } from '../../shared/models/office.model';
import { OfficeService } from './office/office.service';

@Component({
  selector: 'app-dental-offices',
  templateUrl: './dental-offices.component.html',
  styleUrls: ['./dental-offices.component.scss']
})
export class DentalOfficesComponent implements OnInit {

  offices: Office[];

  constructor(private officeService: OfficeService) { }

  ngOnInit() {
    this.getAllOffices();
  }

  getAllOffices(): void {
    this.officeService.getAllOffices()
    .subscribe(response => {
      this.offices = response;
    })
  }

}
