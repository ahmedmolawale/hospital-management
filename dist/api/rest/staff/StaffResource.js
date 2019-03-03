'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _StaffService = require('../../service/StaffService');

var _StaffService2 = _interopRequireDefault(_StaffService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/staff/login', function (request, response, next) {
    _StaffService2.default.authenticate(request).then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.post('/staff/nurse', function (request, response, next) {
    _StaffService2.default.createStaffNurse(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.post('/staff/doctor', function (request, response, next) {
    _StaffService2.default.createStaffDoctor(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.post('/staff/lab-attendant', function (request, response, next) {
    _StaffService2.default.createStaffLab(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.get('/staff/nurses', function (request, response, next) {
    _StaffService2.default.fetchNurses().then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.get('/staff/lab-attendants', function (request, response, next) {
    _StaffService2.default.fetchLabAttendants().then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});
router.get('/staff/doctors', function (request, response, next) {
    _StaffService2.default.fetchDoctors().then(function (result) {
        response.status(200);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});

exports.default = router;