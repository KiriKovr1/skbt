import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/error/HttpError';
import { serverLogger as logger } from '../logger';
import { messages } from '../constants/error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.status).send((err.message) ?? messages.BAD_REQUEST);
    } else {
        logger.error(err);
        res.status(500).send(messages.INTERNAL_SERVER_ERROR);
    }
};

export default errorMiddleware;
