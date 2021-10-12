module.exports = (sequelize, DataTypes) => {
    const Cigar = sequelize.define("Cigar", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
    });
    
    return Cigar
}