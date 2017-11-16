import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    searchText: string;
    isVisibleSearch: boolean;
    placeholder: string;
    @Input() placeholderText: string;
    @Output() searchEvent: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.isVisibleSearch = false;
        this.placeholder = this.placeholderText || 'Търси';
    }

    toggleSearch(): void {
        this.isVisibleSearch = !this.isVisibleSearch;
    }

    search(): void {
        this.isVisibleSearch = false;
        if (typeof this.searchText !== 'undefined') {
            this.searchEvent.emit(this.searchText)
        }
    }

}
