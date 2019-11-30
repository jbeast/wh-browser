import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { Environment } from '../types/graphql-global-types';

export const defaultQueryParams = {
  environment: Environment.production,
  lims: [],
  eventTypes: []
};

const useUrlParams = <T>(): T => {
  const parsedQs = qs.parse(useLocation().search, { ignoreQueryPrefix: true });
  return Object.assign({}, defaultQueryParams, parsedQs);
};

export default useUrlParams;