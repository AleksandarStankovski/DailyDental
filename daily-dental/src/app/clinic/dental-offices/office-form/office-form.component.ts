import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Office } from '../../../shared/models/office.model';
import { OfficeService } from '../office/office.service';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {

  office: Office;

  constructor(
    private modalDialogRef: MdDialogRef<OfficeFormComponent>,
    private officeService: OfficeService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.office = new Office('', '', '');
    if (this.data.officeId) {
      this.getOffice();
    }
  }

  getOffice(): void {
    this.officeService.getOffice(this.data.officeId)
    .subscribe(response => {
      this.office = response;
    })
  }

  save(): void {
    if (this.data.officeId) {
      this.officeService.editOffice(this.office)
      .subscribe(response => {
        this.modalDialogRef.close('Edit');
      })
    } else {
      this.officeService.createOffice(this.office)
      .subscribe(response => {
        this.modalDialogRef.close('Create');
      })
    }
  }

  delete(): void {
    this.officeService.deleteOffice(this.office._id)
    .subscribe(response => {
      this.modalDialogRef.close('Delete');
    })
  }

}
