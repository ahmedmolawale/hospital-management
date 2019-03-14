import bcrypt from 'bcrypt';
import {
    sendEmail
} from '../util/Utility';
const Admin = require("../data/models").Admin;
const Staff = require("../data/models").Staff;
const Patient_X_Staff = require("../data/models").Patient_X_Staff;


export default class AdminService {

    static async createAdmin(request) {
        try {
            request.body.staff_id = Date.now().toString();
            request.body.role = 'admin';
            request.body.password = (Math.random() + 1).toString(36).substring(7);
            console.log('Password is ', request.body.password)
            const staff =  await Staff.create(request.body);
            const subject = 'Welcome Onboard';
            const message = `Hello ${request.body.first_name}, \nYou have just been setup as an admin on Maternity System.\nSee you login credentials below:\nStaff Id: ${request.body.staff_id}\nPassword: ${request.body.password}\nPlease login at https://mhs.herokuapps.com/nurse \n\nAccept our esteemed assurances.`;
            sendEmail(subject, message, request.body.email_address);
            return staff;
        } catch (err) {
            AdminService.produceError('Unable to create admin', 400);
        }
    }
    static async assignNurseToPatient(request) {
        try {
            request.body.completed = 'OPEN';
            return await Patient_X_Staff.create(request.body);
        } catch (err) {
            AdminService.produceError('Unable to post assignment', 400);
        }
    }
    static async authenticate(request) {
        const {
            username,
            password
        } = request.body;
        const admin = await Admin.find({
            where: {
                username: request.body.username
            }
        });
        if (admin) {
            if (bcrypt.compareSync(password, admin.password))
                return admin;
            else AdminService.produceError('Incorrect Passowrd', 203);
        } else AdminService.produceError('Admin does not exist', 404);
    }
    static produceError(message, status) {
        const err = new Error(message);
        err.status = status;
        throw err;
    }
}