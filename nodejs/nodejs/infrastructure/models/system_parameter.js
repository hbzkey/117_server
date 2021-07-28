/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('system_parameter', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
      },
      extend_json: {
        type: DataTypes.STRING(2000),
        allowNull: true
      }
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'system_parameter'
    });
  };