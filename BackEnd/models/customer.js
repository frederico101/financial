const customer = (sequelize, DataTypes)=> {

    const Customer = sequelize.define('Customer', {

        Name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          Latitude: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Longitude: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
          },
    },
       {
          tableName: 'customer'
       })

    return Customer;
}

module.exports = customer