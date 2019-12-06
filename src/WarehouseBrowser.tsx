import React, { useReducer } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Events from './Events';
import useUrlParams from './hooks/use-url-params';
import { QueryParams, reducer } from './types/app-types';

const WarehouseBrowser: React.FC = () => {
  let query = useUrlParams<QueryParams>();
  const [nextQuery, dispatch] = useReducer(reducer, query);

  return (
    <div className="flex bg-white">

      <div className="w-1/3 min-h-screen p-4 bg-gray-200 border-r-2 border-gray-300">
        <Sidebar dispatch={dispatch} query={nextQuery} />
      </div>

      <div className="w-full px-4">

        <Header dispatch={dispatch} query={query} />

        <Events query={query} nextQuery={nextQuery} />

      </div>

    </div>
  );
};

export default WarehouseBrowser;
