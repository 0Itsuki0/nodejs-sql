import express from 'express';
import { PgManager } from './pgManager.js';
import { PrismaManager } from './prismaManager.js';
var server = express();

const pgManager = new PgManager();
const prismaManager = new PrismaManager();


server.post('/pg/users', async function (request, response) {

    try {
        if ("username" in request.query) {
            const username = request.query.username;
            const userCreated = await pgManager.insertUser(username);
            return response.json({
                "user": userCreated
            });
        } else {
            throw Error(`Username not specified`);
        }

    } catch (error) {
        return response.json({
            "error": `${error}`
        });
    }
});


server.get('/pg/users', async function (request, response) {

    try {
        const users = await pgManager.queryUsers();
        return response.json({
            "users": users
        });

    } catch (error) {
        return response.json({
            "error": `${error}`
        });
    }
});





server.post('/prisma/users', async function (request, response) {

    try {
        if ("username" in request.query) {
            const username = request.query.username;
            const userCreated = await prismaManager.insertUser(username);
            return response.json({
                "user": userCreated
            });
            // const insertUser = `
            // INSERT INTO public.users
            //     (name)
            //     VALUES($1)
            //     RETURNING *
            // `;
            // const result = await pool.query(insertUser, [username]);
            // console.log(result)
            // const createdUser = result.rows[0];
            // return response.json({
            //     "user": createdUser
            // });
        } else {
            throw Error(`Username not specified`);
        }

    } catch (error) {
        return response.json({
            "error": `${error}`
        });
    }
});

server.get('/prisma/users', async function (request, response) {

    try {
        const users = await prismaManager.queryUsers();
        return response.json({
            "users": users
        });

    } catch (error) {
        return response.json({
            "error": `${error}`
        });
    }
});



server.listen(80);
