import { Speciality } from './speciality.model';

export class Patient {
    constructor(
        public firstName: string,
        public lastName: string,
        public phone: string,
        public address: string,
        public email: string,
        public middleName?: string,
        public doctor?: { lastName?: string, speciality?: Speciality, _id?: string },
        public _id?: string) {}
}
