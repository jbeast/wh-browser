import { Environment, SubjectRole } from './graphql-global-types';
import { defaultQueryParams } from '../hooks/use-url-params';

export interface QueryParams {
  environment: Environment
  eventTypes: string[]
  subjectRoles: SubjectRole[]
  lims: string[]
  occuredAfter?: string
  occuredBefore?: string
  limit: number
  offset: number
}

export function reducer(state: QueryParams, action: Action): QueryParams {
  switch (action.type) {
    case 'ADD_SUBJECT_ROLE':
      return { ...state, subjectRoles: [...state.subjectRoles, { subject: '', roleType: ''}]};
    case 'REMOVE_SUBJECT_ROLE':
      return { ...state, subjectRoles: state.subjectRoles.filter((sr, index) => {
          return index !== action.index;
        })
      };
    case 'UPDATE_SUBJECT_ROLE':
      return { ...state, subjectRoles: state.subjectRoles.map((sr, index) => {
          return index === action.index ? action.value : sr;
        })
      };
    case 'ADD_LIMS':
      return { ...state, lims: [...state.lims, action.value]};
    case 'ADD_EVENT_TYPE':
      return { ...state, eventTypes: [...state.eventTypes, action.value]};
    case 'SET_OCCURED_AFTER':
      return  { ...state, occuredAfter: action.value};
    case 'SET_OCCURED_BEFORE':
      return  { ...state, occuredBefore: action.value};
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

export interface HasAction<S> {
  type: S
}

export interface AddSubjectRole extends HasAction<'ADD_SUBJECT_ROLE'> {}

export interface RemoveSubjectRole extends HasAction<'REMOVE_SUBJECT_ROLE'> {
  index: number
}

export interface UpdateSubjectRole extends HasAction<'UPDATE_SUBJECT_ROLE'> {
  value: SubjectRole
  index: number
}

export interface AddLimsAction extends HasAction<'ADD_LIMS'> {
  value: string
}

export interface RemoveLimsAction extends HasAction<'REMOVE_LIMS'> {
  value: string
}

export interface SetOccuredAfter extends HasAction<'SET_OCCURED_AFTER'> {
  value: string
}

export interface SetOccuredBefore extends HasAction<'SET_OCCURED_BEFORE'> {
  value: string
}

export interface AddEventTypeAction extends HasAction<'ADD_EVENT_TYPE'> {
  value: string
}

export interface RemoveEventTypeAction extends HasAction<'REMOVE_EVENT_TYPE'> {
  value: string
}

export interface ResetEnvironment extends HasAction<'RESET_ENVIRONMENT'> {
  value: string
}

export type Action = AddSubjectRole
  | RemoveSubjectRole
  | UpdateSubjectRole
  | AddLimsAction
  | RemoveLimsAction
  | SetOccuredAfter
  | SetOccuredBefore
  | AddEventTypeAction
  | RemoveEventTypeAction
  | ResetEnvironment;