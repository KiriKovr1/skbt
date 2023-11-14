import fs from 'fs/promises';
import path from 'path';

import { ValidationError } from 'express-validator';

import { serverLogger as logger } from '../logger';

export const getSwaggerFile = async () => {
    try {
        const swagger = await fs.readFile(path.join(process.cwd(), 'api-spec.json'), { encoding: 'utf-8' });

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
