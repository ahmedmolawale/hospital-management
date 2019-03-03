'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lab_Results = sequelize.define('Lab_Results', {
    patient_id: DataTypes.STRING,
    lab_id: DataTypes.STRING,
    white_blood_cell: DataTypes.STRING,
    red_blood_cell: DataTypes.STRING,
    glucose: DataTypes.STRING,
    heamoglobin: DataTypes.STRING,
    urinalysis: DataTypes.STRING
  });
  return Lab_Results;
};