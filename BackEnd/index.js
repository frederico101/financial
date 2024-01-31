const express = require('express');
const app = express();

const routers = require('./api')
const { sequelize } = require('./models')

app.use(express.json())
app.use('/', routers)

sequelize.sync().then(()=>{
    console.log('CONNECTED')
})



app.listen(3000, () => {
    console.log('SERVER RUNNING')
});