import { Component, OnInit } from '@angular/core';

import { MdDialog } from '@angular/material';

import { Manipulation } from '../../shared/models/manipulation.model';
import { ManipulationService } from './manipulation/manipulation.service';
import { ManipulationFormComponent } from './manipulation-form/manipulation-form.component';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  manipulations: Manipulation[];

  constructor(
    private manipulationService: ManipulationService,
    private modalDialog: MdDialog) {}

  ngOnInit() {
    this.getAllManipulations();
  }

  getAllManipulations(): void {
    this.manipulationService.getAllManipulations()
    .subscribe(response => this.manipulations = response);
  }

  openModalDialog(manipulationId?: string): void {
    const id = manipulationId || undefined;
    const modalDialogRef = this.modalDialog.open(ManipulationFormComponent, {
      data: { manipulationId: id}
    })
    modalDialogRef.afterClosed().subscribe(result => {
      this.getAllManipulations();
    })
  }

  addManipulation(): void {
    this.openModalDialog();
  }

  editManipulation(manipulationId: string): void {
    this.openModalDialog(manipulationId);
  }

}
