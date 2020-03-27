const request = require('supertest');

const server = require('../api/server.js');

describe('auth-router.js', () => {
    describe('POST /api/auth/register', () => {
        it('should return 401 if username is not provided', async () => {
            const res = await request(server).post('/api/auth/register').send({password: 'password'});

            expect(res.status).toBe(401);
        })

        it('should return 401 if password is not provided', async () => {
            const res = await request(server).post('/api/auth/register').send({username: 'gandalf'})

            expect(res.status).toBe(401);
        })

        it('should return a new user upon successful registration', async () => {
            const newUser = {
                username: `gandalf${Math.floor(Math.random() * Math.floor(2020))}`,
                password: `theWhite${Math.floor(Math.random() * Math.floor(2020))}`
            }

            const res = await request(server).post('/api/auth/register').send(newUser);

            console.log(res.body);

            expect(res.body.username).toBeTruthy();
        })
    })

    describe('POST /api/auth/login', () => {
        it('should return 200 upon successful login', async () => {
            const res = await request(server).post('/api/auth/login').send({username: 'gandalf', password: 'white'});

            expect(res.status).toBe(200);
        })

        it('should return 401 if user does not exist', async () => {
            const res = await request(server).post('/api/auth/login').send({username: 'sauron'});

            expect(res.status).toBe(401);
        })

        it('should return JSON', async () => {
            const res = await request(server).post('/api/auth/login').send({username: 'gandalf', password: 'white'});

            expect(res.type).toMatch(/json/i)
        })
    })
})