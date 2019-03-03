import {
    Router
} from 'express';
import validate from 'express-validation';

import StaffService from '../../service/StaffService';

const router = Router();

router.post('/staff/login', (request, response, next) => {
    StaffService.authenticate(request)
        .then(result => {
            response.status(200);
            response.json(result);
        }).catch(err => next(err));
});
router.post('/staff/nurse', (request, response, next) => {
    StaffService.createStaffNurse(request)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});
router.post('/staff/doctor', (request, response, next) => {
    StaffService.createStaffDoctor(request)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});
router.post('/staff/lab-attendant', (request, response, next) => {
    StaffService.createStaffLab(request)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});
router.get('/staff/nurses', (request, response, next) => {
    StaffService.fetchNurses()
        .then(result => {
            response.status(200);
            response.json(result);
        }).catch(err => next(err));
});
router.get('/staff/lab-attendants', (request, response, next) => {
    StaffService.fetchLabAttendants()
        .then(result => {
            response.status(200);
            response.json(result);
        }).catch(err => next(err));
});
router.get('/staff/doctors', (request, response, next) => {
    StaffService.fetchDoctors()
        .then(result => {
            response.status(200);
            response.json(result);
        }).catch(err => next(err));
});

export default router;