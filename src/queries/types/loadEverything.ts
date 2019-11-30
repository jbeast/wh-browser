/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Environment } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: loadEverything
// ====================================================

export interface loadEverything_getEventTypes_eventTypes {
  __typename: "SlimEventType";
  key: string;
  eventCount: number;
}

export interface loadEverything_getEventTypes {
  __typename: "GetEventTypesPayload";
  eventTypes: loadEverything_getEventTypes_eventTypes[];
}

export interface loadEverything_getUsers_users {
  __typename: "SlimUser";
  id: string;
  eventCount: number;
}

export interface loadEverything_getUsers {
  __typename: "GetUsersPayload";
  users: loadEverything_getUsers_users[];
}

export interface loadEverything_getLims_lims {
  __typename: "SlimLims";
  id: string;
  eventCount: number;
}

export interface loadEverything_getLims {
  __typename: "GetLimsPayload";
  lims: loadEverything_getLims_lims[];
}

export interface loadEverything {
  getEventTypes: loadEverything_getEventTypes;
  getUsers: loadEverything_getUsers;
  getLims: loadEverything_getLims;
}

export interface loadEverythingVariables {
  environment?: Environment | null;
}
