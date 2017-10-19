export class Clinic {
    constructor(
        public name: string,
        public phone?: string,
        public city?: string,
        public address?: string,
        public email?: string,
        public offices?: string[],
        public manipulations?: string[],
        public doctors?: string[],
        public patients?: string[],
        public _id?: string) {}
}
