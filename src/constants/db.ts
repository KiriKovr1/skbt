export enum errors {
    DUPLICATE_KEY_VALUE_UNIQUE_CONSTRAINT = '23505',
    COLUMN_NOT_EXIST = '42703',
}

export const CATEGORIES = 'category';
export const VISIBLE_CATEGORY_COLUMNS = ['id', 'slug', 'name', 'description', 'active'] as const;
export const CATEGORY_COLUMNS = [...VISIBLE_CATEGORY_COLUMNS, 'createdDate'];
