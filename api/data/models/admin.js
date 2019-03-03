'use strict';
import bcrypt from 'bcrypt';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING
  });
  Admin.hook('beforeCreate', (admin, options) => {
    if (admin.password)
      admin.password = bcrypt.hashSync(admin.password, 10);
  });
  Admin.hook('beforeBulkUpdate', (admin, options) => {
    const {
      password
    } = admin.attributes;
    if (password) {
      admin.attributes.password = bcrypt.hashSync(password, 10);
    }
  });
  return Admin;
};