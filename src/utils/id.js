/**
 * Generates a random id
 * @returns {string} - Generated id
 */
const id = () => '_' + Math.random().toString(36).substr(2, 9);

export {id};
