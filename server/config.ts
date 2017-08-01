import * as fs from 'fs';
import * as path from 'path';

export const localServerPort = 8080;
// Salesforce settings
export const sfCallBackUrlLocal = `https://localhost:${localServerPort}/oauth/_callback`;
export const sfCallBackUrlProduction = 'https://event-connect-test.herokuapp.com/oauth/_callback';
export const sfCred = {
    username: 'jsitu@xtime.com',
    password: 'Test@1234',
    securityToken: 'UsrfNu5Is1B0153PPBHGGOaTf'
};
export const sfClientId = '3MVG9zlTNB8o8BA32zL1fZQgQUSvJf4PmET9ROyYedU9cyygJ_Gy0CUL.4tVzB27OmZ8vvDmNyTIs6LXx58CS';
export const sfClientSecret = '1708988462682560803';

// Local server settings
// export const localSSLOptions = {
//     key: fs.readFileSync(path.join(__dirname + '/key.pem'), 'utf8'),
//     cert: fs.readFileSync(path.join(__dirname + '/cert.pem'), 'utf8'),
//     passphrase: 'asdf'
// };
