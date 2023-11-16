import CategoryDb from '../Db/CategoryDb';
import BadRequest from '../../models/errors/BadRequest';

import { messages } from '../../constants/error';
import { errors } from '../../constants/db';
import { validateField } from '../../utils';

import { TPgError } from '../../types/db';
import {
    TCategory,
    TCategorySearchParams,
    TFilterQuery,
    TPartialCategory,
    TSortTuple,
    TAnyAsyncFunction,
} from '../../types/Complex';

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

    static async getByFilter({
        search,
        name,
        description,
        active,
        sort = '-createdDate',
        pageSize = 2,
        page = 0,
    }: TFilterQuery) {
        const [sortType, sortField]: TSortTuple = sort.startsWith('-')
            ? ['DESC', validateField(sort.slice(1))]
            : ['ASC', validateField(sort)];

        const limit = pageSize;
        const offset = ((page || 1) - 1) * limit;

        const filter = {
            ...search
                ? { search }
                : {
                    ...name && { name },
                    ...description && { description },
                },
            ...active && { active },
        };

        const { getByFilter } = CategoryDb;

        // eslint-disable-next-line max-len
        const result = await this.__errorHandler<typeof getByFilter>(getByFilter.bind(CategoryDb))({
            sortType,
            sortField,
            limit,
            filter,
            offset,
        });

        return result;
    }

    static async getBySlugOrId(searchParam: TCategorySearchParams) {
        const { getBySlugOrId } = CategoryDb;

        // eslint-disable-next-line max-len
        const result = await this.__errorHandler<typeof getBySlugOrId>(getBySlugOrId.bind(CategoryDb))(searchParam);
        return result;
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
