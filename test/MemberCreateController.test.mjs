import { describe, it, before, after} from 'mocha';
import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { createMemberAsync } from '../utils/controllers/MemberCreateController.mjs';
import { app, server } from '../index.mjs';  

chai.use(chaiHttp);
let baseUrl;

describe('Member API', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
    });

    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    // Test Suite for creating members
    describe('POST /create', () => {

        it('should return 400 for invalid name format', (done) => {
            chai.request(baseUrl)
                .post('/api/members/create')
                .send({ name: '123InvalidName', adminNumber: '2304806I', gymPrograms: ['Test Program'] })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('Invalid name. It should contain only alphabetic characters and spaces.');
                    done();
                });
        });

        it('should return 400 for invalid admin number format', (done) => {
            chai.request(baseUrl)
                .post('/api/members/create')
                .send({ name: 'Valid Name', adminNumber: '123ABC', gymPrograms: ['Test Program'] })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal('Invalid admin number format. It should consist of 7 digits followed by 1 uppercase letter (e.g., 2304806I).');
                    done();
                });
        });

        it('should return 404 for non-existent gym programs', (done) => {
            chai.request(baseUrl)
                .post('/api/members/create')
                .send({ name: 'Valid Name', adminNumber: '2304806I', gymPrograms: ['NonExistentProgram'] })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.message).to.equal('Program ( Name: NonExistentProgram ) not found!');
                    done();
                });
        });

        it('should create a new member', (done) => {
            chai.request(baseUrl)
                .post('/api/members/create')
                .send({ name: 'Valid Name', adminNumber: '2304806I' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.include('Member ( ID: ');
                    done();
                });
        });
    });
});
// const { describe, it } = require('mocha'); 
// const { expect } = require('chai'); 
// const { app, server } = require('../index'); 
// const chai = require('chai'); 
// const chaiHttp = require('chai-http'); 
// chai.use(chaiHttp); 
// let baseUrl; 
// describe('Resource API', () => { 
// before(async () => { 
// const { address, port } = await server.address(); 
// baseUrl = `http://${address == '::'? 'localhost': address}:${port}`; 
// }); 
// after(() => { 
// return new Promise((resolve) => { 
// server.close(() => { 
// resolve(); 
// }); 
// }); 
// }); 
// let count = 0; 
// let resourceId;  // Variable to store the ID of the resource 
// // Test Suite for adding resources 
// describe('POST /add-resource', () => { 
//     it('should return 500 for validation errors', (done) => { 
//         chai.request(baseUrl) 
//             .post('/add-resource') 
//             .send({ name: 'Test Resource', location: 'Test Location', description: 
// 'Short', owner: 'invalid-email' }) 
//             .end((err, res) => { 
//                 expect(res).to.have.status(500); 
//                 expect(res.body.message).to.equal('Validation error'); 
//                 done(); 
//             }); 
//     }); 

//     it('should add a new resource', (done) => { 
//         chai.request(baseUrl) 
//             .post('/add-resource') 
//             .send({ name: 'Test Resource', location: 'Test Location', description: 
// 'A short description', owner: 'test@example.com' }) 
//             .end((err, res) => { 
//                 expect(res).to.have.status(201); 
//                 expect(res.body).to.be.an('array'); 
//                 expect(res.body.length).to.equal(count + 1); 
//                 resourceId = res.body[res.body.length - 1].id;  // Store the ID of he newly added resource 
//                 done(); 
//             }); 
//     }); 
// }); 

// }); 
