const didcontroller = require('./../controllers/did.ctrl')

module.exports = (router) => {

    router
        .route('/did')
        .get(didcontroller.getDidInfo)
    router
        .route('/nym')
        .get(didcontroller.getNymInfo)
}
