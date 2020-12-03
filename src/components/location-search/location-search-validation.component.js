export const locationSearchFormValidation = (formValues) => {
  let errorOccured = false;
  let validationErrors = {};
  Object.keys(formValues).forEach((field) => {
    if (field === 'postalCode' && formValues[field].includes(' ')) {
      errorOccured = true;
      validationErrors = {
        ...validationErrors,
        [`${field}Error`]: 'Postal Code/ZIP code cannot contain spaces',
      };
    }
    if (!(formValues[field].length > 0)) {
      errorOccured = true;
      validationErrors = {
        ...validationErrors,
        [`${field}Error`]: 'Field cannot be blank',
      };
    }
  });

  if (errorOccured) {
    return validationErrors;
  }
  return errorOccured;
};
