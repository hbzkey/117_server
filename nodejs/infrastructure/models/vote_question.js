/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote_question', {
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
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'vote_question'
  });
};
