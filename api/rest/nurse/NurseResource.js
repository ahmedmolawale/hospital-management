import {
    Router
} from 'express';
import validate from 'express-validation';
import NurseService from '../../service/NurseService';

const router = Router();

router.get('/nurse/:staff_id/assigned-patients', (request, response, next) => {
    NurseService.getAssignedPatients(request.params.staff_id)
    .then(result => {
        response.status(200);
        response.json(result);
    }).catch(err => {
        next(err);
    });
});
router.post('/nurse/record-vitals', (request, response, next) => {
    NurseService.recordVitals(request)
    .then(result => {
        response.status(201);
        response.json(result);
    }).catch(err => {
        next(err);
    });
});

export default router;