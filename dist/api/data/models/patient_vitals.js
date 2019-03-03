'use strict';

module.exports = function (sequelize, DataTypes) {
  var Patient_Vitals = sequelize.define('Patient_Vitals', {
    patient_id: DataTypes.STRING,
    nurse_id: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    blood_pressure: DataTypes.STRING,
    temprature: DataTypes.STRING,
    pulse: DataTypes.STRING,
    weight: DataTypes.STRING
  });
  return Patient_Vitals;
};