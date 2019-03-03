"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = require("../data/models").Admin;
var Patient_X_Staff = require("../data/models").Patient_X_Staff;

var AdminService = function () {
    function AdminService() {
        _classCallCheck(this, AdminService);
    }

    _createClass(AdminService, null, [{
        key: "createAdmin",
        value: async function createAdmin(request) {
            try {
                return await Admin.create(request.body);
            } catch (err) {
                AdminService.produceError('Unable to create admin', 400);
            }
        }
    }, {
        key: "assignNurseToPatient",
        value: async function assignNurseToPatient(request) {
            try {
                request.body.completed = 'OPEN';
                return await Patient_X_Staff.create(request.body);
            } catch (err) {
                AdminService.produceError('Unable to post assignment', 400);
            }
        }
    }, {
        key: "authenticate",
        value: async function authenticate(request) {
            var _request$body = request.body,
                username = _request$body.username,
                password = _request$body.password;

            var admin = await Admin.find({
                where: {
                    username: request.body.username
                }
            });
            if (admin) {
                if (_bcrypt2.default.compareSync(password, admin.password)) return admin;else AdminService.produceError('Incorrect Passowrd', 203);
            } else AdminService.produceError('Admin does not exist', 404);
        }
    }, {
        key: "produceError",
        value: function produceError(message, status) {
            var err = new Error(message);
            err.status = status;
            throw err;
        }
    }]);

    return AdminService;
}();

exports.default = AdminService;