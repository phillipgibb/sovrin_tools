const sdk = require("indy-sdk");
const config = require(__dirname+'/../../config.json');
let regeneratorRuntime = require("regenerator-runtime");
var winston = require('./winston');
var wallet = require('./wallet');
var pool = require('./pool');


export let getEndpointForDid = async (did) => {
  try {
    let request = await sdk.buildGetAttribRequest(config.agentDid, did, 'endpoint', null, null);
    let response = await sdk.signAndSubmitRequest(await pool.get(), await wallet.get(), config.agentDid, request);
    if (response && response.result && response.result.data) {
      let json = JSON.parse(response.result.data);
      if (json && json.endpoint.ha) {
        return json.endpoint.ha
      } else {
        return `No endpoint`
      }
    } else {
      return `No endpoint`
    }

  } catch (e1) {
    winston.info(`Error Looking up did attributes: ${e1}`)
    return e1
  }
}

export let getVerkeyForDid = async (did) => {
  try {
    let veryKey = await sdk.keyForDid(await pool.get(), await wallet.get(), did);
    winston.info(veryKey)
    if (veryKey) {
      return veryKey
    } else {
      return `No verkey`
    }

  } catch (e1) {
    winston.info(`Error Looking up did attributes: ${e1}`)
    return e1
  }
}

export let getNymInfo = async (did) => {
  let request = await sdk.buildGetNymRequest(config.agentDid, did);
  winston.info(JSON.stringify(request))
  let response = await sdk.signAndSubmitRequest(await pool.get(), await wallet.get(), config.agentDid, request);
  winston.info(response)
  return response
}

export let getSchemas = async (did) => {
  let filter = `{
    data: {
        submitterDid:${did}
    }
  }`
  let getSchemaRequest = await sdk.buildGetAttribRequest(config.agentDid, did, filter);
  let metadata = await sdk.submitRequest(await pool.get(), getSchemaRequest);

  let schemas = [];
  winston.info(`METADATA->>>>>>>>  ${JSON.stringify(metadata)}`)

  for (let schemaId of metadata.schemas) {
    let schema = await getSchema(config.agentDid, schemaId);
    schemas.push(schema);
  }
  return schemas;
};

export let getSchema = async (schemaId) => {
  let getSchemaRequest = await sdk.buildGetSchemaRequest(config.agentDid,  await wallet.get(), config.agentDid, schemaId);
  let getSchemaResponse = await sdk.signAndSubmitRequest(await pool.get(), getSchemaRequest);
  let [, schema] = await sdk.parseGetSchemaResponse(getSchemaResponse);
  return schema;
};


export let getCredDefByTag = async (did, credDefTag) => {
  let credDefs = await getEndpointDidAttribute(did, 'credential_definitions');
  for (let credDef of credDefs) {
    if (credDef.tag === credDefTag) {
      return credDef;
    }
  }
};

export let getEndpointDidAttribute = async (did, attribute) => {
  let metadata = await sdk.getDidMetadata(await wallet.get(), did);
  metadata = JSON.parse(metadata);
  return metadata[attribute];
};

export let getCredentialDefinition = async (cdid) => {
  try{
    let getCdRequest = await sdk.buildGetCredDefRequest(config.agentDid, cdid);
    let getCdResponse =  await sdk.signAndSubmitRequest(await pool.get(),  await wallet.get(), config.agentDid, getCdRequest);
    let [,cred] = await sdk.parseGetCredDefResponse(getCdResponse);
    return cred
  } catch (e1) {
    winston.info(`Error getCredentialDefinition: ${e1}`)
    return e1
  }
};

export let getCredentialDefinitions = async () => {
  try {
    let [sh, count] = await sdk.proverSearchCredentials(await wallet.get(), {});
    let creds = await sdk.proverFetchCredentials(sh,count);
    for (let index = 0; index < count; index++) {
      winston.info(creds[index]);
    }
  } catch (e1) {
    winston.info(`Error getCredentialDefinitions: ${e1}`)
    return e1

  }
};