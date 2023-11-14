import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line
export const test = (req: Request, res: Response, next: NextFunction) => {

    try {
        res.status(200).send('test');
    } catch (err) {
        next(err);
    }
};
