import { Knex, knex } from 'knex';

// @ts-ignore
import knexStringcase from 'knex-stringcase';

import { dbConfig as db } from '../../config';

class DB {
    private static __skbt?: Knex;

    static skbt() {
        if (!this.__skbt) {
            this.__skbt = knex(knexStringcase({
                client: 'pg',
                connection: {
                    host: db.host,
                    port: db.port,
                    user: db.user,
                    database: db.database,
                    password: db.password,
                },
            }));
        }

        return this.__skbt;
    }

    static async deinit() {
        if (this.__skbt) {
            this.__skbt.destroy();
            delete this.__skbt;
        }
    }
}

export default DB;
