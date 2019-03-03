// import 'dotenv/config';
import express from 'express';
import {json, urlencoded} from 'body-parser';
import logger from 'morgan';
import cors from 'cors';


//Resource
import AdminResource from './api/rest/admin/AdminResource'; 
import PatientResource from './api/rest/patient/PatientResource'; 
import StaffResource from './api/rest/staff/StaffResource'; 
import NurseResource from './api/rest/nurse/NurseResource'; 
import DoctorResource from './api/rest/doctor/DoctorResource';
import LabAttendantResource from './api/rest/lab/LabAttendantResource'; 


const app = express();

app.use(json());
app.use(cors());
app.use(logger('dev'));
app.use(urlencoded({
    extended: true
}));

app.use('/api/v1', AdminResource);
app.use('/api/v1', PatientResource);
app.use('/api/v1', StaffResource);
app.use('/api/v1', NurseResource);
app.use('/api/v1', DoctorResource);
app.use('/api/v1', LabAttendantResource);

app.use((request, response, next) => {
    let error = new Error('Invalid Resource');
    error.status = 400;
    next(error);
});

// setup custom error handler
app.use((err, request, response, next) => {
    console.log(err);
    response.status(err.status || 400);
    response.json({
        message: err.message
    });
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});

