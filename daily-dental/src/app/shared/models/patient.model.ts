export class Patient {
    constructor(
        public code: string,
        public firstName: string,
        public lastName: string,
        public phone: string,
        public address: string,
        public email: string,
        public doctor: string,
        public _id?: string) {}
}
