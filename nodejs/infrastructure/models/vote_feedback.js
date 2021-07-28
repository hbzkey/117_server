/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote_feedback', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vote_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    item_id: {
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
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'vote_feedback'
  });
};
