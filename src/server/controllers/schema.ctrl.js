import {getSchemas, getSchema} from '../Sovrin';
import winston from '../winston';

module.exports = {
  getSchemas: (req, res, next) => {
    getSchemas(req.query.schemaid).then((schemas) => {
      winston.info(`schemas: ${JSON.parse(schemas)}`);
      res.send(`${JSON.parse(schemas)}`);
      next();      
    }).catch((e) =>  {
      winston.error('error:   ' + e);
    });
  },
  getSchema: (req, res, next) => {
    getSchema(req.query.schemaid).then((schema) => {
      res.send(JSON.stringify(schema));
      next();      
    }).catch((e) =>  {
      winston.error('error:   ' + e);
    });
}
}
