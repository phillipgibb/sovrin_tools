const schemacontroller = require('./../controllers/schema.ctrl')

module.exports = (router) => {

    router
        .route('/schema')
        .get(schemacontroller.getSchema)
    router
        .route('/schemas')
        .get(schemacontroller.getSchemas)
}
