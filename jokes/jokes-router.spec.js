const request = require('supertest');

const server = require('../api/server.js');

describe('jokes-router.js', () => {
    describe('GET /api/jokes', () => {
        it('should return 401 UNAUTHORIZED when not logged in', async () => {
            const res = await request(server).get('/api/jokes');

            expect(res.status).toBe(401);
        })

        it('should return message "shall not pass" if not logged in', async () => {
            const res = await request(server).get('/api/jokes');

            expect(res.body.you).toBe('shall not pass!')
        })
    })
})