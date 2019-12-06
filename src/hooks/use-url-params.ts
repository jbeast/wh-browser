import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { Environment } from '../types/graphql-global-types';

export const defaultQueryParams = {
  environment: Environment.production,
  subjectRoles: [{
    subject: '',
    roleType: '',
  }],
  lims: [],
  eventTypes: [],
  occuredAfter: undefined,
  occuredBefore: undefined,
  limit: 30,
  offset: 0,
};

const useUrlParams = <T>(): T => {
  const parsedQs = qs.parse(useLocation().search, { ignoreQueryPrefix: true, decoder: function (str, defaultEncoder, charset, type) {
      if (type === 'value' && /^(\d+|\d*\.\d+)$/.test(str)) {
        return parseFloat(str);
      }
      return defaultEncoder(str);
    }
  });

  return Object.assign({}, defaultQueryParams, parsedQs);
};

export default useUrlParams;