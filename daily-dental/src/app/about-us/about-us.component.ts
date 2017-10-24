import {
    Component,
    OnInit } from '@angular/core';

import { NavModel } from '../shared/models/nav.model';
import { NavService } from '../core/nav.service';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    navList: NavModel[]

    constructor(private navService: NavService) { }

    ngOnInit() {
        this.getNavList();
    }

    getNavList(): void {
        this.navList = this.navService.getAboutUsNavList();
    } 
}
