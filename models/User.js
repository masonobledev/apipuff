module.exports = (sequelize, DataTypes) => {
 
    const User = sequelize.define("User", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Give us an alias' },
                notEmpty: { msg: 'Yes you have to' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Lock all your doors' },
                notEmpty: { msg: 'This one is kinda important' }
            }
        }, 
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
                
        });


    return User
}