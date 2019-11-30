import React, { useReducer } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Events from './Events';
import useUrlParams, { defaultQueryParams } from './hooks/use-url-params';
import { Action, QueryParams } from './types/app-types';
import { Link } from 'react-router-dom';
import { stringify } from 'qs';

const WarehouseBrowser: React.FC = () => {
  let query = useUrlParams<QueryParams>();
  const [nextQuery, dispatch] = useReducer(reducer, query);

  return (
    <div className="flex h-screen bg-white">

      <Sidebar dispatch={dispatch} query={nextQuery} />

      <div className="h-full w-full px-4">

        <Header dispatch={dispatch} query={query} />

        <div className="flex p-2 bg-gray-200 mb-2 rounded">
          <Link className="bg-green-600 hover:bg-green-700 text-white uppercase my-2 px-3 py-2 rounded border border-gray-800 " to={{ search: stringify(nextQuery) }}>
            Find Events
          </Link>
        </div>

        <Events query={query} />

      </div>

    </div>
  );
};

function reducer(state: QueryParams, action: Action): QueryParams {
  switch (action.type) {
    case 'ADD_LIMS':
      return { ...state, lims: [...state.lims, action.value]};
    case 'ADD_EVENT_TYPE':
      return { ...state, eventTypes: [...state.eventTypes, action.value]};
    case 'REMOVE_LIMS':
      return { ...state, lims: state.lims.filter(l => l !== action.value)};
    case 'REMOVE_EVENT_TYPE':
      return { ...state, eventTypes: state.eventTypes.filter(et => et !== action.value)};
    case 'RESET_ENVIRONMENT':
      return Object.assign({}, defaultQueryParams, { environment: action.value });
    default:
      return state;
  }
}

export default WarehouseBrowser;
