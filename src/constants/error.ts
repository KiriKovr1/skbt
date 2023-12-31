// eslint-disable-next-line
export enum messages {
    BAD_REQUEST = 'Bad Request',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    ID_OR_SLUG_NOT_UNIQUE = '"Id" and "Slug" must be unique',
    NOT_LATIN = 'value must consist of Latin characters',
    COLUMN_NOT_EXIST = 'The parameters you passed cannot correspond to the entity schema of category',
    ID_OR_SLUG_IS_REQUIRED = '"Id" or "Slug" is required',
    CATEGORY_NOT_FOUND = 'Category not found based on the specified parameters',
    INVALID_PAGE_SIZE = 'Value must contain only numbers from 1 to 9'
}
