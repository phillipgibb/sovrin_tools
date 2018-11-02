const credentialdefinitions = require('../controllers/credentials.ctrl')

module.exports = (router) => {

    router
        .route('/credentialdefinitions')
        .get(credentialdefinitions.getCredentialDefinitions)
    router
        .route('/credentialdefinition')
        .get(credentialdefinitions.getCredentialDefinition)
}
