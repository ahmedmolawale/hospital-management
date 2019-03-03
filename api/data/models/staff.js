'use strict';
import bcrypt from 'bcrypt';
module.exports = (sequelize, DataTypes) => {
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
    },
  });
  Staff.hook('beforeCreate', (staff, options) => {
    if (staff.password)
      staff.password = bcrypt.hashSync(staff.password, 10);
  });
  Staff.hook('beforeBulkUpdate', (staff, options) => {
    const {
      password
    } = staff.attributes;
    if (password) {
      staff.attributes.password = bcrypt.hashSync(password, 10);
    }
  });
  return Staff;
};