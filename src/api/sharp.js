import {SHARP_SERVICE_URL} from '../config/envs';
import {ActionTypes} from '../constants/action-types';
import {apiRequest} from './api-request';

const path = SHARP_SERVICE_URL;

const addJob = async encodedCairoPie => {
  const data = {
    request: {cairo_pie: encodedCairoPie},
    action: ActionTypes.ADD_JOB
  };
  const [response, error] = await apiRequest({
    path,
    method: 'POST',
    data
  });
  if (error) {
    return Promise.reject(error);
  }
  return {cairoJobKey: response.cairo_job_key};
};

export {addJob};
