'use strict';

require('dotenv/config');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _AdminResource = require('./api/rest/admin/AdminResource');

var _AdminResource2 = _interopRequireDefault(_AdminResource);

var _PatientResource = require('./api/rest/patient/PatientResource');

var _PatientResource2 = _interopRequireDefault(_PatientResource);

var _StaffResource = require('./api/rest/staff/StaffResource');

var _StaffResource2 = _interopRequireDefault(_StaffResource);

var _NurseResource = require('./api/rest/nurse/NurseResource');

var _NurseResource2 = _interopRequireDefault(_NurseResource);

var _DoctorResource = require('./api/rest/doctor/DoctorResource');

var _DoctorResource2 = _interopRequireDefault(_DoctorResource);

var _LabAttendantResource = require('./api/rest/lab/LabAttendantResource');

var _LabAttendantResource2 = _interopRequireDefault(_LabAttendantResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Resource
var app = (0, _express2.default)();

app.use((0, _bodyParser.json)());
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));
app.use((0, _bodyParser.urlencoded)({
    extended: true
}));

app.use('/api/v1', _AdminResource2.default);
app.use('/api/v1', _PatientResource2.default);
app.use('/api/v1', _StaffResource2.default);
app.use('/api/v1', _NurseResource2.default);
app.use('/api/v1', _DoctorResource2.default);
app.use('/api/v1', _LabAttendantResource2.default);

app.use(function (request, response, next) {
    var error = new Error('Invalid Resource');
    error.status = 400;
    next(error);
});

// setup custom error handler
app.use(function (err, request, response, next) {
    console.log(err);
    response.status(err.status || 400);
    response.json({
        message: err.message
    });
});

app.listen(process.env.PORT, function () {
    console.log('App listening on port ' + process.env.PORT);
});