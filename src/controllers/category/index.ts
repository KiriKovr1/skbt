import { Request, Response, NextFunction } from 'express';

import Category from '../../services/Category';

import { validateRequest } from '../../utils';
import { messages } from '../../constants/error';

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        validateRequest(req);

        const addedCategory = await Category.create(req.body);

        res
            .status(201)
            .json(addedCategory);
    } catch (err) {
        next(err);
    }
};

export const deletCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        validateRequest(req);
        const { slug } = req.params;

        await Category.delete(slug);

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        validateRequest(req);
        const category = req.body;
        const { slug } = req.params;

        const updatedCategory = await Category.update(slug, category);

        res
            .status(200)
            .json(updatedCategory);
    } catch (err) {
        next(err);
    }
};

export const getBySlugOrId = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        validateRequest(req);

        const category = await Category.getBySlugOrId(req.query);

        res
            .status(200)
            .json(category ?? messages.CATEGORY_NOT_FOUND);
    } catch (err) {
        next(err);
    }
};

export const getByFilter = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        validateRequest(req);

        const categories = await Category.getByFilter(req.query);

        res
            .status(200)
            .json(categories);
    } catch (err) {
        next(err);
    }
};
