'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var Staff = sequelize.define('Staff', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    dob: DataTypes.STRING,
    highest_qualification: {
      type: DataTypes.STRING
    },
    previous_employer: {
      type: DataTypes.STRING
    },
    marital_status: {
      type: DataTypes.STRING
    },
    mdcn: {
      type: DataTypes.STRING
    },
    license_to_practice: {
      type: DataTypes.STRING
    },
    email_address: {
      type: DataTypes.STRING
    },
    nationality: {
      type: DataTypes.STRING
    },
    state_of_origin: {
      type: DataTypes.STRING
    },
    staff_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    next_of_kin_name: {
      type: DataTypes.STRING
    },
    next_of_kin_phone_number: {
      type: DataTypes.STRING
    },
    next_of_kin_relationship: {
      type: DataTypes.STRING
    },
    next_of_kin_occupation: {
      type: DataTypes.STRING
    },
    next_of_kin_address: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    }
  });
  Staff.hook('beforeCreate', function (staff, options) {
    if (staff.password) staff.password = _bcrypt2.default.hashSync(staff.password, 10);
  });
  Staff.hook('beforeBulkUpdate', function (staff, options) {
    var password = staff.attributes.password;

    if (password) {
      staff.attributes.password = _bcrypt2.default.hashSync(password, 10);
    }
  });
  return Staff;
};