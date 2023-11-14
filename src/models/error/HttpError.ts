type TResponseStatus = 500 | 400;

class HttpError extends Error {
    status: TResponseStatus;

    constructor(status: TResponseStatus, message?: string) {
        super(message);
        this.status = status;
    }
}

export default HttpError;
