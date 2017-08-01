import { Request, Response, Router } from 'express';
import * as nforce from 'nforce';

const usersRouter: Router = Router();

const getUsersRouter = (org: any) => {
    usersRouter.post('/', function(req, res) {
        const user = req.body;
        const attendee = nforce.createSObject('Attendee__c', user);

        org.insert({ sobject: attendee }, function (err, resp) {
            if (err) {
                console.log('Error: ' + err.message);
            } else {
                console.log('Attendee created.');
                res.send(resp);
            }
        });
    });

    usersRouter.post('/event', function(req, res) {
        const eventAttendee = req.body;
        const eaRelationship = nforce.createSObject('EventAttendee__c', eventAttendee);

        org.insert({ sobject: eaRelationship }, function (err, resp) {
            if (err) {
                console.log('Error: ' + err.message);
            } else {
                console.log('Event attendee association created.');
                res.send(resp);
            }
        });
    });

    return usersRouter;
};

export { getUsersRouter };
