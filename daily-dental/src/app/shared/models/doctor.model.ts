export class Doctor {
    constructor(
        public code: string,
        public firstName: string,
        public lastName: string,
        public egn: string,
        public phone: string,
        public address: string,
        public email: string,
        public speciality: string,
        public active: boolean = true,
        public _id?: string) {}
}
