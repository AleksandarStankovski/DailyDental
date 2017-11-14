import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Office } from '../../shared/models/office.model';
import { OfficeService } from './office/office.service';


@Injectable()
export class DentalOfficesResolveService implements Resolve<Office[]>{

    constructor(private officeService: OfficeService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.officeService.getAllOffices();
    }
    
}
