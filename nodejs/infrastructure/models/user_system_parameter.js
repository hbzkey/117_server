/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_system_parameter', {
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
      name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      parameter: {
        type: "DOUBLE",
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true
      }
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'user_system_parameter'
    });
  };