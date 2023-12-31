export class ResponseModel {
    public success: boolean;
    public data: any;
    public errors: any;

    constructor(success: boolean, data: any, errors: any){
        this.success = success;
        this.data = data;
        this.errors = errors;
    }
}