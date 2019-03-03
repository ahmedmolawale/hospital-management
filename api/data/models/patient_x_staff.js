'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patient_X_Staff = sequelize.define('Patient_X_Staff', {
    patient_id: DataTypes.STRING,
    staff_id: DataTypes.STRING,
    completed: DataTypes.STRING
  });
  
  return Patient_X_Staff;
};