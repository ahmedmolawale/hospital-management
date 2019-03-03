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
var Medical_Records = require("../data/models").Medical_Records;
var Patient_X_Staff = require("../data/models").Patient_X_Staff;

var PatientService = function () {
    function PatientService() {
        _classCallCheck(this, PatientService);
    }

    _createClass(PatientService, null, [{
        key: "createAPatient",
        value: async function createAPatient(request) {
            var patient = null;
            try {
                //get current time
                request.body.patient_id = Date.now().toString();
                patient = await Patient.create(request.body);
            } catch (err) {
                console.log('Error is ', err);
                PatientService.produceError('Unable to create patient', 400);
            }
            if (patient) return patient;
            PatientService.produceError('Unable to create patient', 400);
        }
    }, {
        key: "fetchPatients",
        value: async function fetchPatients() {
            try {
                var patients = await Patient.findAll({
                    include: [{
                        model: Patient_X_Staff,
                        as: 'assignments',
                        attributes: ['completed']
                    }]
                });
                return patients.map(function (patient, index) {
                    var a = patient.assignments.find(function (a) {
                        return a.completed === 'OPEN';
                    });
                    console.log('I saw ', a);
                    if (a) patient.dataValues.available = false;else patient.dataValues.available = true;
                    patient.dataValues.assignments = undefined;
                    return patient;
                });
            } catch (err) {
                console.log('Error is ', err);
                PatientService.produceError('Unable to fetch patient', 400);
            }
        }
    }, {
        key: "getMedicalRecord",
        value: async function getMedicalRecord(patientId) {

            try {
                var medicalRecord = await Medical_Records.find({
                    where: {
                        patient_id: patientId
                    }
                });
                if (medicalRecord) {
                    return medicalRecord;
                } else PatientService.produceError('No record found', 404);
            } catch (e) {
                PatientService.produceError('Unable to fetch medical record', 404);
            }
        }
    }, {
        key: "saveMedicalRecord",
        value: async function saveMedicalRecord(body) {
            try {
                return await Medical_Records.create(body);
            } catch (e) {
                console.log('Error', e);
                PatientService.produceError('Unable to create medical record', 404);
            }
        }
        // static async authenticate(request) {
        //     const {
        //         username,
        //         password
        //     } = request.body;
        //     const admin = await Admin.find({
        //         where: {
        //             username: request.body.username
        //         }
        //     });
        //     if (admin) {
        //         if (bcrypt.compareSync(password, admin.password))
        //             return admin;
        //         else AdminService.produceError('Incorrect Passowrd', 203);
        //     } else AdminService.produceError('Admin does not exist', 404);
        // }

    }, {
        key: "produceError",
        value: function produceError(message, status) {
            var err = new Error(message);
            err.status = status;
            throw err;
        }
    }]);

    return PatientService;
}();

exports.default = PatientService;