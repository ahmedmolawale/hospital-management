'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _util = require('./util');

var _PatientService = require('../../service/PatientService');

var _PatientService2 = _interopRequireDefault(_PatientService);

var _AdminService = require('../../service/AdminService');

var _AdminService2 = _interopRequireDefault(_AdminService);

var _DoctorService = require('../../service/DoctorService');

var _DoctorService2 = _interopRequireDefault(_DoctorService);

var _LabService = require('../../service/LabService');

var _LabService2 = _interopRequireDefault(_LabService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/patients', function (request, response, next) {
    _PatientService2.default.createAPatient(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.post('/patient/assign-nurse', function (request, response, next) {
    _AdminService2.default.assignNurseToPatient(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.post('/patient/assign-lab', function (request, response, next) {
    _DoctorService2.default.assignLabToPatient(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.get('/patient/:patient_id/medical-records', function (request, response, next) {
    _PatientService2.default.getMedicalRecord(request.params.patient_id).then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.post('/patient/medical-records', function (request, response, next) {
    _PatientService2.default.saveMedicalRecord(request.body).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.get('/patient/:patientId/get-lab-result', function (request, response, next) {
    _LabService2.default.getLabResult(request.params.patientId).then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        next(err);
    });
});
router.get('/patients/all', function (request, response, next) {
    response.status(200);
    _PatientService2.default.fetchPatients().then(function (result) {
        console.log('Result ', result);
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        next(err);
    });
});

exports.default = router;