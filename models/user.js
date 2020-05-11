const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-zA-Z]{64}$/i,
            len: [8],
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        }
    });

    User.associate = (models)=>{
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook("beforeCreate", function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;

};