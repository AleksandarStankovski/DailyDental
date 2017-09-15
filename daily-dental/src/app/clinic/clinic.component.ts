import {
    Component,
    OnInit } from '@angular/core';

@Component({
    selector: 'app-clinic',
    templateUrl: './clinic.component.html',
    styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

    navList;

    constructor() { }

    ngOnInit() {
        this.navList = [
        {
            routerLink: '/clinic/clinic-info',
            routerText: 'Клиника'
        },
        {
            routerLink: '/clinic/dental-offices',
            routerText: 'Кабинети'
        },
        {
            routerLink: '/clinic/staff',
            routerText: 'Персонал'
        },
        {
            routerLink: '/clinic/price-list',
            routerText: 'Ценова листа'
        }
        ]
    }
}
