const FileStream = require("fs");
const CSVParse = require("csv-parse");
const fileDir = "unitInfo.csv";

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";

const dbName = "cf-units"
const collectionName = "units"

FileStream.readFile(fileDir, function(err, fileData){
    if(err){
        console.log("Error occurred in loading the file.");
        throw err;
    }

    CSVParse(fileData, {columns : true}, function(err, output){
        if(err){
            console.log("Error occurred in parsing the CSV.");
            throw err;
        }

        // Iterate through all rows of the CSV
        for(let unit of output) {
            for (let key in unit) {
                if (unit.hasOwnProperty(key)) {
                    // Remove leading and trailing whitespace
                    unit[key] = unit[key].trim();
                    // Convert the value to an int if possible, unless it's a null string
                    if(unit[key] != ""){
                        unit[key] = tryInt(unit[key]);
                    }
                }
            }
        }

        // Insert all values from the CSV into MongoDB
        mongoInsert(output);
    });
})

// Converts a value to an int if possible
function tryInt(text){
    return isNaN(+text) ? text : +text;
}

function mongoInsert(toInsert){
    MongoClient.connect(url, {useNewUrlParser : true}, function(err, db) {
        if (err) {
            throw err;
        }

        let cfunits = db.db(dbName);

        // Delete all records if they exist (we will overwrite from a clean slate)
        cfunits.collection(collectionName).deleteMany({});
        // Insert all records from the CSV
        cfunits.collection(collectionName).insertMany(toInsert, function(err, res){
            if(err){
                console.log("Error occurred in inserting into the MongoDB collection.");
                throw err;
            }

            console.log("Successfully inserted all values.");
        });
        db.close();
    });
}
