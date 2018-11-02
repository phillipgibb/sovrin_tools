'use strict';
let regeneratorRuntime = require("regenerator-runtime");

const sdk = require('indy-sdk');
var winston = require('./winston');
const config = require(__dirname+'/../../config.json');

let wallet;

exports.get = async function () {
  if (!wallet) {
    await exports.setup();
  }
  return wallet;
};

exports.setup = async function () {

  try {
    winston.info(`key: ${config.walletKey}`)
    winston.info(`name: ${config.walletName}`)

    await sdk.createWallet(
      { "id": `"${config.walletName}}"` },
      { "key": `"${config.walletKey}}"` }
    );
    wallet = openWallet();
  } catch (e) {
    if (e.message !== "WalletAlreadyExistsError") {
      winston.error(e)
      winston.warn("create wallet failed with message: " + e.message);
      throw e;
    }else{
      wallet = openWallet();
    }
  } 
  
  
};

async function openWallet() {
  winston.info('opening wallet')

  try {
    return await sdk.openWallet(
      { "id": `"${config.walletName}}"` },
      { "key": `"${config.walletKey}}"` }
    );
  } catch (e1) {
    winston.info(`Error Opening Wallet: ${e1}`)
  }
}