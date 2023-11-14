import DB from './DB';
import HttpError from '../../models/error/HttpError';

import { CATEGORIES } from '../../constants/db';

import { TCategory, TPartialCategory } from '../../types/models';

class CategoryDb {
    private static __table = CATEGORIES;

    static async getAll() {
        try {
            const rows = await DB.skbt().select('*').from<TCategory>(this.__table);
            return rows;
        } catch (err) {
            const error = err as Error;
            throw new HttpError(500, error.message);
        }
    }

    static async create(category: TCategory, date: Date) {
        const res = await DB.skbt()
            .insert({ ...category, created_date: date })
            .into<TCategory>(this.__table)
            .returning(Object.keys(category));

        return res[0];
    }

    static async delete(slug: string) {
        await DB.skbt()
            .delete()
            .from(this.__table)
            .where({ slug });
    }

    static async update(slug: string, category: TPartialCategory) {
        const result = await DB.skbt()<TCategory>(this.__table)
            .where({ slug })
            .update(category)
            .returning([
                'active',
                'description',
                'id',
                'slug',
                'name',
            ]);

        return result[0] as TCategory;
    }
}

export default CategoryDb;
