/**
 * Handles try/catch expression for async-await promise
 * @param promise - Original promise
 * @returns {Promise<*[]|*[]>} - Resolve/rejected promise in the form of [response, error]
 */
const promiseHandler = async promise => {
  try {
    return [await promise, null];
  } catch (err) {
    return [null, err];
  }
};

export {promiseHandler};
