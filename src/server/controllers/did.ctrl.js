import {getEndpointForDid, getVerkeyForDid, getNymInfo} from '../Sovrin';
import winston from '../winston';

module.exports = {
    getDidInfo: (req, res, next) => {
      
      getEndpointForDid(req.query.did).then((endpoint) => {

        getVerkeyForDid(req.query.did).then((verKey) => {
          res.send(`{"did": "${req.query.did}", "endpoint": "${endpoint}", "verkey": "${verKey}"}`);
          next();      
        });        
      }).catch((e) =>  {
        winston.log('error:   ' + e);
      });
  
    },
    getNymInfo: (req, res, next) => {
      
      getNymInfo(req.query.did).then((response) => {
        res.send(`{"did": "${req.query.did}", "info": ${JSON.stringify(response)}}`);
        next();      
      }).catch((e) =>  {
        winston.log('error:   ' + e);
      });
  
    }

}
