'use strict';

module.exports = function (sequelize, DataTypes) {
  var Medical_Records = sequelize.define('Medical_Records', {
    patient_id: DataTypes.STRING,
    doctor_id: DataTypes.STRING,
    others: DataTypes.STRING,
    pregnancy_number: DataTypes.STRING,
    genetic_diabetics: DataTypes.BOOLEAN,
    past_surgery: DataTypes.STRING,
    mode_of_birth: DataTypes.STRING,
    complication: DataTypes.STRING
  });
  return Medical_Records;
};