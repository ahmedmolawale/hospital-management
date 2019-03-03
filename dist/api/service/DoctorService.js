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

//Medical Report contains vitals, lab result, diagnosis, report of treatment, and appointment (Created appointment)

var DoctorService = function () {
    function DoctorService() {
        _classCallCheck(this, DoctorService);
    }

    _createClass(DoctorService, null, [{
        key: "assignLabToPatient",
        value: async function assignLabToPatient(request) {
            try {
                request.body.completed = 'OPEN';
                return await Patient_X_Staff.create(request.body);
            } catch (err) {
                DoctorService.produceError('Unable to post assignment', 400);
            }
        }
    }, {
        key: "getAssignedPatients",
        value: async function getAssignedPatients(staffId) {
            try {
                return await Patient.findAll({
                    include: [{
                        model: Patient_Vitals,
                        as: 'assigned',
                        where: {
                            doctor_id: staffId
                        }
                    }]
                });
            } catch (err) {
                console.log('Error is ', err);
                DoctorService.produceError('Unable to fetch assigned patient', 400);
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

    return DoctorService;
}();

exports.default = DoctorService;