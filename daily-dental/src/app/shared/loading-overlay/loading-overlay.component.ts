import {
    Component,
    OnInit,
    Input } from '@angular/core';

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
        this.config = new LoadingOverlayConfig();
    }

    setClass() {
        const classes = {
            'loading-overlay-fixed': this.config.position === 'fixed',
            'loading-overlay-absolute': this.config.position === 'absolute',
            'loading-overlay-white': this.config.backgroundColor === 'white',
            'loading-overlayr-black': this.config.backgroundColor === 'black'
        }
        return classes;
    }

}
