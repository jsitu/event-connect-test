import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as nforce from 'nforce';
import * as config from './config';

/* These need to be during production deployment */
import * as https from 'https';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../../dist/client'));

let oauth;
const org = nforce.createConnection({
  clientId: config.sfClientId,
  clientSecret: config.sfClientSecret,
  redirectUri: config.sfCallBackUrlLocal,
  environment: 'production',
  mode: 'single',
  autoRefresh: true
});

// Local Test Mode
https.createServer(config.localSSLOptions, app).listen(process.env.PORT || config.localServerPort);
// Production Mode
// app.listen(process.env.PORT || config.localServerPort);
console.log('Server Running');

org.authenticate(config.sfCred, function(err, resp) {
    if (!err) {
        console.log('Authentication Success!');
        oauth = resp;
    } else {
        console.log('Error: ' + err.message);
    }
});

app.get('/api/events', function(req, res) {

    const q = 'select Title__c, Start__c, End__c, Status__c from Event__c';

    org.query({query: q}, function (err, resp) {
        if (err) {
            console.log('Error: ' + err.message);
        };
        if (!err && resp.records) {
            res.send(resp.records);
        };
    });
});

// PathLocationStrategy
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});
