"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Patient = require("../data/models").Patient;
var Patient_X_Staff = require("../data/models").Patient_X_Staff;
var Patient_Vitals = require("../data/models").Patient_Vitals;

var NurseService = function () {
    function NurseService() {
        _classCallCheck(this, NurseService);
    }

    _createClass(NurseService, null, [{
        key: "recordVitals",
        value: async function recordVitals(request) {
            try {
                await Patient_Vitals.create(request.body);
                await Patient_X_Staff.update({
                    completed: 'CLOSED'
                }, {
                    where: {
                        staff_id: request.body.nurse_id,
                        patient_id: request.body.patient_id
                    }
                });
            } catch (err) {
                NurseService.produceError('Unable to record vitals', 400);
            }
        }
    }, {
        key: "getAssignedPatients",
        value: async function getAssignedPatients(staffId) {
            try {
                return await Patient.findAll({
                    include: [{
                        model: Patient_X_Staff,
                        as: 'assignments',
                        where: {
                            staff_id: staffId,
                            completed: 'OPEN'
                        }
                    }]
                });
            } catch (err) {
                console.log('Error is ', err);
                NurseService.produceError('Unable to fetch assigned patient', 400);
            }
        }
    }, {
        key: "produceError",
        value: function produceError(message, status) {
            var err = new Error(message);
            err.status = status;
            throw err;
        }
    }]);

    return NurseService;
}();

exports.default = NurseService;