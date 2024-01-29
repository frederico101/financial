const customer = (sequelize, DataTypes)=> {

    const Customer = sequelize.define('Customer', {

        Name: {
            type: DataTypes.STRING
        },
        SecondName: {
            type: DataTypes.STRING
        }

    })

    return Customer;
}

module.exports = customer