/** require dependencies */
const express = require("express")
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
let regeneratorRuntime =  require("regenerator-runtime");
var winston = require('./winston');
var morgan = require('morgan');
// import {setupIndyEnvironment}  from './Sovrin'

const app = express()
const router = express.Router()

let port = 5000 || process.env.PORT

routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('combined', { stream: winston.stream }));
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    // setupAnchors();
});

// async function setupAnchors(){
//   setupIndyEnvironment(process.env.agentSeed)
// }