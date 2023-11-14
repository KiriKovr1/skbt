import { Router } from 'express';
import { body, param } from 'express-validator';

import { createCategory, deletCategory, updateCategory } from '../controllers/category.controller';
import { messages } from '../constants/error';

const categoryRouter = Router();

categoryRouter.post(
    '/',
    body('id').isString(),
    body('name').isString(),
    body('active').isBoolean(),
    body('slug')
        .isString()
        .matches(/^[A-Za-z]+$/)
        .withMessage(messages.NOT_LATIN),
    createCategory,
);

categoryRouter.delete(
    '/:slug',
    param('slug')
        .isString()
        .matches(/^[A-Za-z]+$/)
        .withMessage(messages.NOT_LATIN),
    deletCategory,
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
    updateCategory,
);

export default categoryRouter;
