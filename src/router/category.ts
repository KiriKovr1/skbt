import { Router } from 'express';
import {
    body,
    oneOf,
    param,
    query,
} from 'express-validator';

import CategoryController from '../controllers/category';

import { messages } from '../constants/error';

const categoryRouter = Router();

categoryRouter.get(
    '/byFilter',
    query('name')
        .optional()
        .isString()
        .trim(),
    query('description')
        .optional()
        .isString()
        .trim(),
    query('search')
        .optional()
        .isString()
        .trim(),
    query('pageSize')
        .optional()
        .isInt()
        .toInt()
        .matches(/^[1-9]+$/)
        .withMessage(messages.INVALID_PAGE_SIZE),
    query('page')
        .optional()
        .isInt()
        .toInt(),
    CategoryController.getByFilter,
);

categoryRouter.get(
    '/',
    oneOf([
        query('slug')
            .notEmpty()
            .matches(/^[A-Za-z]+$/)
            .withMessage(messages.NOT_LATIN),
        query('id')
            .notEmpty(),
    ], {
        message: messages.ID_OR_SLUG_IS_REQUIRED,
    }),
    CategoryController.getBySlugOrId,
);

categoryRouter.post(
    '/',
    body('id').isString(),
    body('name').isString(),
    body('active').isBoolean(),
    body('slug')
        .isString()
        .matches(/^[A-Za-z]+$/)
        .withMessage(messages.NOT_LATIN),
    CategoryController.createCategory,
);

categoryRouter.delete(
    '/:slug',
    param('slug')
        .isString()
        .matches(/^[A-Za-z]+$/)
        .withMessage(messages.NOT_LATIN),
    CategoryController.deletCategory,
);

categoryRouter.patch(
    '/:slug',
    param('slug')
        .isString()
        .matches(/^[A-Za-z]+$/)
        .withMessage(messages.NOT_LATIN),
    body('slug')
        .optional()
        .isString()
        .matches(/^[A-Za-z]+$/)
        .withMessage(messages.NOT_LATIN),
    CategoryController.updateCategory,
);

export default categoryRouter;
