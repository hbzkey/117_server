/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_permission', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    permission_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'role_permission'
  });
};
