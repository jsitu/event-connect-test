import { json, urlencoded } from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as nforce from 'nforce';
import * as config from './config';

import { getEventsRouter } from './routes/events';
import { getUsersRouter } from './routes/users';
import { getMailersRouter } from './routes/mailers';

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
  redirectUri: config.sfCallBackUrlProduction,
  environment: 'production',
  mode: 'single',
  autoRefresh: true
});

// Local Test Mode
// https.createServer(config.localSSLOptions, app).listen(process.env.PORT || config.localServerPort);
// Production Mode
app.listen(process.env.PORT || config.localServerPort);
console.log('Server Running');

org.authenticate(config.sfCred, function(err, resp) {
    if (!err) {
        console.log('Authentication Success!');
        oauth = resp;
    } else {
        console.log('Error: ' + err.message);
    }
});

// api routes
app.use('/api/events', getEventsRouter(org));
app.use('/api/users', getUsersRouter(org));
app.use('/api/mailers', getMailersRouter(org));

// this path location strategy is to let Angular handle all the routing
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});
