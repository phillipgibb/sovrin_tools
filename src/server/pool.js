
'use strict';
let regeneratorRuntime = require("regenerator-runtime");

const sdk = require('indy-sdk');
const config = require(__dirname+'/../../config.json');
var winston = require('./winston');
var path = require('path');

let pool;

exports.get = async function () {
  if (!pool) {
    await exports.setup();
  }
  return pool;
};

exports.setup = async function () {
  winston.info(`PoolName: ${config.poolName}`);
  let poolconfig = path.resolve(`${__dirname}/../../${config.poolGenesisTxnPath}`);
  winston.info(`protocolVersion: ${Number(config.protocolVersion)}`);
  winston.info(`poolconfig: ${poolconfig}`);

  let poolConfig = {
    genesis_txn: poolconfig
  };
  try {
    await sdk.createPoolLedgerConfig(config.poolName, poolConfig);
  } catch (e) {
    if (e.message !== "PoolLedgerConfigAlreadyExistsError") {
      throw e;
    }
  } finally {
    winston.info('Opening Pool Ledger')
    try {
      await sdk.setProtocolVersion(Number(config.protocolVersion));
      pool = await sdk.openPoolLedger(config.poolName);
    } catch (e1) {
      winston.info(`Error Opening Pool Ledger: ${e1}`)
    }
  }
}