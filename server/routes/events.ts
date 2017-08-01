import { Request, Response, Router } from 'express';

const eventsRouter: Router = Router();

const getEventsRouter = (org: any) => {
    eventsRouter.get('/', function(req, res) {
        // tslint:disable-next-line:max-line-length
        const q = 'SELECT Id, Title__c, Start__c, End__c, Status__c, Address__c, City__c, State__c, Zip__c, Cover_Image_URL__c, Remaining_Seats__c, Registration_Limit__c, Description__c, Event_ID__c, (SELECT Id, Session_ID__c, Title__c, Start__c, End__c, Remaining_Seats__c, Registration_Limit__c, Status__c FROM Sessions__r) FROM Event__c';

        org.query({query: q}, function (err, resp) {
            if (err) {
                console.log('Error: ' + err.message);
            };
            if (!err && resp.records) {
                res.send(resp.records);
            };
        });
    });

    eventsRouter.get('/:id', function(req, res) {
        const id = req.params.id;
        if (id) {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:quotemark
            const q = "SELECT Id, Title__c, Start__c, End__c, Status__c, Address__c, City__c, State__c, Zip__c, Cover_Image_URL__c, Remaining_Seats__c, Registration_Limit__c, Description__c, Event_ID__c, (SELECT Id, Session_ID__c, Title__c, Start__c, End__c, Remaining_Seats__c, Registration_Limit__c, Status__c FROM Sessions__r) FROM Event__c WHERE Id = '" + id + "'";

            org.query({query: q}, function (err, resp) {
                if (err) {
                    console.log('Error: ' + err.message);
                };
                if (!err && resp.records) {
                    res.send(resp.records);
                };
            });
        }
    });

    return eventsRouter;
};

export { getEventsRouter };
