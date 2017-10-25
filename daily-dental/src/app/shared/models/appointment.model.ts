export class Appointment {
    constructor(
        public date: Date,
        public startTime: number,
        public duration: number,
        public patient: { firstName: string, lastName: string, phone: string, _id?: string },
        public doctor: string,
        public manipulations: { name: string, price: number, _id?: string }[],
        public status: string,
        public comment: string,
        public _id?: string) {}
}
