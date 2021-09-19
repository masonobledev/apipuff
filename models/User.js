module.exports = (sequelize, DataTypes) => {
 
    const User = sequelize.define("User", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Gotta give us a name!' },
                notEmpty: { msg: 'No shooting blanks here!' }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Family name please...' },
                notEmpty: { msg: 'No shooting blanks here either!' }
            }
        },
        DOB: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: { msg: 'You know the drill...' },
                notEmpty: { msg: 'Nope - gotta give us somethin' }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Everybody has an email address' },
                notEmpty: { msg: 'Unh-unh' }
            }
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
            allowNull: false,
            validate: {
                notNull: { msg: 'Who are you?' },
                notEmpty: { msg: 'No shooting blanks here either!' }
            }
        },
                
        });


    return User
}