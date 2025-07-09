    require('dotenv').config();

    import { Pool } from 'pg';

    async function listDatabaseTables() {
        const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

        const pool = new Pool({
            connectionString: connectionString,
            ssl: {
                rejectUnauthorized: false
            }
        });

        let client;
        try {
            client = await pool.connect();
            console.log('Conectado ao banco de dados para listar tabelas...');

            const result = await client.query(`
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
                ORDER BY table_name;
            `);

            console.log('Tabelas encontradas no banco de dados:');
            if (result.rows.length === 0) {
                console.log('Nenhuma tabela encontrada no schema public.');
            } else {
                result.rows.forEach(row => {
                    console.log(`- ${row.table_name}`);
                });
            }

        } catch (error) {
            console.error('Erro ao listar tabelas:', error);
            process.exit(1);
        } finally {
            if (client) {
                client.release();
                console.log('Conexão com o banco de dados liberada.');
            }
            await pool.end();
        }
    }

    listDatabaseTables();
    