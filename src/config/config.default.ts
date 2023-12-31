const config = {
    server: {
        host: 'localhost',
        port: 3001,
        apiVersion: 'v1',
    },
    basicAuth: {
        users: {
            skbt: 'default',
        },
    },
    logger: {
        logsDir: 'logs',
    },
    db: {
        host: 'localhost',
        port: 5431,
        user: 'postgres',
        password: 'psql-skbt',
        database: 'skbt',
    },

};

export default config;
