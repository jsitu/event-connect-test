import { Request, Response, Router } from 'express';

const eventsRouter: Router = Router();

const getEventsRouter = (org: any) => {
    eventsRouter.get('/', function(req, res) {
        // tslint:disable-next-line:max-line-length
        const q = 'select Title__c, Start__c, End__c, Status__c, Address__c, City__c, State__c, Zip__c, Cover_Image_URL__c, Remaining_Seats__c, Description__c from Event__c';

        org.query({query: q}, function (err, resp) {
            if (err) {
                console.log('Error: ' + err.message);
            };
            if (!err && resp.records) {
                res.send(resp.records);
            };
        });
    });

    return eventsRouter;
};

export { getEventsRouter };