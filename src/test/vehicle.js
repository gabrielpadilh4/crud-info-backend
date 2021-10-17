process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Vehicle = require('../models/vehicle');

// dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Vehicles', () => {
    beforeEach((done) => { // empty the database
        Vehicle.remove({}, (err) => {
            done();
        });
    });

    /*
    * Test the /GET route
    */
    describe('/GET vehicle', () => {
        it('it should GET all the vehicles', (done) => {
            chai.request(server)
                .get('/api/vehicle')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    /*
    * Test the /POST route
    */
    describe('/POST vehicle', () => {
        it('it should not POST a vehicle without plate field', (done) => {

            let vehicle = {
                chassis: "TESTE123",
                renavam: "ASDAD123123",
                model: "Uno Mile",
                brand: "Fiat",
                year: "2005"
            }

            chai.request(server)
                .post('/api/vehicle')
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('plate');
                    res.body.errors.plate.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should POST a vehicle ', (done) => {
            let vehicle = {
                plate: "SHOULDWORK-123",
                chassis: "TESTE123",
                renavam: "ASDAD123123",
                model: "Uno Mile",
                brand: "Fiat",
                year: "2005"
            }


            chai.request(server)
                .post('/api/vehicle')
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Vehicle successfully added!');
                    res.body.vehicle.should.have.property('plate');
                    res.body.vehicle.should.have.property('chassis');
                    res.body.vehicle.should.have.property('renavam');
                    res.body.vehicle.should.have.property('model');
                    res.body.vehicle.should.have.property('brand');
                    res.body.vehicle.should.have.property('year');
                    done();
                });
        });

    });

    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id vehicle', () => {
        it('it should GET a vehicle by the given id', (done) => {
            let vehicle = new Vehicle({ plate: "SHOULDWORK-123", chassis: "TESTE123", renavam: "ASDAD123123", model: "Uno Mile", brand: "Fiat", year: "2005" });
            vehicle.save((err, vehicle) => {
                chai.request(server)
                    .get('/api/vehicle/' + vehicle.id)
                    .send(vehicle)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('plate');
                        res.body.should.have.property('chassis');
                        res.body.should.have.property('renavam');
                        res.body.should.have.property('model');
                        res.body.should.have.property('brand');
                        res.body.should.have.property('year');
                        res.body.should.have.property('_id').eql(vehicle.id);
                        done();
                    });
            });

        });
    });

    /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:id vehicle', () => {
        it('it should UPDATE a vehicle given the id', (done) => {
            let vehicle = new Vehicle({ plate: "SHOULDWORK-123", chassis: "TESTE123", renavam: "ASDAD123123", model: "Uno Mile", brand: "Fiat", year: "2005" });
            vehicle.save((err, vehicle) => {
                chai.request(server)
                    .put('/api/vehicle/' + vehicle.id)
                    .send({ plate: "SHOULDWORK-123", chassis: "PUTCHASSI", renavam: "ASDAD123123", model: "Uno Mile", brand: "Fiat", year: "2005" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Vehicle updated!');
                        res.body.vehicle.should.have.property('chassis').eql('PUTCHASSI');
                        done();
                    });
            });
        });
    });
});