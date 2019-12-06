import React, { Dispatch } from 'react';
import { Action, QueryParams } from './types/app-types';
import { Environment } from './types/graphql-global-types';
import { Link } from 'react-router-dom';

const Header: React.FC<{ query: QueryParams, dispatch: Dispatch<Action> }> = ({ query, dispatch }) => {
  return (
    <div className="flex justify-between items-center mb-4 py-4 border-b-2 border-gray-300">

      <h1 className="font-semibold text-gray-800 text-4xl uppercase tracking-wider">Warehouse Browser</h1>

      <span className="inline-flex border border-8 border-grey-200 bg-blue-700 rounded text-white uppercase font-light leading-loose tracking-tighter">
        <EnvironmentLink env={Environment.staging} dispatch={dispatch} active={query.environment===Environment.staging}/>
        <EnvironmentLink env={Environment.production} dispatch={dispatch} active={query.environment===Environment.production}/>
      </span>
    </div>
  )
};

const EnvironmentLink: React.FC<{ env: Environment, dispatch: Dispatch<Action>, active: boolean }> = ({ env, dispatch, active }) => {
  const onClick = () => {
    dispatch({ type: "RESET_ENVIRONMENT", value: env});
  };

  return (
    <Link onClick={onClick} to={{ search: `?environment=${env}` }} className={`px-8 hover:bg-blue-600 rounded ${active ? 'bg-blue-800' : ''}`}>
      { env }
    </Link>
  )
};

export default Header;