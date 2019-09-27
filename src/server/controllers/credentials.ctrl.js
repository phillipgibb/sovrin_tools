import {getCredentialDefinitions, getCredentialDefinition} from '../Sovrin';
import winston from '../winston';

module.exports = {
  getCredentialDefinitions: (req, res, next) => {
      
    getCredentialDefinitions().then(() => {
      res.send(`done`);
      next();      
    }).catch((e) =>  {
      winston.log('error:   ' + e);
    });
  
  },
  getCredentialDefinition: (req, res, next) => {
      
    getCredentialDefinition(req.query.cdid).then((cd) => {
   
      res.send(cd.result);
      next();      
    }).catch((e) =>  {
      winston.log('error:   ' + e);
      res.send(`{${e}}`);
      // next();      
    });
  }
}
