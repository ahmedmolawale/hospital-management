import bcrypt from 'bcrypt';
import {
    sendEmail
} from '../util/Utility';
const Staff = require("../data/models").Staff;
const ROLES = ['nurse', 'lab-attendant', 'doctor']

export default class StaffService {


    static async authenticate(request) {
        const {
            staff_id,
            password
        } = request.body;
        const staff = await Staff.find({
            where: {
                staff_id
            }
        });
        if (staff) {
            if (bcrypt.compareSync(password, staff.password))
                return staff.role;
            else StaffService.produceError('Incorrect Passowrd', 203);
        } else StaffService.produceError('Staff does not exist', 404);
    }

    static async createStaffNurse(request) {
        try {
            request.body.staff_id = Date.now().toString();
            request.body.role = ROLES[0];
            request.body.password = (Math.random() + 1).toString(36).substring(7);
            console.log('Password is ', request.body.password);
            const staff =  await Staff.create(request.body);
            const subject = 'Welcome Onboard';
            const message = `Hello ${request.body.first_name}, \nYou have just been setup as a nurse on Maternity System.\nSee you login credentials below:\nStaff Id: ${request.body.staff_id}\nPassword: ${request.body.password}\nPlease login at https://mhs.herokuapps.com/nurse \n\nAccept our esteemed assurances.`;
            sendEmail(subject, message, request.body.email_address);
            return staff;
        } catch (err) {
            console.log('Error is ', err);
            StaffService.produceError('Unable to create nurse', 400);
        }
    }
    static async createStaffDoctor(request) {
        try {
            request.body.staff_id = Date.now().toString();
            request.body.role = ROLES[2];
            request.body.password = (Math.random() + 1).toString(36).substring(7);
            console.log('Password is ', request.body.password);
            const staff = await Staff.create(request.body);
            const subject = 'Welcome Onboard';
            const message = `Hello ${request.body.first_name}, \nYou have just been setup as a doctor on Maternity System.\nSee you login credentials below:\nStaff Id: ${request.body.staff_id}\nPassword: ${request.body.password}\nPlease login at https://mhs.herokuapps.com/doctor \n\nAccept our esteemed assurances.`;
            sendEmail(subject, message, request.body.email_address);
            return staff;
        } catch (err) {
            console.log('Error is ', err);
            StaffService.produceError('Unable to create nurse', 400);
        }
    }
    static async createStaffLab(request) {
        try {
            request.body.staff_id = Date.now().toString();
            request.body.role = ROLES[1];
            request.body.password = (Math.random() + 1).toString(36).substring(7);
            const staff = await Staff.create(request.body);
            const subject = 'Welcome Onboard';
            const message = `Hello ${request.body.first_name}, \nYou have just been setup as a lab assistant on Maternity System.\nSee you login credentials below:\nStaff Id: ${request.body.staff_id}\nPassword: ${request.body.password}\nPlease login at https://mhs.herokuapps.com/lab \n\nAccept our esteemed assurances.`;
            sendEmail(subject, message, request.body.email_address);
            return staff;
        } catch (err) {
            console.log('Error is ', err);
            StaffService.produceError('Unable to create nurse', 400);
        }
    }
    static async fetchNurses() {
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
    static async fetchLabAttendants() {
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
    static async fetchDoctors() {
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
    static produceError(message, status) {
        const err = new Error(message);
        err.status = status;
        throw err;
    }
}