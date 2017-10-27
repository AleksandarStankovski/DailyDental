import { 
    Component, 
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { PaginationConfig } from '../models/pagination-config-model';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() paginationConfig: PaginationConfig;
    @Output() changePageEvent: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    changePage(type: string): void {
        if (type === 'prev') {
            if (this.paginationConfig.currentPage > 1) {
                this.paginationConfig.currentPage --;
            }
        }
        if (type === 'next') {
            if (this.paginationConfig.currentPage < this.paginationConfig.countPage) {
                this.paginationConfig.currentPage ++;
            }
        }
        this.changePageEvent.emit(this.paginationConfig);
    }

}
