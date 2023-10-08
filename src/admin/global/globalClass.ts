export class ResponseData<D> {
    data: D | D[]
    statusCode: number
    message: string

    constructor(data: D | D[], statusCode: number, messgae: string) {
        this.data = data
        this.statusCode = statusCode
        this.message = messgae

        return this
    }
}