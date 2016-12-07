'use strict';

const server = require('../server');
const supertest = require('supertest');
const expect = require('chai').expect;

describe('server', () => {
    beforeEach(() => {
        this.agent = supertest.agent(server);
    });

    it('should have a health route', () => {
        this.agent
        .get('/health')
        .expect(204);
    });

    // more tests here!
});
