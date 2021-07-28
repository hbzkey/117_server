/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experience_setting', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'experience_setting'
  });
};
