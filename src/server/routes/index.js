const didlookup = require('./didlookup')
const schemalookup = require('./schemalookup')
const credentialdefinitionslookup = require('./credentialdefinitionslookup')
const refresh = require('./refresh')

module.exports = (router) => {
    didlookup(router)
    schemalookup(router)
    credentialdefinitionslookup(router)
    refresh(router)

}