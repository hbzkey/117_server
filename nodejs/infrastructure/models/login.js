module.exports = function(sequelize, DataTypes) {
    return sequelize.define('login', {
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
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      phone_password: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
   
  
      extend_json: {
        type: DataTypes.STRING(2000),
        allowNull: true
      }
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'login'
    });
  };
  