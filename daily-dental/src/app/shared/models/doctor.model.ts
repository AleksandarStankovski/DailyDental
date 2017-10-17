import { Appointment } from './appointment.model';

export class Doctor {
    constructor(
        public firstName: string,
        public lastName: string,
        public egn: string,
        public phone: string,
        public address: string,
        public speciality: string,
        public email: string,
        public password: string,
        public role: string,
        public active: boolean = true,
        public appointments?: Appointment[],
        public _id?: string) {}
}
