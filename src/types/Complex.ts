export type TCategory = {
    id: string;
    slug: string;
    name: string;
    active: boolean;
    description: string | null;
    createdDate?: Date;
};

export type TErrorStatus = 500 | 400;
export type TAnyAsyncFunction = (...args: any[]) => Promise<any>

export type TPartialCategory = Partial<TCategory>
export type TCategorySearchParams = {
    id?: string;
    slug?: string;
};

export type TCategoryKey = keyof TCategory | 'createdDate';
export type TSort = `-${TCategoryKey}` | TCategoryKey

export type TFilterQuery = {
    name?: string;
    description?: string;
    search?: string;
    active?: string;
    pageSize?: number;
    page?: number;
    sort?: TSort;
}

export type TSortType = 'ASC' | 'DESC';
export type TSortTuple = [TSortType, TCategoryKey]

export type TFilter = {
    sortType: TSortType;
    sortField: TCategoryKey;
    limit: number;
    offset: number;
    filter: Omit<TFilterQuery, 'page' | 'pageSize' | 'sort'>;
}
