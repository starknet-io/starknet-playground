/**
 * Gets url parameter (https://some-website-url?myKey=myValue)
 * @param name - Key value (myKey)
 * @returns {string|string} - Value of the given key (myValue)
 */
const getUrlParameter = name => {
  name = name.replace(/[[]/, '[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * Sets a url parameter into the current url
 * @param key - Key to set
 * @param val - Value to set to the given key
 */
const setParam = (key, val) => {
  if (key && val) {
    const url = new URL(window.location.href);
    key = encodeURIComponent(key);
    val = encodeURIComponent(val);
    url.searchParams.set(key, val);
    window.history.pushState('', '', url.toString());
  }
};

/**
 * Delete a url parameter from the current url
 * @param key - Key to delete
 */
const deleteParam = key => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState('', '', url.toString());
};

export {getUrlParameter, setParam, deleteParam};
