/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        // email: {
        //   type: DataTypes.STRING(50),
        //   allowNull: true
        // },
        identity: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        student_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        //school_id: {
        //  type: DataTypes.INTEGER(11),
        //  allowNull: true
        //},
        faculty_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        major_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        school_name: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        faculty_name: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        major_name: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        head_image: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        experience: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        extend_json: {
            type: DataTypes.STRING(2000),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: 'user'
    });
};


// ????????????
// force: true ???????????????????????????????????????
// alter: true ?????????????????????????????????????????????????????????????????????
// User.sync({ alter: true })