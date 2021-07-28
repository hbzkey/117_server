/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dictionary_detail', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dictionary_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    keyword: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    is_default: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'dictionary_detail'
  });
};
