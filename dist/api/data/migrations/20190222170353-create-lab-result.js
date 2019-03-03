'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Lab_Results', {
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
      lab_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Staffs',
          key: 'staff_id',
          as: 'staff_id'
        }
      },
      white_blood_cell: {
        type: Sequelize.STRING
      },
      red_blood_cell: {
        type: Sequelize.STRING
      },
      glucose: {
        type: Sequelize.STRING
      },
      heamoglobin: {
        type: Sequelize.STRING
      },
      urinalysis: {
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Lab_Results');
  }
};