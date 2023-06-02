
const routes = require('../routes/routes')

routes.get('/', (req,res)=>{
    res.status(200).send(' welcome');
})


routes.get('*', (req,res)=>{
    res.send('not found');
})

module.exports = routes;