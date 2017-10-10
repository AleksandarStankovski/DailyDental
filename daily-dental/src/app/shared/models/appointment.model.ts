export class Appointment {
    constructor(
        public date: Date,
        public startTime: number,
        public duration: number,
        public firstName: string,
        public lastName: string,
        public phone: string,
        public doctor: string,
        public manipulations: string[],
        public comment: string,
        public _id?: string) {}
}
