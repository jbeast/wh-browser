import { Environment } from './graphql-global-types';

export interface QueryParams {
  environment: Environment
  eventTypes: string[]
  lims: string[]
}

export interface HasAction<S> {
  type: S
}

export interface AddLimsAction extends HasAction<'ADD_LIMS'> {
  value: string
}

export interface RemoveLimsAction extends HasAction<'REMOVE_LIMS'> {
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

export type Action = AddLimsAction
  | RemoveLimsAction
  | AddEventTypeAction
  | RemoveEventTypeAction
  | ResetEnvironment;