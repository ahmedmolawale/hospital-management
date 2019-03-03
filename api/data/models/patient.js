'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patient = sequelize.define('Patient', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.DATE,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    occupation: {
      type: DataTypes.STRING
    },
    patient_id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
  });
  Patient.associate = (models) => {
        Patient.hasMany(models.Patient_X_Staff, {
          foreignKey: 'patient_id',
          as: 'assignments'
        });
        Patient.hasMany(models.Patient_Vitals, {
          foreignKey: 'patient_id',
          as: 'assigned'
        });
      };
  return Patient;
};