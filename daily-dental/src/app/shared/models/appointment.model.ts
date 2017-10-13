export class Appointment {
    constructor(
        public date: Date,
        public startTime: number,
        public duration: number,
        public patient: { firstName: string, lastName: string, phone: string },
        public doctor: string,
        public manipulations: any[],
        public comment: string,
        public _id?: string) {}
}
