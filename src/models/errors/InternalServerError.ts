import { messages } from '../../constants/error';
import HttpError from './HttpError';

class InternalServerError extends HttpError {
    constructor(message: string = messages.INTERNAL_SERVER_ERROR) {
        super(500, message);
    }
}

export default InternalServerError;
