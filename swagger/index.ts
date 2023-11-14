import path from 'path';

import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Categories API',
        description: 'Categories API',
    },
    definitions: {
        Category: {
            id: '1',
            slug: 'category',
            name: 'Категория',
            description: 'Описание Категории',
            active: true,
        },
    },
    host: 'localhost:3001/api/v1',
    schemes: ['http'],
};

const outputFile = path.join(process.cwd(), 'api-spec.json');
const routes = [path.resolve(__dirname, '../src/router/index.ts')];

swaggerAutogen(outputFile, routes, doc);
