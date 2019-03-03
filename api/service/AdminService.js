import bcrypt from 'bcrypt';
const Admin = require("../data/models").Admin;
const Patient_X_Staff = require("../data/models").Patient_X_Staff;

export default class AdminService {

    static async createAdmin(request) {
        try {
            return await Admin.create(request.body);
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