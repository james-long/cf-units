const express = require("express");
const app = express();

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";

const dbName = "cf-units";
const collectionName = "units";

let cfunits;

// Initial connection to MongoDB
MongoClient.connect(url, {useNewUrlParser : true}, function(err, db) {
    if (err) {
        throw err;
    }

    cfunits = db.db(dbName);
});

// Endpoint to retrieve data on individual units
app.get('/units/:unitID', (req, res) => {
    cfunits.collection(collectionName).findOne({UnitID : +req.params["unitID"]}, function(err, data){
        if(err){
            throw err;
        }
        res.send(data);
    });
});

// Endpoint to retrieve unit images
app.get('/unitimages/:unitID', (req, res) => {
    let fullID = req.params["unitID"].padStart(4, "0");
    res.sendFile(__dirname + "/unitSprites/Unit" + fullID + ".png");
});

app.listen(8000, () => console.log("Server listening on port 8000"));