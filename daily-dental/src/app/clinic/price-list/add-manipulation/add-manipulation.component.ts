import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ManipulationService } from '../manipulation/manipulation.service';
import { Manipulation } from '../../../shared/models/manipulation.model';

@Component({
  selector: 'app-add-manipulation',
  templateUrl: './add-manipulation.component.html',
  styleUrls: ['./add-manipulation.component.scss']
})
export class AddManipulationComponent implements OnInit {

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
  }

  save(): void {
    console.log(this.manipulation);
    this.manipulationService.createManioulation(this.manipulation)
    .subscribe(response => {
    })
  }

}
