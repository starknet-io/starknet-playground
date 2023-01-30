import {promiseHandler} from '@starkware-industries/commons-js-utils';
import {getStarknet} from 'get-starknet-core';

const getAccount = async () => {
  const {account} = await getStarknet().getLastConnectedWallet();
  return account;
};

const declareDeploy = async ({contract, classHash}) => {
  const account = await getAccount();

  const [response, error] = await promiseHandler(
    account.declareDeploy({
      contract,
      classHash
    })
  );

  if (error) {
    return Promise.reject(error);
  }

  const {
    transaction_hash: transactionHash,
    contract_address: contractAddress
  } = response.deploy;

  return {
    transactionHash,
    contractAddress
  };
};

export {declareDeploy};
