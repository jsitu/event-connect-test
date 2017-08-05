import { Request, Response, Router } from 'express';
import * as nforce from 'nforce';

const usersRouter: Router = Router();

const getUsersRouter = (org: any) => {
    usersRouter.get('/', function(req, res) {
        const query = req.query;
        // tslint:disable-next-line:quotemark
        const q = "SELECT Id FROM Attendee__c WHERE Name = '" + query.name + "' AND Email__c = '" + query.email + "'";

        org.query({ query: q }, function(err, resp){
            if (!err && resp.records.length) {
                res.send(resp.records[0]);
            } else {
                const user = {
                    id: null
                };
                res.send(user);
            }
        });
    });

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

    usersRouter.put('/:id', function(req, res) {
        const id = req.params.id;
        const user = req.body;

        // tslint:disable-next-line:quotemark
        const q = "SELECT Id, Active__c FROM Attendee__c WHERE Id = '" + id + "' LIMIT 1";

        org.query({query: q}, function (err, resp) {
            if (err) {
                console.log('Error: ' + err.message);
            };
            if (!err && resp.records) {
                // tslint:disable-next-line:prefer-const
                let attendee = resp.records[0];
                attendee.set('Active__c', user.Active__c);
                // tslint:disable-next-line:no-shadowed-variable
                org.update({ sobject: attendee }, function(err, resp){
                    if (!err) { console.log('Attendee Active Updated.'); }
                });
            };
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

    usersRouter.post('/session', function(req, res) {
        const sessionAttendee = req.body;
        const saRelationship = nforce.createSObject('SessionAttendee__c', sessionAttendee);

        org.insert({ sobject: saRelationship }, function (err, resp) {
            if (err) {
                console.log('Error: ' + err.message);
            } else {
                console.log('Session attendee association created.');
                res.send(resp);
            }
        });
    });

    return usersRouter;
};

export { getUsersRouter };
