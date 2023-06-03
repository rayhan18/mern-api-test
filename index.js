//https://www.youtube.com/watch?v=vu9dUL_pZts&list=PLyrs5AgsUPcVkewEkaIA_VPgpPi721jD6
const express = require('express');

const {dbConnection} = require('./db/dbconection')
const routes = require('./routes/routes')
const usersRoutes = require('./routes/users')


const PORT = 5000;
const homerouter = require('./routes/indexRoute')
const app = express();
//database connection
dbConnection()

//middleware for
app.use(express.json());


app.use('/', homerouter)

app.use('/pro',routes)
app.use('/users', usersRoutes)

app.use('*', (req,res)=>{
    res.send('not found');
})

app.listen(PORT, ()=>{
    console.log('Express server listening on port')
})