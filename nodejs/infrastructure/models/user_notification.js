/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_notification', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    notification_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_read: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    read_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'user_notification'
  });
};
