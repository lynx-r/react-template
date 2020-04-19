import _ from 'lodash';
import { CONSTANTS } from '../config';

export const useStrings = () => {
  const createRandomString = (passwordLength: number = CONSTANTS.RANDOM_PASSWORD_LENGTH) =>
    _.sampleSize(CONSTANTS.RANDOM_PASSWORD_CHARS, passwordLength).join('');

  return {
    createRandomString
  };
};
