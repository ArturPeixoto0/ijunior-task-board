export class AppError extends Error {
    number: number;

    constructor(message: string, number: number) {
        super(message); 
        this.number = number;
        this.name = 'AppError'
        Object.setPrototypeOf(this, AppError.prototype);
    }
}