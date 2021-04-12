/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('class', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      class_number: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      class_image: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      course: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      semester: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
     
      faculty_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      major_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      is_school_plan: {
        type: DataTypes.INTEGER(1),
        allowNull: true
      },
      extend_json: {
        type: DataTypes.STRING(2000),
        allowNull: true
      }
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'class'
    });
  };
  