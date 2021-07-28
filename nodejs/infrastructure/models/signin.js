/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('signin', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    distance: {
      type: "DOUBLE",
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    longitude: {
      type: "DOUBLE",
      allowNull: true
    },
    latitude: {
      type: "DOUBLE",
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
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'signin'
  });
};
