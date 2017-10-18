export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public egn: string,
        public phone: string,
        public address: string,
        public speciality: string,
        public email: string,
        public role: string,
        public _id?: string) {}
}
