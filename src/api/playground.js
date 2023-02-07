import {PG_SERVICE_URL} from '../config/envs';
import {ActionTypes} from '../constants/action-types';
import {apiRequest} from './api-request';

const path = PG_SERVICE_URL;

const format = async code => {
  const data = {code, action: ActionTypes.FORMAT};
  const [response, error] = await apiRequest({
    path,
    method: 'POST',
    data
  });
  if (error) {
    return Promise.reject(error);
  }
  return {formattedCode: response.formatted_code};
};

const run = async code => {
  const data = {code, action: ActionTypes.RUN};
  const [response, error] = await apiRequest({
    path,
    method: 'POST',
    data
  });
  if (error) {
    return Promise.reject(error);
  }
  return {output: response.output};
};

const debug = async code => {
  const data = {code, action: ActionTypes.DEBUG};
  const [response, error] = await apiRequest({
    path,
    method: 'POST',
    data
  });
  if (error) {
    return Promise.reject(error);
  }
  return {
    output: response.output,
    trace: response.trace,
    memory: response.memory,
    currentIdentifiers: response.current_identifiers,
    instLocations: response.inst_locations
  };
};

const prove = async code => {
  const data = {code, action: ActionTypes.PROVE};
  const [response, error] = await apiRequest({
    path,
    method: 'POST',
    data
  });
  if (error) {
    return Promise.reject(error);
  }
  return {
    output: response.output,
    encodedCairoPie: response.encoded_cairo_pie,
    programHash: response.program_hash,
    fact: response.fact
  };
};

const compile = async code => {
  const data = {code, action: ActionTypes.COMPILE_CONTRACT};
  const [response, error] = await apiRequest({
    path,
    method: 'POST',
    data
  });
  if (error) {
    return Promise.reject(error);
  }
  return {
    contractAddress: response.address,
    contractDefinition: response.contract_definition
  };
};

export {format, run, debug, prove, compile};
