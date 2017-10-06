export class Appointment {
    constructor(
        public date: Date,
        public startTime: number,
        public endTime: number,
        public firstName: string,
        public lastName: string,
        public phone: string,
        public doctor: string,
        public manipulations: string[],
        public _id?: string) {}
}
