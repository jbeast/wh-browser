import React, { Dispatch, useEffect, useRef, useState } from 'react';
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
import { SubjectRole } from './types/graphql-global-types';

const Sidebar: React.FC<{ query: QueryParams, dispatch: Dispatch<Action> }> = ({ query, dispatch }) => {
  const { loading, error, data, refetch } = useQuery<loadEverything, loadEverythingVariables>(LOAD_EVERYTHING_QUERY, {
    variables: {
      environment: query.environment,
    }
  });

  useEffect(() => {
    refetch();
  }, [query.environment, refetch]);

  if (loading) return <p><Logo />Loading...</p>;
  if (error) return <p><Logo />Error :(</p>;

  let lims: loadEverything_getLims_lims[] = [];
  let eventTypes: loadEverything_getEventTypes_eventTypes[] = [];
  let selectedLimsLength = 0;
  let selectedEventTypesLength = 0;
  let roleTypeOptions = new Array<React.ReactElement>();

  if (data) {
    const [selectedLims, otherLims] = partition(data.getLims.lims, (lims) => query.lims.includes(lims.id));
    const [selectedEventTypes, otherEventTypes] = partition(data.getEventTypes.eventTypes, et => query.eventTypes.includes(et.key));
    lims = [...selectedLims, ...otherLims];
    selectedLimsLength = selectedLims.length;
    eventTypes = [...selectedEventTypes, ...otherEventTypes];
    selectedEventTypesLength = selectedEventTypes.length;
    roleTypeOptions = data.getRoleTypes.roleTypes.map((rt, index) => <option key={index} value={rt.key}>{rt.key}</option>);
    roleTypeOptions.unshift(<option key="empty" value=""></option>);
  }

  return (
    <div>

      <Logo />

      <SidebarSection title="">

        <div className="flex justify-between">
          <h2 className="self-center mb-2 h-4 text-xs font-semibold text-gray-600 uppercase tracker-wide">Occured After</h2>
          <input type="date"
                 className="w-7/12 mb-1 py-1 border rounded text-xs text-gray-600"
                 defaultValue={query.occuredAfter}
                 onChange={(e) => dispatch({type: "SET_OCCURED_AFTER", value: e.target.value})} />
        </div>

        <div className="flex justify-between">
          <h2 className="self-center mb-2 h-4 text-xs font-semibold text-gray-600 uppercase tracker-wide">Occured Before</h2>
          <input type="date"
                 className="w-7/12 mb-1 py-1 border rounded text-xs text-gray-600"
                 defaultValue={query.occuredBefore}
                 onChange={(e) => dispatch({type: "SET_OCCURED_BEFORE", value: e.target.value})} />
        </div>
      </SidebarSection>

      <div className="ml-2 pb-4 mb-4 border-b-2">
        <h2 className="mb-2 text-xs font-semibold text-gray-600 uppercase tracker-wide">Roles
          <span onClick={() => dispatch({ type: "ADD_SUBJECT_ROLE" })} className="cursor-pointer hover:text-blue-800"> {String.fromCharCode(8853)}</span>
        </h2>

        { query.subjectRoles.map((sr, index) => {
          return <SubjectRoleSection
            key={index}
            index={index}
            dispatch={dispatch}
            roleTypeOptions={roleTypeOptions}
            subjectRole={sr} />
          })

        }

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

const Logo: React.FC = () => {
  return <img src="sangerlogo.png" alt="Sanger Logo" className="mb-4 ml-2 h-12 w-12"/>;
};

const SubjectRoleSection: React.FC<{ dispatch: Dispatch<Action>, index: number, subjectRole: SubjectRole, roleTypeOptions: React.ReactElement[]}> = ({ dispatch, index, subjectRole, roleTypeOptions }) => {
  const roleTypeRef = useRef<HTMLSelectElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    if (roleTypeRef.current && subjectRef.current) {
      dispatch({ type: "UPDATE_SUBJECT_ROLE", index: index, value: { roleType: roleTypeRef.current.value, subject: subjectRef.current.value }})
    }
  };

  return (
    <>
      <span onClick={() => dispatch({ type: "REMOVE_SUBJECT_ROLE", index: index })} className="cursor-pointer hover:text-blue-800 h-4 text-gray-600">{String.fromCharCode(10799)}</span>
      <select onChange={onChange} ref={roleTypeRef} className="w-full py-1 mb-1 border rounded text-xs text-gray-600" name="role_type" value={subjectRole.roleType || ""}>
        { roleTypeOptions }
      </select>
      <input onChange={onChange} ref={subjectRef} type="text" className="w-full mb-1 py-1 px-1 border rounded text-xs text-gray-600" value={subjectRole.subject || ""} placeholder=" Subject"/>
    </>
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
    <div className="ml-2 pb-4 mb-4 border-b-2">
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