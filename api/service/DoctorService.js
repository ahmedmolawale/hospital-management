import bcrypt from 'bcrypt';
const Patient = require("../data/models").Patient;
const Patient_X_Staff = require("../data/models").Patient_X_Staff;
const Patient_Vitals = require("../data/models").Patient_Vitals;

//Medical Report contains vitals, lab result, diagnosis, report of treatment, and appointment (Created appointment)
export default class DoctorService {

    static async assignLabToPatient(request) {
        try {
            request.body.completed = 'OPEN';
            return await Patient_X_Staff.create(request.body);
        } catch (err) {
            DoctorService.produceError('Unable to post assignment', 400);
        }
    }

    static async getAssignedPatients(staffId) {
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
    static produceError(message, status) {
        const err = new Error(message);
        err.status = status;
        throw err;
    }
}