import fs from 'fs/promises';
import path from 'path';

import { Request } from 'express';
import { ValidationError, validationResult } from 'express-validator';

import { serverLogger as logger } from '../logger';
import BadRequest from '../models/errors/BadRequest';
import { CATEGORY_COLUMNS } from '../constants/db';
import { TCategoryKey } from '../types/Complex';

export const getSwaggerFile = async () => {
    try {
        const swagger = await fs.readFile(path.join(process.cwd(), 'swagger.json'), { encoding: 'utf-8' });

        return JSON.parse(swagger);
    } catch (err) {
        const error = err as Error;
        logger.error(`Failed to take swagger file, reason: ${error.message}`);

        return null;
    }
};

export const formatBadRequestMsg = (errors: ValidationError[]) => errors.map((err) => {
    if ('path' in err) {
        return `Invalid ${err.location}: ${err.msg} in ${err.path}, value: ${err.value}`;
    }

    return err.msg;
}).join('\n');

export const validateRequest = (req: Request) => {
    const errors = validationResult(req).array();

    if (errors.length) {
        throw new BadRequest(formatBadRequestMsg(errors));
    }
};

export const validateField = (field: string) => {
    console.log(CATEGORY_COLUMNS, field);
    return CATEGORY_COLUMNS.includes(field)
        ? field as TCategoryKey
        : 'createdDate';
};
