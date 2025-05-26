export const validateEmail = (value: string): string => {
  const pattern = {
    value: /^[\w-.]{1,50}@([\w-]+\.)+[\w-]{1,10}$/,
    message: 'E-mail entered incorrectly',
  };

  if (!String(value).match(pattern.value)) {
    return pattern.message;
  }

  return '';
};

export const validatePassword = (value: string): string => {
  const minLength = {
    value: 8,
    message: 'Minimum length - 8 characters',
  };
  const patternCapitals = {
    value: /[A-Z]/,
    message: 'The password must retain at least one capital letter',
  };
  const patternLetters = {
    value: /[a-z]/,
    message: 'The password must retain at least one lowercase letter',
  };
  const patternNumbers = {
    value: /[0-9]/,
    message: 'The password must contain at least one number',
  };
  const patternRussian = {
    value: /^[^а-яА-ЯеЁ]+$/,
    message: 'The password must not contain Russian letters',
  };
  const patternSpace = {
    value: /^\S+$/,
    message: 'The password must not contain spaces',
  };

  switch (true) {
    case String(value).length < minLength.value:
      return minLength.message;

    case !String(value).match(patternRussian.value):
      return patternRussian.message;

    case !String(value).match(patternCapitals.value):
      return patternCapitals.message;

    case !String(value).match(patternLetters.value):
      return patternLetters.message;

    case !String(value).match(patternNumbers.value):
      return patternNumbers.message;

    case !String(value).match(patternSpace.value):
      return patternSpace.message;

    default:
      return '';
  }
};

export const validateHabitName = (value: string): string => {
  const pattern = {
    value: /^.{1,25}$/,
    message: 'The number of characters must be from 1 to 25',
  };

  if (!String(value).match(pattern.value)) {
    return pattern.message;
  }

  return '';
};
