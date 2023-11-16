import DB from './DB';

import { CATEGORIES, VISIBLE_CATEGORY_COLUMNS } from '../../constants/db';

import {
    TCategory,
    TCategorySearchParams,
    TFilter,
    TPartialCategory,
} from '../../types/Complex';

class CategoryDb {
    private static __table = CATEGORIES;

    private static __columns = VISIBLE_CATEGORY_COLUMNS;

    private static __getSearchRegexp(value: string) {
        return DB.skbt().raw("regexp_replace(:value, '(Е|е|Ё|ё)', '(е|ё)', 'g')", { value });
    }

    private static __getSearchCondition(key: string, value: string) {
        switch (key) {
            case 'search': {
                return DB.skbt()
                    .raw(
                        '(name ~* :value OR description ~* :value)',
                        { value: this.__getSearchRegexp(value) },
                    );
            }
            case 'name':
            case 'description': {
                return DB.skbt()
                    .raw(
                        ':key: ~* :value',
                        { key, value: this.__getSearchRegexp(value) },
                    );
            }
            case 'active': {
                return DB.skbt().raw('active = :value', { value });
            }
            default:
                throw new Error(`Unexpected key, key#${key}`);
        }
    }

    static async getByFilter({
        sortType,
        sortField,
        filter,
        limit,
        offset,
    }: TFilter) {
        const query = DB.skbt()<TCategory>(this.__table);

        Object.entries(filter).forEach((entrie, index) => (
            index
                ? query.andWhere(this.__getSearchCondition(...entrie))
                : query.where(this.__getSearchCondition(...entrie))
        ));

        const result = await query
            .select(...this.__columns)
            .orderBy(sortField, sortType)
            .limit(limit)
            .offset(offset);

        return result;
    }

    static async getBySlugOrId(searchParams: TCategorySearchParams) {
        const rows = await DB.skbt()<TCategory>(this.__table)
            .where(searchParams)
            .select(...this.__columns);

        return rows[0];
    }

    static async create(category: TCategory, date: Date) {
        const result = await DB.skbt()
            .insert({ ...category, created_date: date })
            .into<TCategory>(this.__table)
            .returning(this.__columns);

        return result;
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
            .returning(this.__columns);

        return result[0];
    }
}

export default CategoryDb;
