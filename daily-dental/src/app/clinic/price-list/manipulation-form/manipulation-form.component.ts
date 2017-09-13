import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Manipulation } from '../../../shared/models/manipulation.model';
import { ManipulationService } from '../manipulation/manipulation.service';

@Component({
  selector: 'app-manipulation-form',
  templateUrl: './manipulation-form.component.html',
  styleUrls: ['./manipulation-form.component.css']
})
export class ManipulationFormComponent implements OnInit {

  manipulation: Manipulation;

  constructor(
    private modalDialogRef: MdDialogRef<ManipulationFormComponent>,
    private manipulationService: ManipulationService,
    @Inject(MD_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.manipulation = new Manipulation('', '', undefined, '');
    if (this.data.manipulationId) {
      this.getManipulation();
    }
  }

  getManipulation(): void {
    this.manipulationService.getManipultion(this.data.manipulationId)
    .subscribe(response => {
      this.manipulation = response;
    })
  }

  save(): void {
    if (this.data.manipulationId) {
      this.manipulationService.editManipulation(this.manipulation)
      .subscribe(response => {
        this.modalDialogRef.close('Edit');
      })
    } else {
      this.manipulationService.createManipulation(this.manipulation)
      .subscribe(response => {
        this.modalDialogRef.close('Create')
      })
    }
  }

  delete(): void {
    this.manipulationService.deleteManipulation(this.manipulation._id)
    .subscribe(response => {
      this.modalDialogRef.close('Delete');
    })
  }

}
