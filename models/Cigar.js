module.exports = (sequelize, DataTypes) => {
    const Cigar = sequelize.define("Cigar", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shape: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wrapper: {
            type: DataTypes.STRING,
            allowNull: false
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    return Cigar
}