/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    experience_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_show_now: {
      type: DataTypes.INTEGER(1),
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
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'vote'
  });
};
