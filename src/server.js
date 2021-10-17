let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let port = process.env.PORT || 3000;
let vehicle = require('./routes/vehicle');

let config = require('config'); 

//db connection
mongoose.connect(config.DBHost);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ message: "Welcome!" }));

app.route("/api/vehicle")
    .get(vehicle.getVehicles)
    .post(vehicle.postVehicle);
app.route("/api/vehicle/:id")
    .get(vehicle.getVehicle)
    .delete(vehicle.deleteVehicle)
    .put(vehicle.updateVehicle);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing