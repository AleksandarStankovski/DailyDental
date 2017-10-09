export class Patient {
    constructor(
        public firstName: string,
        public lastName: string,
        public phone: string,
        public address: string,
        public email: string,
        public doctor: {},
        public _id?: string) {}
}
