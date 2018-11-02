const refreshcontroller = require('../controllers/refresh.ctrl')

module.exports = (router) => {
    router
        .route('/refresh')
        .get(refreshcontroller.refresh);
}
