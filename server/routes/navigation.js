var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient

var dbConnection = "mongodb+srv://tom:followyourdreams@cluster0.eaelm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(dbConnection, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('lifearray-navigation')
    const navCollection = db.collection('navigation', {

    })

    router.get('/', function(req, res, next){
        const nav = navCollection.find().toArray()
        .then(results => {
            console.log(results);
            res.send(results);
        }).catch(error => 
            console.error(error))
            console.log(error);
    });

    router.get('/add', function(req, res, next){
        navCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
          }).catch(error => console.error(error))
    });

  })
  .catch(error => console.error(error))