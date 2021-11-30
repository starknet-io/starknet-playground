/**
 * Reads file on the given path
 * @param path - File path
 * @returns {Promise<string>} - File content
 */
const readFile = async path => {
  const response = await fetch(path);
  return await response.text();
};

export {readFile};
