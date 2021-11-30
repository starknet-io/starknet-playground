import {ActionTypes} from '../constants/action-types';
import {generateRandomHex} from '../utils/generate-random-hex';
import {apiRequest} from './api-request';

const path = process.env.REACT_APP_STARKNET_ALPHA_SERVICE_URL;

const addTransaction = async contractDefinition => {
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

export {addTransaction};
