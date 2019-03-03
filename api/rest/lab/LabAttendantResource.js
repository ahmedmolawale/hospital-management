import {
    Router
} from 'express';
import validate from 'express-validation';
import LabService from '../../service/LabService';

const router = Router();

router.post('/lab/record-lab-result', (request, response, next) => {
    LabService.recordLabResult(request)
    .then(result => {
        response.status(201);
        response.json(result);
    }).catch(err => {
        next(err);
    });
});

// router.post('/nurse/record-vitals', (request, response, next) => {
//     NurseService.recordVitals(request)
//     .then(result => {
//         response.status(201);
//         response.json(result);
//     }).catch(err => {
//         next(err);
//     });
// });

export default router;