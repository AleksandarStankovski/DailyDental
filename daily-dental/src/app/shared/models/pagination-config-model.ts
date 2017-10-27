export class PaginationConfig {
    constructor(
        public itemsPerPage: number = 6,
        public currentPage: number = 1,
        public countPage: number = 1) {}
}
