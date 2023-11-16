import { TErrorStatus } from '../../types/Complex';

class HttpError extends Error {
    status: TErrorStatus;

    constructor(status: TErrorStatus, message?: string) {
        super(message);
        this.status = status;
    }
}

export default HttpError;
