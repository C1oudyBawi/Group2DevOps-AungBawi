import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, server } from '../index.mjs';

chai.use(chaiHttp);
let baseUrl;

describe('Gym Program API', () => {

    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}/`;
    });

    beforeEach((done) => {
        chai.request(baseUrl)
            .delete('api/gym-programs/delete-by-name')
            .send({ name: 'Test Program Unique' })
            .end((err, res) => {
                if (err) {
                    console.error('Error cleaning up test data:', err.message);
                }
                done();
            });
    });

    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    describe('POST /api/gym-programs/create', () => {
        const validProgram = {
            name: 'Test Program',
            focusBodyPart: 'upper',
            intensity: 'mild',
            difficulty: 'beginner',
            targetAudience: 'teenagers',
            reps: 1
        };

        // Test - Duplicate program name
        it('should return 400 if program with the same name already exists', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send(validProgram)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Program with this name already exists.");
                    done();
                });
        });

        // Test - Name is missing or not a string
        it('should return 400 if name is missing or not a string', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, name: '' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Name is required and should be a string.");
                    done();
                });
        });

        // Test - Invalid focusBodyPart
        it('should return 400 for invalid focusBodyPart', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, focusBodyPart: 'invalid' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Focus body part must be 'upper' or 'lower' or 'back'.");
                    done();
                });
        });

        // Test - Invalid intensity
        it('should return 400 for invalid intensity', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, intensity: 'invalid' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Intensity must be 'mild', 'average', or 'high'.");
                    done();
                });
        });

        // Test - Invalid difficulty
        it('should return 400 for invalid difficulty', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, difficulty: 'invalid' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Difficulty must be 'beginner', 'intermediate', or 'advanced'.");
                    done();
                });
        });

        // Test - Invalid targetAudience
        it('should return 400 for invalid targetAudience', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, targetAudience: 'invalid' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Target audience must be 'teenagers', 'adults', or 'elders'.");
                    done();
                });
        });

        // Test - Reps is not a number
        it('should return 400 if reps is not a number or positive number', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, reps: 'invalid' || reps <= 0 })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Reps must be a positive number.");
                    done();
                });
        });

        // Test - Beginner difficulty with high intensity
        it('should return 400 if beginner difficulty has high intensity', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, difficulty: 'beginner', intensity: 'high' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Beginner programs cannot have 'high' intensity.");
                    done();
                });
        });

        // Test - Beginner difficulty with more than 10 reps
        it('should return 400 if beginner difficulty has more than 10 reps', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, difficulty: 'beginner', reps: 15 })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Beginner programs should have fewer than 10 reps.");
                    done();
                });
        });

        // Test - Intermediate difficulty with high intensity and more than 20 reps
        it('should return 400 if intermediatedifficulty has high intensity and more than 20 reps', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, difficulty: 'intermediate', intensity: 'high', reps: 25 })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Intermediate programs should not exceed 20 reps with high intensity.");
                    done();
                });
        });

        // Test - Advanced difficulty with average intensity
        it('should return 400 if advanced difficulty does not have high intensity', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, difficulty: 'advanced', intensity: 'average' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Advanced programs must have 'high' intensity.");
                    done();
                });
        });

        // Test - Advanced difficulty with less than 15 reps
        it('should return 400 if advanced difficulty has less than 15 reps', (done) => {
            chai
                .request(baseUrl)
                .post('api/gym-programs/create')
                .send({ ...validProgram, difficulty: 'advanced', intensity: 'high', reps: 10 })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.errors).to.include("Advanced programs should have at least 15 reps for effective workout.");
                    done();
                });
        });

        // Test - Successful program creation
        it('should create a new program and return 201 status', (done) => {
            chai.request(baseUrl)
                .post('api/gym-programs/create')
                .send({
                    name: 'Test Program Unique',
                    focusBodyPart: 'upper',
                    intensity: 'mild',
                    difficulty: 'beginner',
                    targetAudience: 'teenagers',
                    reps: 1,
                    isActive: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.equal("Program created successfully!");
                    expect(res.body.program).to.have.property('id').that.is.a('string');
                    expect(res.body.program).to.include({
                        name: 'test program unique',
                        focusBodyPart: 'upper',
                        intensity: 'mild',
                        difficulty: 'beginner',
                        targetAudience: 'teenagers',
                        reps: 1,
                        isActive: true
                    });
                    expect(res.body.program.isActive).to.be.true; // to ensure isActive boolean is true
                    done();
                });
        });
    });
});