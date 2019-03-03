import bcrypt from 'bcrypt';
const Patient = require("../data/models").Patient;
const Patient_X_Staff = require("../data/models").Patient_X_Staff;
const Patient_Vitals = require("../data/models").Patient_Vitals;

export default class NurseService {

    static async recordVitals(request) {
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
    static async getAssignedPatients(staffId) {
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
    static produceError(message, status) {
        const err = new Error(message);
        err.status = status;
        throw err;
    }
}