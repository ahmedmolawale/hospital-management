
const Patient = require("../data/models").Patient;
const Patient_X_Staff = require("../data/models").Patient_X_Staff;
const Lab_Results = require("../data/models").Lab_Results;

export default class LabService {

    static async recordLabResult(request) {
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

    static async getLabResult(patientId){
        try{
           return await Lab_Results.findAll({
                where: {
                    patient_id: patientId
                }
            });
        }catch(err){
            LabService.produceError('Unable to get lab results', 400);
        }
    }
    static produceError(message, status) {
        const err = new Error(message);
        err.status = status;
        throw err;
    }
}