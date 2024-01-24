// validations.js

export const validateName = (name) => {
  if (!name.trim()) {
    return "Name cannot be empty";
  }
  if (/\d/.test(name)) {
    return "Name cannot contain numbers";
  }
  return "";
};

export const validateMinMax = (min, max, field) => {
  if (!min.trim() || !max.trim()) {
    return `${field} cannot be empty`;
  }
  const minValue = parseInt(min);
  const maxValue = parseInt(max);

  if (isNaN(minValue) || isNaN(maxValue)) {
    return `${field} must be a number`;
  }

  if (minValue > maxValue) {
    return `Min ${field} cannot be greater than Max ${field}`;
  }

  return "";
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
