process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
    before(() => {
        const user = {
            email: "success@test.se",
            password: "test"
        }
        chai.request(server)
            .post("/register")
            .send(user)
            .end((err, res) => {

                res.should.have.status(201);
                res.body.should.be.an("object");
            });
    });
    describe('POST /register', () => {
        it('201 HAPPY PATH', (done) => {
            const user = {
                email: "new@test.se",
                password: "test"
            }
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
    describe('POST /register', () => {
        it('500 db error user exists', (done) => {
            const user = {
                email: "success@test.se",
                password: "test"
            }
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.errors.title.should.eq("Database error");

                    done();
                });
        });
    });
    describe('POST /login', () => {
        it('200 HAPPY PATH', (done) => {
            const user = {
                email: "success@test.se",
                password: "test"
            }
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
    describe('POST /login', () => {
        it('401 Wrong password', (done) => {
            const user = {
                email: "success@test.se",
                password: "incorrect"
            }
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.errors.title.should.eq("Wrong password");

                    done();
                });
        });
    });
    //Testing verifying and posting
    describe('POST /reports', () => {
        it('201 HAPPY PATH', (done) => {
            const user = {
                email: "success@test.se",
                password: "test"
            }
            const content = {
                week: 4,
                content: "Test post report"
            }
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    let token = res.body.data.token;
                    chai.request(server)
                        .post("/reports")
                        .send(content)
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(201);
                        });
                    done();
                });

        });
    });
});
