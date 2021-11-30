import {getLogger} from '../utils/logger';

const logger = getLogger('Analytics');

const AnalyticsEventType = {
  START_CHALLENGE: 'start_challenge',
  RUN_ERROR: 'run-error',
  RUN_SUCCESS: 'run-success',
  RUN: 'run',
  ABORT: 'abort',
  FORMAT: 'format',
  SEND_ERROR: 'send-error',
  SEND_SUCCESS: 'send-success',
  PROVE_WITH_SHARP: 'prove-with-sharp',
  DEPLOY_SUCCESS: 'deploy-success',
  DEPLOY_ERROR: 'deploy-error',
  DEPLOY_CONTRACT: 'deploy-contract'
};

const SendAnalyticsEvent = (type, label, category = 'playground') => {
  logger.debug('Send analytics event', {type, label, category});
  gtag('event', type, {
    event_label: label,
    event_category: category
  });
};

export {SendAnalyticsEvent, AnalyticsEventType};
