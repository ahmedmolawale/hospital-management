'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      staff_id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      phone_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      highest_qualification: {
        type: Sequelize.STRING
      },
      previous_employer: {
        type: Sequelize.STRING
      },
      mdcn: {
        type: Sequelize.STRING
      },
      license_to_practice: {
        type: Sequelize.STRING
      },
      marital_status: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      state_of_origin: {
        type: Sequelize.STRING
      },
      next_of_kin_name: {
        type: Sequelize.STRING
      },
      next_of_kin_phone_number: {
        type: Sequelize.STRING
      },
      next_of_kin_relationship: {
        type: Sequelize.STRING
      },
      next_of_kin_occupation: {
        type: Sequelize.STRING
      },
      next_of_kin_address: {
        type: Sequelize.STRING
      },
      role: {
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
    return queryInterface.dropTable('staffs');
  }
};