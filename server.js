const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
const nforce = require('nforce');
const bodyParser = require('body-parser');
const fs = require('fs');

const sslOptions = {
    key: fs.readFileSync('key.pem', 'utf8'),
    cert: fs.readFileSync('cert.pem', 'utf8'),
    passphrase: 'asdf'
}

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

var org = nforce.createConnection({
  clientId: '3MVG9zlTNB8o8BA32zL1fZQgQUSvJf4PmET9ROyYedU9cyygJ_Gy0CUL.4tVzB27OmZ8vvDmNyTIs6LXx58CS',
  clientSecret: '1708988462682560803',
  redirectUri: 'https://event-connect-test.herokuapp.com/oauth/_callback',
  environment: 'production', 
  mode: 'single'
});

// https.createServer(sslOptions, app).listen(process.env.PORT || 8080);
app.listen(process.env.PORT || 8080);
console.log("Server Running");

var oauth;
org.authenticate({ username: 'jsitu@xtime.com', password: 'Test@1234'}, function(err, resp) {
    if (!err) oauth = resp;
});

app.get("/api/events", function(req, res) {
  org.authenticate({ username: 'jsitu@xtime.com', password: 'Test@1234'}, function(err, oauth){
    if(err) {
      console.log('Error: ' + err.message);
    } else {
      console.log('Access Token: ' + oauth.access_token);
      org.query({query:"select Name from Event__c"}, function (err, resp) {
        if(err) throw err;
        if(resp.records && resp.records.length){
          res.send(resp.records);
        }
      });
    }
  });
});

// PathLocationStrategy
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
