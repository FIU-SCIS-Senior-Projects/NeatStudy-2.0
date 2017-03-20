var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('neat_db',['joy']);
var bodyParser    = require('body-parser');

db.on('error', function(err){
	console.log('Error: could not connect to MongoDB.');
});
db.once('open', function() {
  console.log("we are connected");
});


app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
  


app.use('/a_scripts', express.static(__dirname + '/node_modules/angular/'));
app.use('/aui_router_scripts', express.static(__dirname + '/node_modules/angular-ui-router/'));
app.use('/a_animate_scripts', express.static(__dirname + '/node_modules/angular-animate/'))
app.use('/amaterial_scripts', express.static(__dirname + '/node_modules/angular-material/'));
app.use('/amaterial_icons_scripts', express.static(__dirname + '/node_modules/angular-material-icons/'));
app.use('/a_aria_scripts', express.static(__dirname + '/node_modules/angular-aria/'));



app.use(express.static(__dirname + '/webapp'));	


app.get('/joy_data',function(req,res){
	console.log("getting req");
          db.joy.find(function(err,joy){
          	if(err) {
                    res.send('There was an error processing');
                } else {
                	console.log("in else state")
                    res.json(joy);
                }


          })


});


app.get('/passion_data',function(req,res){
  console.log("getting req");
          db.passion.find(function(err,passion){
            if(err) {
                    res.send('There was an error processing');
                } else {
                  console.log("in else state")
                    res.json(passion);
                }


          })


});

app.get('/givingback_data',function(req,res){
  console.log("getting req");
          db.passion.find(function(err,giving_back){
            if(err) {
                    res.send('There was an error processing');
                } else {
                  console.log("in else state")
                    res.json(giving_back);
                }


          })


});


app.post('/create_activity',function(req,res){
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