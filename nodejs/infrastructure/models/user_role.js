/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_role', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    role_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'user_role'
  });
};
