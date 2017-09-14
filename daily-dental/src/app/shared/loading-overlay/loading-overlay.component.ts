import { Component, OnInit, Input } from '@angular/core';

import { LoadingOverlayConfig } from '../models/loading-overlay-config.model';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {

  @Input() config: LoadingOverlayConfig;

  constructor() { }

  ngOnInit() {
    console.log(this.config);
  }

}
