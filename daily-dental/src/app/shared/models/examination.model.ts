export class Examination {
    constructor(
        public patient: string,
        public procedures: { tooth: string, manipulations: any }[],
        public date?: Date,
        public _id?: string) {}
}
