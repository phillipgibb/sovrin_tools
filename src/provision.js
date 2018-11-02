var config = require(__dirname+'/../config.json');
const wallet = require('./server/wallet');
let regeneratorRuntime = require("regenerator-runtime");
var winston = require('./server/winston');
const sdk = require('indy-sdk');
var minimist = require('minimist');
var parseArgs = minimist(process.argv.slice(2));
var fs = require('fs');


export let provision = async (seed, walletName, walletKey) => {
  try {
    try {
      winston.info("Adding agent with seed: " + seed);
      config.walletKey = walletKey;
      config.walletName = walletName;

      [config.agentDid, config.agentVerKey] = await setupAgent(seed, "AGENT");
      winston.info(`->>>>>>>>>>>>> CWD:  ${process.cwd()}`)
      winston.info(`->>>>>>>>>>>>> config:  ${JSON.stringify(config)}`)

      fs.writeFile(__dirname+'/../config.json', JSON.stringify(config, null, 2), function (err) {
        if (err) throw err;
        console.log('config file updated!');
        winston.info(`{did: ${config.agentDid}, verKey: ${config.agentVerKey}}`);
        process.exit(0);
      });
      
    } catch (e) {
      winston.warn(`addAgent error ${e}`)
      process.exit(1);
    }

  } catch (error) {
    winston.error(error);
    process.exit(1);
  };
    

}

async function setupAgent(seed, role) {

  let didInfo = {
    seed
  };
  let didMeta = JSON.stringify({
    role: role
  });
  let did
  let verKey
  try {
    [did, verKey] = await sdk.createAndStoreMyDid(await wallet.get(), didInfo);
    await sdk.setDidMetadata(await wallet.get(), did, didMeta);

  } catch (e) {
    if (e.message !== "DidAlreadyExistsError") {
      winston.warn("createAndStoreMyDid failed with message: " + e.message);
      throw e;
    }
    winston.info(role + " DID already exists");

    let dids = await sdk.listMyDidsWithMeta(await wallet.get());
    for (let didinfo of dids) {
      let meta = JSON.parse(didinfo.metadata);
      winston.info(`metadata = ${didinfo.metadata} for DID ${didinfo.did}`);

      if (meta && meta.role && meta.role === role) {
        winston.info(`DID = ${didinfo.did}`);
        winston.info(`ROLE = ${role}`);

        did = didinfo.did;
        verKey = didinfo.verkey;
      }
    }
  } finally {
    return [did, verKey]
  }
}

provision(parseArgs.seed, parseArgs.walletName, parseArgs.walletKey)