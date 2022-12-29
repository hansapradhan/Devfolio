export class ContactFormModel {
    /**
     * CConstructor for the ContactFormModel
     */
    constructor(
        public name:string,
        public email:string,
        public subject:string,
        public message:string
    ) { }
}
