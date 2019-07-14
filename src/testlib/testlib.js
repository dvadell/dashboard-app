/**
 * @function findByDataTestAttr
 * @param {ShallowWrapper} wrapper - enzyme's shallow()'ed component
 * @param {function} value - the value we are looking for in a data-test attribute.
 * @returns {ShallowWrapper} - The matching component
 */
export const findByDataTestAttr = (wrapper, value) => {
  return wrapper.find('[data-test="' + value + '"]');
};
