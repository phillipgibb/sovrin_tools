import {refresh} from '../Sovrin';
import winston from '../winston';

module.exports = {
    refresh: (req, res, next) => {
      const [agentDid, agentVerKey] = refresh()
        let json = `{agentDid: ${agentDid}, agentVerKey: ${agentVerKey}}`
        winston.info(`json: ${json}`);
        res.send(json);
        next();      
    }
}
