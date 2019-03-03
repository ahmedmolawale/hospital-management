"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Patient = require("../data/models").Patient;
var Patient_X_Staff = require("../data/models").Patient_X_Staff;
var Lab_Results = require("../data/models").Lab_Results;

var LabService = function () {
    function LabService() {
        _classCallCheck(this, LabService);
    }

    _createClass(LabService, null, [{
        key: "recordLabResult",
        value: async function recordLabResult(request) {
            try {
                await Lab_Results.create(request.body);
                await Patient_X_Staff.update({
                    completed: 'CLOSED'
                }, {
                    where: {
                        staff_id: request.body.lab_id,
                        patient_id: request.body.patient_id
                    }
                });
            } catch (err) {
                LabService.produceError('Unable to record vitals', 400);
            }
        }
    }, {
        key: "getLabResult",
        value: async function getLabResult(patientId) {
            try {
                return await Lab_Results.findAll({
                    where: {
                        patient_id: patientId
                    }
                });
            } catch (err) {
                LabService.produceError('Unable to get lab results', 400);
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

    return LabService;
}();

exports.default = LabService;