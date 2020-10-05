process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /reports/week/1', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.result.week.should.be.equal(1);

                    done();
                });
        });
    });

    describe('GET /reports', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.result.should.be.an("array");
                    res.body.data.result.length.should.be.above(0);

                    done();
                });
        });
    });
});

describe('Index', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.content.should.be.an("string");

                    done();
                });
        });
    });
});
