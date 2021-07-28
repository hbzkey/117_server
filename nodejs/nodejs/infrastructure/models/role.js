/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    creator: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updater: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    is_delete: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'role'
  });
};
