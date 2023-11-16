import HttpError from './HttpError';
import { messages } from '../../constants/error';

class BadRequest extends HttpError {
    constructor(message: string = messages.BAD_REQUEST) {
        super(400, message);
    }
}

export default BadRequest;
