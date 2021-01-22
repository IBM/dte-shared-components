//Methods that can't be imported as a prop and don't have any sensitive information

const toBoolean = (value) => {
  switch (value) {
    case true:
    case "true":
    case "True":
    case "TRUE":
    case 1:
    case "1":
    case "on":
    case "On":
    case "ON":
    case "yes":
    case "Yes":
    case "YES":
      return true;
    default:
      return false;
  }
};

const isBasic = (values = {}, defaultValue = true) => {
  if (!values) return defaultValue;
  if (values && values.simple !== null) return values.simple;
  return values &&
    ((values.links && values.links.length > 0) ||
      (values.platform && values.platform.length > 0)) &&
    !values.url
    ? false
    : defaultValue;
};

module.exports = {
  toBoolean,
  isBasic,
};
