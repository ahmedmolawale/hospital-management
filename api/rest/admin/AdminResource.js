import {
    Router
} from 'express';
import validate from 'express-validation';
import {
    login,
    admin
} from './Util';
import AdminService from '../../service/AdminService';

const router = Router();

router.post('/admin/login', validate(login), (request, response, next) => {
    AdminService.authenticate(request)
        .then(result => {
            response.status(200);
            result.role = 'admin';
            response.json(result);
        }).catch(err => next(err));
});

router.post('/admin/create', validate(admin), (request, response, next) => {
    AdminService.createAdmin(request)
        .then(result => {
            response.status(201);
            response.json(result);
        }).catch(err => next(err));
});

export default router;