import fs from 'fs';
import path from 'path';
import merge from 'deepmerge';

import defaultConfig from './config.default';

export type ServerConfig = {
    host: string;
    port: number;
    apiVersion: string;
};

export type BasicAuthConfig = {
    users: Record<string, string>;
};

export type LoggerConfig = {
    logsDir: string;
    logsDelayedError?: string;
};

export type DbConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export type Config = {
    basicAuth: BasicAuthConfig;
    server: ServerConfig;
    logger: LoggerConfig;
    db: DbConfig;
};

const configLocal: object = {};
try {
    Object.assign(
        configLocal,
        JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config-locale.json')).toString('utf-8')),
    );
} catch (err) {
    Object.assign(configLocal, { logger: { logsDelayedError: `Local config error: ${err}` } });
}

const config: Config = merge(defaultConfig, configLocal);

export const serverConfig = config.server;
export const basicAuthConfig = config.basicAuth;
export const loggerConfig = config.logger;
export const dbConfig = config.db;
