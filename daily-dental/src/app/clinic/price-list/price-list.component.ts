import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { Manipulation } from '../../shared/models/manipulation.model';
import { ManipulationService } from './manipulation/manipulation.service';
import { AddManipulationComponent } from './add-manipulation/add-manipulation.component';
import { EditManipulationComponent } from './edit-manipulation/edit-manipulation.component';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  manipulations: Manipulation[];
  private manipulationService: ManipulationService;
  private modalDialog: MdDialog;

  constructor(manipulationService: ManipulationService, modalDialog: MdDialog) {
    this.manipulationService = manipulationService;
    this.modalDialog = modalDialog;
  }

  ngOnInit() {
    this.getAllManiulations();
  }

  getAllManiulations(): void {
    this.manipulationService.getAllManipulations()
    .subscribe(response => this.manipulations = response);
  }

  addManipulation(): void {
    const modalDialogRef = this.modalDialog.open(AddManipulationComponent, {})
    modalDialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  editManipulation(manipulationId: string): void {

  }

}
