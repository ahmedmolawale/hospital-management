'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _DoctorService = require('../../service/DoctorService');

var _DoctorService2 = _interopRequireDefault(_DoctorService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/doctor/:staff_id/assigned-patients', function (request, response, next) {
    _DoctorService2.default.getAssignedPatients(request.params.staff_id).then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
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

exports.default = router;