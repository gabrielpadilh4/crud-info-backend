let mongoose = require('mongoose');
let Vehicle = require('../models/vehicle');


function getVehicles(req, res) {

    let query = Vehicle.find({});
    query.exec((err, vehicles) => {
        if (err) res.send(err);

        res.json(vehicles);
    });
}


function postVehicle(req, res) {

    var newVehicle = new Vehicle(req.body);

    newVehicle.save((err, vehicle) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: "Vehicle successfully added!", vehicle });
        }
    });
}


function getVehicle(req, res) {
    Vehicle.findById(req.params.id, (err, vehicle) => {
        if (err) res.send(err);

        res.json(vehicle);
    });
}


function deleteVehicle(req, res) {
    Vehicle.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Vehicle successfully deleted!", result });
    });
}


function updateVehicle(req, res) {
    Vehicle.findById({ _id: req.params.id }, (err, vehicle) => {
        if (err) res.send(err);
        Object.assign(vehicle, req.body).save((err, vehicle) => {
            if (err) res.send(err);
            res.json({ message: 'Vehicle updated!', vehicle });
        });
    });
}

module.exports = { getVehicles, postVehicle, getVehicle, deleteVehicle, updateVehicle };