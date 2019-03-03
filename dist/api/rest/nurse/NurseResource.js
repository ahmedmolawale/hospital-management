'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _NurseService = require('../../service/NurseService');

var _NurseService2 = _interopRequireDefault(_NurseService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/nurse/:staff_id/assigned-patients', function (request, response, next) {
    _NurseService2.default.getAssignedPatients(request.params.staff_id).then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        next(err);
    });
});
router.post('/nurse/record-vitals', function (request, response, next) {
    _NurseService2.default.recordVitals(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        next(err);
    });
});

exports.default = router;