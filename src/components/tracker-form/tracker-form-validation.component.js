export const trackerFormValidation = (formData) => {
  let errorOccured = false; // toggled only if an error is found.
  let errors = {}; // stores validation errors.
  Object.keys(formData).forEach((field) => {
    // skip validation on user and createdAt fields (these fields are not user controlled)
    if (field === 'user' || field === 'createdAt') {
      return null;
    }
    // Validate data object as well as location and grade fields.
    // Add any errors found to the errors object.
    if (field === 'data') {
      // iterate over data fields and check that they are integers.
      console.log('accessed datafield');
      Object.keys(formData[field]).forEach((responseField) => {
        if (!Number.isInteger(formData[field][responseField])) {
          errorOccured = true; // if error is found toggle errorOccured.
          errors = {
            ...errors,
            [`${responseField}Error`]: 'Survey count fields cannot be blank',
          };
        }
      });
    } else if (!(formData[field].length > 0)) {
      // Ensure that the location and grade fields have values.
      errorOccured = true; // if error is found toggle errorOccured.
      if (field === 'location') {
        errors = {
          ...errors,
          [`${field}Error`]: 'Please select a valid location from the list.',
        };
      } else if (field === 'grade') {
        errors = {
          ...errors,
          [`${field}Error`]: 'Please select a valid grade option from the list',
        };
      }
    }
  });
  if (errorOccured) {
    return errors;
  }
  return false;
};
