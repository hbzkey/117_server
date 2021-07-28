/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_class', {
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
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    grade: {
      type: "DOUBLE",
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'user_class'
  });
};
