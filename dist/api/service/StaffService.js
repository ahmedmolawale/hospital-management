'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _Utility = require('../util/Utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Staff = require("../data/models").Staff;
var ROLES = ['nurse', 'lab-attendant', 'doctor'];

var StaffService = function () {
    function StaffService() {
        _classCallCheck(this, StaffService);
    }

    _createClass(StaffService, null, [{
        key: 'authenticate',
        value: async function authenticate(request) {
            var _request$body = request.body,
                staff_id = _request$body.staff_id,
                password = _request$body.password;

            var staff = await Staff.find({
                where: {
                    staff_id: staff_id
                }
            });
            if (staff) {
                if (_bcrypt2.default.compareSync(password, staff.password)) return staff.role;else StaffService.produceError('Incorrect Passowrd', 203);
            } else StaffService.produceError('Staff does not exist', 404);
        }
    }, {
        key: 'createStaffNurse',
        value: async function createStaffNurse(request) {
            try {
                request.body.staff_id = Date.now().toString();
                request.body.role = ROLES[0];
                request.body.password = (Math.random() + 1).toString(36).substring(7);
                console.log('Password is ', request.body.password);
                var staff = await Staff.create(request.body);
                var subject = 'Welcome Onboard';
                var message = 'Hello ' + request.body.first_name + ', \nYou have just been setup as a nurse on Maternity System.\nSee you login credentials below:\nStaff Id: ' + request.body.staff_id + '\nPassword: ' + request.body.password + '\nPlease login at https://mhs.herokuapps.com/nurse \n\nAccept our esteemed assurances.';
                (0, _Utility.sendEmail)(subject, message, request.body.email_address);
                return staff;
            } catch (err) {
                console.log('Error is ', err);
                StaffService.produceError('Unable to create nurse', 400);
            }
        }
    }, {
        key: 'createStaffDoctor',
        value: async function createStaffDoctor(request) {
            try {
                request.body.staff_id = Date.now().toString();
                request.body.role = ROLES[2];
                request.body.password = (Math.random() + 1).toString(36).substring(7);
                console.log('Password is ', request.body.password);
                var staff = await Staff.create(request.body);
                var subject = 'Welcome Onboard';
                var message = 'Hello ' + request.body.first_name + ', \nYou have just been setup as a doctor on Maternity System.\nSee you login credentials below:\nStaff Id: ' + request.body.staff_id + '\nPassword: ' + request.body.password + '\nPlease login at https://mhs.herokuapps.com/doctor \n\nAccept our esteemed assurances.';
                (0, _Utility.sendEmail)(subject, message, request.body.email_address);
                return staff;
            } catch (err) {
                console.log('Error is ', err);
                StaffService.produceError('Unable to create nurse', 400);
            }
        }
    }, {
        key: 'createStaffLab',
        value: async function createStaffLab(request) {
            try {
                request.body.staff_id = Date.now().toString();
                request.body.role = ROLES[1];
                request.body.password = (Math.random() + 1).toString(36).substring(7);
                var staff = await Staff.create(request.body);
                var subject = 'Welcome Onboard';
                var message = 'Hello ' + request.body.first_name + ', \nYou have just been setup as a lab assistant on Maternity System.\nSee you login credentials below:\nStaff Id: ' + request.body.staff_id + '\nPassword: ' + request.body.password + '\nPlease login at https://mhs.herokuapps.com/lab \n\nAccept our esteemed assurances.';
                (0, _Utility.sendEmail)(subject, message, request.body.email_address);
                return staff;
            } catch (err) {
                console.log('Error is ', err);
                StaffService.produceError('Unable to create nurse', 400);
            }
        }
    }, {
        key: 'fetchNurses',
        value: async function fetchNurses() {
            try {
                return await Staff.findAll({
                    where: {
                        role: ROLES[0]
                    }
                });
            } catch (err) {
                console.log('Error is ', err);
                StaffService.produceError('Unable to fetch nurses', 400);
            }
        }
    }, {
        key: 'fetchLabAttendants',
        value: async function fetchLabAttendants() {
            try {
                return await Staff.findAll({
                    where: {
                        role: ROLES[1]
                    }
                });
            } catch (err) {
                console.log('Error is ', err);
                StaffService.produceError('Unable to fetch nurses', 400);
            }
        }
    }, {
        key: 'fetchDoctors',
        value: async function fetchDoctors() {
            try {
                return await Staff.findAll({
                    where: {
                        role: ROLES[2]
                    }
                });
            } catch (err) {
                console.log('Error is ', err);
                StaffService.produceError('Unable to fetch nurses', 400);
            }
        }
    }, {
        key: 'produceError',
        value: function produceError(message, status) {
            var err = new Error(message);
            err.status = status;
            throw err;
        }
    }]);

    return StaffService;
}();

exports.default = StaffService;