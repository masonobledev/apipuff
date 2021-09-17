module.exports = (sequelize, DataTypes) => {
    const Cigar = sequelize.define("Cigar", {
        brand: {
            type: DataTypes.STRING
        },
        profile: {
            type: DataTypes.STRING
        },
        shape: {
            type: DataTypes.STRING
        },
        wrapper: {
            type: DataTypes.STRING
        },
        origin: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER
        }
    });
    
    return Cigar
}