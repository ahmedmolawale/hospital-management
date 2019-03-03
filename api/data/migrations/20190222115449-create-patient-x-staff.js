'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patient_X_Staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Patients',
          key: 'patient_id',
          as: 'patient_id'
        }
        
      },
      staff_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Staffs',
          key: 'staff_id',
          as: 'staff_id'
        }
      },
      completed: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patient_X_Staffs');
  }
};