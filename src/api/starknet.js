import {common} from '@mui/material/colors';
import {promiseHandler} from '@starkware-industries/commons-js-utils';
import {getStarknet} from 'get-starknet-core';
import {
  Account,
  Contract,
  defaultProvider,
  ec,
  json,
  number,
  Provider
} from 'starknet';
import {ActionTypes} from '../constants/action-types';
import {generateRandomHex} from '../utils/generate-random-hex';
import {apiRequest} from './api-request';

const path = process.env.REACT_APP_STARKNET_ALPHA_SERVICE_URL;
const {toBN} = number;

const getAccount = async () => {
  const {account} = await getStarknet().getLastConnectedWallet();
  return account;
  // return new Account(account.provider, account.address, ec.genKeyPair());
};
const providerDeclare = async contractDefinition => {
  const provider = new Provider();
  // const senderAddress = `0x${generateRandomHex(248 / 4)}`;
  const account = await getAccount();
  const senderAddress = account.address;
  const [response, error] = await promiseHandler(
    provider.declareContract(
      {
        contractDefinition,
        senderAddress
      },
      {
        nonce: toBN(1),
        maxFee: toBN(1)
      }
    )
  );
  if (error) {
    return Promise.reject(error);
  }

  return response;
};

const declare = async (contractDefinition, classHash) => {
  const account = await getAccount();
  const [response, error] = await promiseHandler(
    account.declare(
      {contract: contractDefinition, classHash},
      {
        version: toBN(0)
      }
    )
  );

  if (error) {
    console.error(error);
    // return Promise.reject(error);
  }

  return response;
};

const deploy = async (contractDefinition, classHash) => {
  await declare(contractDefinition, classHash);
  return Promise.reject({message: 'error'});
  // const account = await getAccount();
  // const [response, error] = await promiseHandler(
  //   account.deploy({classHash, salt: '12'})
  // );

  // if (error) {
  //   return Promise.reject(error);
  // }
  //
  // console.error(response);
  // return response;
};

const deploy1 = async contractDefinition => {
  let data = {
    type: ActionTypes.DEPLOY,
    contract_address_salt: `0x${generateRandomHex(248 / 4)}`,
    contract_definition: contractDefinition,
    constructor_calldata: []
  };
  const [response, error] = await apiRequest({
    path: `${path}/gateway/add_transaction`,
    method: 'POST',
    data
  });
  if (error) {
    return Promise.reject(error);
  }
  return {
    transactionHash: response.transaction_hash,
    address: response.address
  };
};

export {deploy};
