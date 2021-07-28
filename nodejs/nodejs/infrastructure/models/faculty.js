/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('faculty', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        school_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'faculty'
    });
};