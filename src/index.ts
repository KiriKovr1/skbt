import http, { Server } from 'http';
import { AddressInfo } from 'net';

import express, { Express } from 'express';
import compression from 'compression';
import basicAuth from 'express-basic-auth';
import swaggerUi from 'swagger-ui-express';

import apiRouter from './router';
import errorMiddleware from './middleware/error.middleware';
import DB from './services/Db/DB';

import { serverLogger as logger, clientLoggerMiddleware } from './logger';
import { basicAuthConfig, serverConfig } from './config';
import { getSwaggerFile } from './utils';

(async () => {
    logger.debug(JSON.stringify(new Date()));

    try {
        logger.debug(`The server is start, pid#${process.pid}, ts#${Date.now()}`);
        process.on('exit', (code) => logger.debug(`The server is stop, code#${code} pid#${process.pid}, ts#${Date.now()}`));

        const app: Express = express();
        const appMiddleware = [
            clientLoggerMiddleware,
            compression(),
            express.json({ limit: '16mb' }),
        ];
        appMiddleware.forEach((it) => app.use(it));

        const swagger = await getSwaggerFile();
        if (swagger) {
            app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swagger));
            logger.debug(`The swagger is running at ${serverConfig.host}:${serverConfig.port}/api-doc`);
        }

        app.use(basicAuth(basicAuthConfig));
        app.use('/api/v1', apiRouter);
        app.use(errorMiddleware);

        logger.info(`The server is running at ${serverConfig.host}:${serverConfig.port}`);

        const server: Server = http.createServer(app);
        await new Promise((resolve, reject) => {
            server.on('error', reject);
            // @ts-ignore
            server.listen(serverConfig.port, serverConfig.host, resolve);
        });
        logger.info(`The server is listening at ${(server.address() as AddressInfo).address}:${(server.address() as AddressInfo).port}`);

        try {
            const reason = await new Promise((resolve) => {
                process.on('SIGINT', () => resolve('interrupted'));
                process.on('SIGTERM', () => resolve('terminated'));
            });

            logger.debug(`The server is ${reason}, pid#${process.pid}, ts#${Date.now()}`);
        } finally {
            await DB.deinit();
            server.close();
        }
    } catch (err) {
        logger.error(`Global error occured: ${err}`);
    }
})();
