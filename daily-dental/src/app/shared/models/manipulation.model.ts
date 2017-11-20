import { Speciality } from './speciality.model';

export class Manipulation {
    constructor(
        public name: string,
        public price: number,
        public speciality: Speciality,
        public _id?: string) {}
}
