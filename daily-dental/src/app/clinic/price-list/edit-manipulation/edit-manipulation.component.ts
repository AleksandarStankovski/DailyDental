import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ManipulationService } from '../manipulation/manipulation.service';
import { Manipulation } from '../../../shared/models/manipulation.model';

@Component({
  selector: 'app-edit-manipulation',
  templateUrl: './edit-manipulation.component.html',
  styleUrls: ['./edit-manipulation.component.scss']
})
export class EditManipulationComponent implements OnInit {

  @Input() manipulationId: string;
  manipulation: Manipulation;
  private manipulationService: ManipulationService;

  constructor(manipulationService: ManipulationService) {
    this.manipulationService = manipulationService;
    this.manipulation = {
      _id: '',
      code: '',
      name: '',
      price: undefined,
      currency: ''
    }
  }

  ngOnInit() {
    this.getManipulation();
  }

  getManipulation(): void {
    this.manipulationService.getManipultion(this.manipulationId)
    .subscribe(response => this.manipulation = response);
  }

  save(): void {
    this.manipulationService.editManipulation(this.manipulation)
    .subscribe(response => {

    })
  }

  delete(): void {
    this.manipulationService.deleteManipulation(this.manipulation._id)
    .subscribe(response => {
    })
  }

}
