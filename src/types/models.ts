export type TCategory = {
    id: string;
    slug: string;
    name: string;
    active: boolean;
    description: string | null;
};

export type TPartialCategory = Partial<TCategory>
