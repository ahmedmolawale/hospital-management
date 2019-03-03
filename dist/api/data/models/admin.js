'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING
  });
  Admin.hook('beforeCreate', function (admin, options) {
    if (admin.password) admin.password = _bcrypt2.default.hashSync(admin.password, 10);
  });
  Admin.hook('beforeBulkUpdate', function (admin, options) {
    var password = admin.attributes.password;

    if (password) {
      admin.attributes.password = _bcrypt2.default.hashSync(password, 10);
    }
  });
  return Admin;
};