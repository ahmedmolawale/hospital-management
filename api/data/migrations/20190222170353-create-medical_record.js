'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medical_Records', {
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
      doctor_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Staffs',
          key: 'staff_id',
          as: 'staff_id'
        }
      },
      pregnancy_number: {
        type: Sequelize.STRING
      },
      mode_of_birth: {
        type: Sequelize.STRING
      },
      complication: {
        type: Sequelize.STRING
      },
      genetic_diabetics: {
        type: Sequelize.BOOLEAN
      },
      past_surgery: {
        type: Sequelize.STRING
      },
      others: {
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
    return queryInterface.dropTable('Medical_Records');
  }
};