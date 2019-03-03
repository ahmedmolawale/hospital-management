'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.admin = exports.login = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = {
    body: {
        username: _joi2.default.string().required(),
        password: _joi2.default.string().required()
    }
};

var admin = exports.admin = {
    body: {
        username: _joi2.default.string().required(),
        password: _joi2.default.string().required(),
        email: _joi2.default.string(),
        first_name: _joi2.default.string().required(),
        last_name: _joi2.default.string().required()

    }
};