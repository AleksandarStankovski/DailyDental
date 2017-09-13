import { Component, OnInit, Input } from '@angular/core';

import { Office } from '../../../shared/models/office.model';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  @Input() office: Office;

  constructor() { }

  ngOnInit() {
  }

}
