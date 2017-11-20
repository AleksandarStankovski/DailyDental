import { Speciality } from './speciality.model';

export class Office {
    constructor(
        public code: string,
        public phone: string,
        public speciality: Speciality,
        public _id?: string) {}
}
