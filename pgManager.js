import pg from 'pg';
const { Pool } = pg;

// const pool = new Pool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.PORT,
//     idleTimeoutMillis: 30000,
// });
const pool = new Pool({
    database: "postgres"
});

export class PgManager {
    async insertUser(username) {
        const insertUser = `
        INSERT INTO public.users
            (name)
            VALUES($1)
            RETURNING *
        `;
        const result = await pool.query(insertUser, [username]);
        console.log(result)
        const userCreated = result.rows[0];
        return userCreated
    }

    async queryUsers() {
        const result = await pool.query("SELECT * FROM postgres.public.users");
        console.log(result)
        const users = result.rows;
        return users
    }
}