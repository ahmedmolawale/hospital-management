import bcrypt from 'bcrypt';
const Patient = require("../data/models").Patient;
const Medical_Records = require("../data/models").Medical_Records;
const Patient_X_Staff = require("../data/models").Patient_X_Staff;

export default class PatientService {

    static async createAPatient(request) {
        let patient = null;
        try {
            //get current time
            request.body.patient_id = Date.now().toString();
            patient = await Patient.create(request.body);
        } catch (err) {
            console.log('Error is ', err)
            PatientService.produceError('Unable to create patient', 400);
        }
        if (patient) return patient;
        PatientService.produceError('Unable to create patient', 400);
    }
    static async fetchPatients() {
        try {
            let patients = await Patient.findAll({
                include: [{
                    model: Patient_X_Staff,
                    as: 'assignments',
                    attributes: ['completed']
                }],
            });
            return patients.map((patient, index) => {
                const a = patient.assignments.find(a => {
                    return a.completed === 'OPEN';
                });
                console.log('I saw ', a);
                if (a)
                    patient.dataValues.available = false;
                else
                    patient.dataValues.available = true;
                patient.dataValues.assignments = undefined;
                return patient;
            });

        } catch (err) {
            console.log('Error is ', err);
            PatientService.produceError('Unable to fetch patient', 400);
        }
    }
    
    static async getMedicalRecord(patientId){
        
        try{
            const medicalRecord = await Medical_Records.find({
                where:{
                    patient_id: patientId
                }
            });
            if(medicalRecord){
                return medicalRecord;
            }else
                PatientService.produceError('No record found', 404);
        }catch(e){
            PatientService.produceError('Unable to fetch medical record', 404);
        }
    }
    static async saveMedicalRecord(body){
        try{
            return await Medical_Records.create(body);
        }catch(e){
            console.log('Error' , e);
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
    static produceError(message, status) {
        const err = new Error(message);
        err.status = status;
        throw err;
    }
}