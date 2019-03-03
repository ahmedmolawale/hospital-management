import {
    Router
} from 'express';
import validate from 'express-validation';
import {
    login
} from './util';
import PatientService from '../../service/PatientService';
import AdminService from '../../service/AdminService';
import DoctorService from '../../service/DoctorService';
import LabService from '../../service/LabService';

const router = Router();

router.post('/patients', (request, response, next) => {
    PatientService.createAPatient(request)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});
router.post('/patient/assign-nurse', (request, response, next) => {
    AdminService.assignNurseToPatient(request)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});
router.post('/patient/assign-lab', (request, response, next) => {
    DoctorService.assignLabToPatient(request)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});
router.get('/patient/:patient_id/medical-records', (request, response, next) => {
    PatientService.getMedicalRecord(request.params.patient_id)
        .then(result => {
            response.status(200);
            response.json(result);
        }).catch(err => next(err));
});
router.post('/patient/medical-records', (request, response, next) => {
    PatientService.saveMedicalRecord(request.body)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});
router.get('/patient/:patientId/get-lab-result', (request, response, next) => {
    LabService.getLabResult(request.params.patientId)
    .then(result => {
        response.status(200);
        response.json(result);
    }).catch(err => {
        next(err);
    });
});
router.get('/patients/all', (request, response, next) => {
    response.status(200);
    PatientService.fetchPatients()
    .then(result => {
        console.log('Result ', result)
        response.status(200);
        response.json(result);
    }).catch(err => {
        next(err);
    });
});

export default router;