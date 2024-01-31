const customer = (sequelize, DataTypes)=> {

    const Customer = sequelize.define('Customer', {

        Name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          SecondName: {
            type: DataTypes.STRING,
            allowNull: true,
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