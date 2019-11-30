import React, { Dispatch, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import LOAD_EVERYTHING_QUERY from './queries/load-everything';
import {
  loadEverything, loadEverything_getEventTypes_eventTypes,
  loadEverything_getLims_lims,
  loadEverythingVariables,
} from './queries/types/loadEverything';
import { QueryParams } from './types/app-types';
import { Action } from './types/app-types';
import { partition } from 'lodash';

const Sidebar: React.FC<{ query: QueryParams, dispatch: Dispatch<Action> }> = ({ query, dispatch }) => {
  const { loading, error, data, refetch } = useQuery<loadEverything, loadEverythingVariables>(LOAD_EVERYTHING_QUERY, {
    variables: {
      environment: query.environment,
    }
  });

  useEffect(() => {
    refetch();
  }, [query.environment]);

  if (error) return <p>Error :(</p>;

  let lims: loadEverything_getLims_lims[] = [];
  let eventTypes: loadEverything_getEventTypes_eventTypes[] = [];
  let selectedLimsLength = 0;
  let selectedEventTypesLength = 0;

  if (data) {
    const [selectedLims, otherLims] = partition(data.getLims.lims, (lims) => query.lims.includes(lims.id));
    const [selectedEventTypes, otherEventTypes] = partition(data.getEventTypes.eventTypes, (et) => query.eventTypes.includes(et.key));
    lims = [...selectedLims, ...otherLims];
    selectedLimsLength = selectedLims.length;
    eventTypes = [...selectedEventTypes, ...otherEventTypes];
    selectedEventTypesLength = selectedEventTypes.length;
  }

  return (
    <div className="h-full w-1/5 overflow-y-scroll p-4 bg-gray-200 border-r-2 border-gray-300">

      <img src="sangerlogo.png" alt="Sanger Logo" className="mb-4 ml-2 h-12 w-12"/>

      <div className="ml-2 mb-4">
        <input type="date" className="w-full mb-1 -ml-2 py-1 border rounded" defaultValue="25-11-1986"/>
        <input type="date" className="w-full mb-1 -ml-2 py-1 border rounded" defaultValue="25-11-2019" />
      </div>

      <SidebarSection title="LIMS" limit={Math.max(3, selectedLimsLength)}>
        { lims.map(item => {
          const active = query.lims.includes(item.id);
          const onClick = () => {
            if (active) {
              dispatch({ type: "REMOVE_LIMS", value: item.id });
            } else {
              dispatch({ type: "ADD_LIMS", value: item.id });
            }
          };

          return <SectionItem key={item.id} value={item.id} count={item.eventCount} active={active} onClick={onClick} />
        }) }
      </SidebarSection>

      <SidebarSection title="Events" limit={Math.max(7, selectedEventTypesLength)}>
        { eventTypes.map(et => {
          const active = query.eventTypes.includes(et.key);
          const onClick = () => {
            if (active) {
              dispatch({ type: "REMOVE_EVENT_TYPE", value: et.key });
            } else {
              dispatch({ type: "ADD_EVENT_TYPE", value: et.key });
            }
          };

          return <SectionItem key={et.key} value={et.key} count={et.eventCount} active={active} onClick={onClick} />
        }) }
      </SidebarSection>

    </div>
  )
};

const SidebarSection: React.FC<{ title: string, limit?: number }> = (params) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooManyChildren: boolean = params.limit ? React.Children.count(params.children) > params.limit : false;

  let children: typeof params.children = params.children;

  if (!isOpen && tooManyChildren) {
    children = React.Children.toArray(params.children).slice(0, params.limit);
  }

  const onClick = () => setIsOpen(!isOpen);

  return (
    <div className="ml-2 mb-4">
      <h2 className="mb-2 text-xs font-semibold text-gray-600 uppercase tracker-wide">{ params.title }</h2>
      <div className="flex flex-col">
        { children }
        { tooManyChildren ? <ShowBtn onClick={onClick}>Show { isOpen ? 'less' : 'more' }</ShowBtn> : '' }
      </div>
    </div>
  )
};

const ShowBtn: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <span className="flex justify-center mt-1">
      <button className="bg-blue-700 px-3 py-1 rounded text-xs font-semibold text-white uppercase tracker-wide" onClick={props.onClick}>
        {props.children}
      </button>
    </span>
  )
};

const SectionItem: React.FC<{ value: string, count: number, active: boolean, onClick: () => void }> = ({ value, count, active, onClick  }) => {
  return (
    <a onClick={onClick} href="#" className={`flex items-center justify-between px-2 py-1 -ml-2 mb-1 text-sm font-medium text-gray-700 rounded ${active ? 'bg-gray-400' : ''}`}>
      <span>{ value }</span>
      <span className="px-2 bg-white rounded-full text-xs text-gray-600 font-semibold leading-normal">{ count }</span>
    </a>
  )
};

export default Sidebar;