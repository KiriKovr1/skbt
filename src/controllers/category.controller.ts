import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import BadRequest from '../models/error/BadRequest';

import { formatBadRequestMsg } from '../utils';
import Category from '../services/Category';

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // #swagger.tags = ['Categories']
    /*
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'Модель Категории',
            required: true,
            schema: { $ref: '#/definitions/Category' }
        }
    #swagger.responses[201] = {
        description: 'Созданная Категория',
        schema: { $ref: '#/definitions/Category' }
    }
    */

    try {
        const errors = validationResult(req).array();

        if (errors.length) {
            throw new BadRequest(formatBadRequestMsg(errors));
        }

        const addedCategory = await Category.create(req.body);

        res.status(201).json(addedCategory);
    } catch (err) {
        next(err);
    }
};

export const deletCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // #swagger.tags = ['Categories']
    // #swagger.parameters['slug'] = { description: 'slug удаляемой категории' }

    try {
        const errors = validationResult(req).array();

        if (errors.length) {
            throw new BadRequest(formatBadRequestMsg(errors));
        }

        await Category.delete(req.params.slug);

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
    // #swagger.tags = ['Categories']
    // #swagger.parameters['slug'] = { description: 'slug обновляемой категории' }
    /*
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'Модель Категории с полями надлежащими изменению',
            required: true,
            schema: { $ref: '#/definitions/Category' }
        }
        #swagger.responses[201] = {
            description: 'Обновленная Категория',
            schema: { $ref: '#/definitions/Category'
        }
    }
    */

    try {
        const errors = validationResult(req).array();

        if (errors.length) {
            throw new BadRequest(formatBadRequestMsg(errors));
        }

        const updatedCategory = await Category.update(req.params.slug, req.body);

        res.status(200).json(updatedCategory);
    } catch (err) {
        next(err);
    }
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).send('ok');
    } catch (err) {
        next(err);
    }
};
