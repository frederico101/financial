const express = require('express');
const server = express();

const {sequelize} = require('./models')

server.get('/', (req, res) => {

    return res.json({mensagem: 'nserver api working nice'});

});

sequelize.sync().then(()=>{
    console.log('conected')
})


server.listen(3000, () => {
    console.log('servidor ok')
});