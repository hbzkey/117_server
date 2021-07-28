/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_homework', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    clas_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    homework_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'user_homework'
  });
};
