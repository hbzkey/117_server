/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('experience_log', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // name: {
        //     type: DataTypes.STRING(50),
        //     allowNull: true
        // },
        class_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        system_parameter_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        experience: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        extend_json: {
            type: DataTypes.STRING(2000),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'experience_log'
    });
};