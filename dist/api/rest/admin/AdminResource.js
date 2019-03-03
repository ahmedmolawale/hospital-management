'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _Util = require('./Util');

var _AdminService = require('../../service/AdminService');

var _AdminService2 = _interopRequireDefault(_AdminService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/admin/login', (0, _expressValidation2.default)(_Util.login), function (request, response, next) {
    _AdminService2.default.authenticate(request).then(function (result) {
        response.status(200);
        result.role = 'admin';
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});

router.post('/admin/create', (0, _expressValidation2.default)(_Util.admin), function (request, response, next) {
    _AdminService2.default.createAdmin(request).then(function (result) {
        response.status(201);
        response.json(result);
    }).catch(function (err) {
        return next(err);
    });
});

exports.default = router;