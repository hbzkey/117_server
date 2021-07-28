/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permission', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    parent_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    is_menu: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_page: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_button: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(500),
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
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updater: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    is_delete: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    extend_json: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'permission'
  });
};
