import { Request, Response, NextFunction } from 'express';

import Category from '../../services/Category';

import { validateRequest } from '../../utils';

import { messages } from '../../constants/error';

import { TCategorySearchParams } from '../../types/Complex';

class CategoryController {
    static async createCategory(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            validateRequest(req);

            const addedCategory = await Category.create(req.body);

            res
                .status(201)
                .json(addedCategory);
        } catch (err) {
            next(err);
        }
    }

    static async deletCategory(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            validateRequest(req);
            const { slug } = req.params;

            await Category.delete(slug);

            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    static async updateCategory(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
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
    }

    static async getBySlugOrId(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            validateRequest(req);
            const { id, slug } = req.query;
            const searchParams = {
                ...id && { id },
                ...slug && { slug },
            } as TCategorySearchParams;

            const category = await Category.getBySlugOrId(searchParams);

            if (category) {
                res.status(200).json(category);
            } else {
                res.status(200).send(messages.CATEGORY_NOT_FOUND);
            }
        } catch (err) {
            next(err);
        }
    }

    static async getByFilter(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            validateRequest(req);

            const categories = await Category.getByFilter(req.query);

            res
                .status(200)
                .json(categories);
        } catch (err) {
            next(err);
        }
    }
}

export default CategoryController;
