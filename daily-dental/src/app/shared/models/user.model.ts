import { Speciality } from './speciality.model';

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public egn: string,
        public phone: string,
        public address: string,
        public email: string,
        public role: string,
        public speciality?: Speciality,
        public _id?: string) {}
}
