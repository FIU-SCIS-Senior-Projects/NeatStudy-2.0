var express = require('express');
var app = express();
var bodyParser    = require('body-parser');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/neat';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});
/*
db.on('error', function(err){
	console.log('Error: could not connect to MongoDB.');
});
db.once('open', function() {
  console.log("we are connected");
});*/

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use('/a_scripts', express.static(__dirname + '/node_modules/angular/'));
app.use('/aui_router_scripts', express.static(__dirname + '/node_modules/angular-ui-router/'));
app.use('/a_animate_scripts', express.static(__dirname + '/node_modules/angular-animate/'))
app.use('/amaterial_scripts', express.static(__dirname + '/node_modules/angular-material/'));
app.use('/amaterial_icons_scripts', express.static(__dirname + '/node_modules/angular-material-icons/'));
app.use('/a_aria_scripts', express.static(__dirname + '/node_modules/angular-aria/'));

app.use(express.static(__dirname + '/webapp'));	


app.get('/joy_data',function(req,res)
{
	console.log("getting req");
  MongoClient.connect(url, function(err, db)
  {
    console.log("Connected to database")
    db.collection('joy', function(err,collection)
    {
      if(err)
      {
        res.send('There was an error with the collection');
      }
      else
      {
       	console.log("Connected to Joy collection")

        collection.find().toArray(function(err, docs) {
          assert.equal(null, err);
          //console.log(docs);
          res.json(docs);
          db.close();
        })
      }
    })
  })
});

app.post('/joy_data',function(req,res)
{
  console.log("getting res");
  MongoClient.connect(url, function(err, db)
  {
    console.log("Connected to database")
    db.collection('joy', function(err,collection)
    {
      if(err)
      {
        res.send('There was an error with the collection');
      }
      else
      {
        console.log("Connected to Joy collection")
        collection.updateOne(
          {activity_name: req.activity_name},
          {
            $set: {"scores": req.scores, "progress": req.progress}
          })
          assert.equal(null, err);
          //console.log(docs);
          //res.json(docs);
          db.close();
        }
      })
    })
  });


app.get('/passion_data',function(req,res)
{
  console.log("getting req");
  MongoClient.connect(url, function(err, db)
  {
    console.log("Connected to database")
    db.collection('passion', function(err,collection)
    {
      if(err)
      {
        res.send('There was an error with the collection');
      }
      else
      {
        console.log("Connected to collection")
        collection.find().toArray(function(err, docs) {
          assert.equal(null, err);
          //console.log(docs);
          res.json(docs);
          db.close();
        })
      }
    })
  })
});

app.get('/giving_data',function(req,res)
{
  console.log("getting req");
  MongoClient.connect(url, function(err, db)
  {
    console.log("Connected to database")
    db.collection('giving', function(err,collection)
    {
      if(err)
      {
        res.send('There was an error with the collection');
      }
      else
      {
        console.log("Connected to collection")
        collection.find().toArray(function(err, docs) {
          assert.equal(null, err);
          //console.log(docs);
          res.json(docs);
          db.close();
        })
      }
    })
  })
});


app.post('/create_joy',function(req,res){
console.log("hello");
console.log(req);
console.log(req.body);
                      db.joy.insert(req.body, function (err) {

                                  if(err) {
                                              res.status(400);
                                              return res.send(err);
                                              }

                                  return res.json({success: true});
                                  });
                    }
);

app.listen(3000);