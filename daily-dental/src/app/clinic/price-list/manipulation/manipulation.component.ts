import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Manipulation } from '../../../shared/models/manipulation.model';

@Component({
  selector: 'app-manipulation',
  templateUrl: './manipulation.component.html',
  styleUrls: ['./manipulation.component.scss']
})
export class ManipulationComponent implements OnInit {

  @Input() manipulation: Manipulation;
  @Output() editManipulation: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  edit(): void {
    this.editManipulation.emit(this.manipulation._id);
  }

}
