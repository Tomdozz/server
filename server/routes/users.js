var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient

var dbConnection = "mongodb+srv://tom:followyourdreams@cluster0.eaelm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(dbConnection, { useUnifiedTopology: true })
  .then(client => {
    console.log('Users connected to the db')
    const db = client.db('lifearray-users')
    const usersCollection = db.collection('user', {
      validator: { $jsonSchema: {
        bsonType: "object", 
        required: [ "name", "surname", "email", "username" ], 
        properties: { 
          name: { 
             bsonType: "string", 
             description: "required and must be a string" }, 
          surname: { 
             bsonType: "string", 
             description: "required and must be a string" }, 
          email: { 
             bsonType: "string", 
             pattern: "^.+\@.+$", 
             description: "required and must be a valid email address" }, 
          username: { 
             bsonType: "stirng", 
             description: "required and must be a string" }
       }
      }
      }
    })

    //app.use(/* ... */)
    router.get('/', function(req, res, next) {
      const users = usersCollection.find().toArray()
      .then(results => {
        console.log(results)
        res.send(results)
      })
      .catch(error => console.error(error))
      console.log(users)
    });
    
    router.post('/add', function (req, res) {
      usersCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
    })

    router.put('/put', function (req, res) {
    usersCollection.findOneAndUpdate(
      {name: 'hoebag'},
      {
        $set: {
          name: req.body.name,
          pwd: req.body.pwd
        }
      },
      {
        upsert: true
      }
      /* ... */)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
    })
    //app.listen(/* ... */)

  })
  .catch(error => console.error(error))

module.exports = router;
