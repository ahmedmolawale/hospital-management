'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _LabService = require('../../service/LabService');

var _LabService2 = _interopRequireDefault(_LabService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/lab/record-lab-result', function (request, response, next) {
    _LabService2.default.recordLabResult(request).then(function (result) {
        response.status(201);
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