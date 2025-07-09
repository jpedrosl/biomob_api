require('dotenv').config();

import { Pool } from 'pg';

async function activatePostgis() {
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
        console.log('Conectado ao banco de dados para ativar PostGIS...');
        await client.query('CREATE EXTENSION IF NOT EXISTS postgis;');
        console.log('Extensão PostGIS verificada/ativada com sucesso!');
        const result = await client.query('SELECT postgis_full_version();');
        console.log('Versão do PostGIS:', result.rows[0].postgis_full_version);
    } catch (error) {
        console.error('Erro ao ativar a extensão PostGIS:', error);
        process.exit(1);
    } finally {
        if (client) {
            client.release();
            console.log('Conexão com o banco de dados liberada.');
        }
        await pool.end();
    }
}

activatePostgis();
