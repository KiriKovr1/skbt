import log4js from 'log4js';
import path from 'path';

log4js.configure({
    appenders: {
        console: {
            type: 'console',
        },
        server: {
            type: 'file',
            filename: path.join('logs', 'server.log'),
            compress: true,
            encoding: 'utf-8',
            mode: 0o0640,
            flags: 'w+',
        },
        client: {
            type: 'file',
            filename: path.join('logs', 'client.log'),
            layout: {
                type: 'pattern',
                pattern: '%d %x %p %m',
            },
        },
    },
    categories: {
        default: { appenders: ['server', 'console'], level: 'trace' },
    },
});

const serverLogger = log4js.getLogger('server');
const clientLogger = log4js.getLogger('client');
const clientLoggerMiddleware = log4js.connectLogger(clientLogger, { level: 'auto' });

export {
    serverLogger,
    clientLoggerMiddleware,
};
