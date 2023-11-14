import CategoryDb from '../Db/CategoryDb';
import BadRequest from '../../models/error/BadRequest';

import { messages } from '../../constants/error';
import { errors } from '../../constants/db';

import { TPgError } from '../../types/db';
import { TCategory, TPartialCategory } from '../../types/models';

type TAnyAsyncFunction = (...args: any[]) => Promise<any>

class Category {
    private static __errorHandler<F extends TAnyAsyncFunction>(f: F) {
        return async (...args: Parameters<F>): Promise<ReturnType<F>> => {
            try {
                const result = await f(...args);

                return result;
            } catch (err) {
                const error = err as TPgError;

                switch (error.code) {
                    case errors.DUPLICATE_KEY_VALUE_UNIQUE_CONSTRAINT: {
                        throw new BadRequest(messages.ID_OR_SLUG_NOT_UNIQUE);
                    }
                    case errors.COLUMN_NOT_EXIST: {
                        throw new BadRequest(messages.COLUMN_NOT_EXIST);
                    }
                    default:
                        throw err;
                }
            }
        };
    }

    static async create(category: TCategory) {
        const { create } = CategoryDb;

        // eslint-disable-next-line max-len
        const result = await this.__errorHandler<typeof create>(create.bind(CategoryDb))(category, new Date());
        return result;
    }

    static async update(slug: string, category: TPartialCategory) {
        const { update } = CategoryDb;

        // eslint-disable-next-line max-len
        const result = await this.__errorHandler<typeof update>(update.bind(CategoryDb))(slug, category);
        return result;
    }

    static async delete(slug: string) {
        await CategoryDb.delete(slug);
    }
}

export default Category;
