// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req,res)=>{
  if(!req.params.date){
    let date = Date.now();
    let toUTC = new Date(parseInt(date)).toUTCString();
    res.send(res.json({unix:date,utc:toUTC}))
  }
  let date = req.params.date;///^\d+$/.test(str);
  if(!/^\d+$/.test(date)){
    var toUTC = new Date(date).toUTCString();
    var toUNIX = new Date(date).getTime();
    if(toUNIX == null || toUTC == "Invalid Date"){
      res.json({ error : "Invalid Date" })
    }
    else{
      res.json({unix:parseInt(toUNIX),utc:toUTC});
    }
  }
  else{
    var toUTC = new Date(parseInt(date)).toUTCString();
    if(toUTC == "Invalid Date"){
      res.json({ error : "Invalid Date" })
    }
    else{
      res.json({unix:parseInt(date),utc:toUTC});
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
