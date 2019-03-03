'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patient_Vitals', {
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
      nurse_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Staffs',
          key: 'staff_id',
          as: 'staff_id'
        }
      },
      doctor_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Staffs',
          key: 'staff_id',
          as: 'staff_id'
        }
      },
      blood_pressure: {
        type: Sequelize.STRING
      },
      temprature: {
        type: Sequelize.STRING
      },
      pulse: {
        type: Sequelize.STRING
      },
      weight: {
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
    return queryInterface.dropTable('Patient_Vitals');
  }
};