import {
    Router
} from 'express';
import validate from 'express-validation';
import DoctorService from '../../service/DoctorService';

const router = Router();

router.get('/doctor/:staff_id/assigned-patients', (request, response, next) => {
    DoctorService.getAssignedPatients(request.params.staff_id)
    .then(result => {
        response.status(200);
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