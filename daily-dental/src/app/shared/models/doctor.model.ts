import { Appointment } from './appointment.model';
import { Speciality } from './speciality.model';

export class Doctor {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string,
        public active: boolean,
        public password?: string,
        public egn?: string,
        public phone?: string,
        public address?: string,
        public speciality?: Speciality,
        public appointments?: Appointment[],
        public _id?: string) {}
}
