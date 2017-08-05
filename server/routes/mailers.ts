import { Request, Response, Router } from 'express';
import * as nforce from 'nforce';

const mailersRouter: Router = Router();

const getMailersRouter = (org: any) => {
    mailersRouter.post('/', function(req, res) {
        const mail = req.body;
        const mailer = nforce.createSObject('Mailer__c', mail);

        org.insert({ sobject: mailer }, function (err, resp) {
            if (err) {
                console.log('Error: ' + err.message);
            } else {
                console.log('Mailer created.');
                res.send(resp);
            }
        });
    });

    return mailersRouter;
};

export { getMailersRouter };
