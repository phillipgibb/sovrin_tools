# Sovrin Tools Web App
This is a Reactjs web app that connect to a nodejs server via an api for the purpose of running 
queries on the Sovrin Test Network. It is possible to connect to the Live Network.

## Getting started
Ensure the Node version of at least 10.12.0 is installed
This project requires libindy to be installed: https://github.com/hyperledger/indy-sdk

### Configuration
config.json is the configuration that will be used with config.example.json being a starting point
* poolName : a name for the pool connection to the ledger
* poolGenesisTxnPath : The genesis file points to the Sovrin Test Network. 
* protocolVersion : the protocol version of the network, currently that is 2
* walletName : wallet name as passed in from provision script
* walletKey : wallet key as passed in from provision script
* agentDid : resultant did from provision script - based on seed passed in
* agentVerKey : resultant verykey from provision script - based on seed passed in

## Provision
Your Agent will need to be provisioned, this is done by running the provision script with the following parameter
* seed - the seed that will be used to create the did and keys
* walletKey - the key to secure the indy wallet - do not loose this
* walletName - the name of the indy wallet
The result of this will be the Agent DID and verkey that will be outputed to the console

## Ledgering The Agent onto the Test Network
Once you have specified an agent seed and run the provision script go to the following url and ledger your agent (DID and verkey and email ) 
onto the Sovrin Test Network:
* https://s3.us-east-2.amazonaws.com/evernym-cs/sovrin-STNnetwork/www/trust-anchor.html

## Scripts
* ```npm install``` to load the node_modules
* ```npm run provision``` to create did and verkey from seed e.g. ```npm run provision -- --seed="000000000000000000000000Agent001" --walletKey="1234" --walletName="wallet2"```
* ```npm run start_server``` run the server on port 5000
* ```npm run start_web_app``` run the web app on port 8080
* ```npm run start_dev_watch``` run both concurrently
* Visit `localhost:8080` on your browser


## Build With

* ExpressJS
* WebPack
* Babel
* ReactJS
* Axios
* indy-sdk

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Thanks
* Ethereum Address: 0x61715B3C0DDCA7ED8B3c525C0bDe87d33826698f 

