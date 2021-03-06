import { Component, OnInit } from '@angular/core';

import { Nav } from '../shared/models/nav.model';
import { NavService } from '../core/nav.service';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    navList: Nav[]

    constructor(private navService: NavService) { }

    ngOnInit() {
        this.getNavList();
    }

    getNavList(): void {
        this.navService.getAboutUsNavList()
        .subscribe(response => {
            this.navList = response;
        });
    }

}
