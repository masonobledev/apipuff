module.exports = (sequelize, DataTypes) => {
    const Bar = sequelize.define("Bar", {
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER
        },
        desc: {
            type: DataTypes.STRING
        }
    });
    
    return Bar
}