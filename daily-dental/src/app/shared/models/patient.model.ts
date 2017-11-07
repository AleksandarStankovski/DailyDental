export class Patient {
    constructor(
        public firstName: string,
        public lastName: string,
        public phone: string,
        public address: string,
        public email: string,
        public middleName?: string,
        public doctor?: { lastName?: string, speciality?: string, _id?: string },
        public _id?: string) {}
}
