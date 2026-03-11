class ApplicationError extends Error {
    // Properties
    name: string;
    code: number|string;
    statusCode: number;
    message: string;
    stack: string;

    // Constructor
    constructor(error: any) {
        super(error);

        this.name = error?.name || error || 'Unknown Error';
        this.code = error?.code || -1;
        this.statusCode = error?.statusCode || error?.code || -1;
        this.message = error?.message || error || 'Unknown Error';
        this.stack =
            error?.stack ||
            (function () {
                let err = {} as any;

                if (typeof Error.captureStackTrace === 'function') Error.captureStackTrace(err);
                else err = new Error(error?.message || 'Unknown Error');

                return err.stack;
            })();
    }

    // Method
    /*introduce(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }*/
}

export { ApplicationError };