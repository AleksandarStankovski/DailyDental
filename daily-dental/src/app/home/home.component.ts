import {
    Component,
    OnInit } from '@angular/core';

import { Nav } from '../shared/models/nav.model';
import { NavService } from '../core/nav.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    navList: Nav[]

    constructor(private navService: NavService) { }

    ngOnInit() {
        this.getNavList();
    }

    getNavList(): void {
        this.navList = this.navService.getHomeNavList();
    }

}
