/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_getEvents_events_eventType {
  __typename: "SlimEventType";
  key: string;
}

export interface GetEvents_getEvents_events_roles_subject_subjectType {
  __typename: "SubjectType";
  key: string;
}

export interface GetEvents_getEvents_events_roles_subject {
  __typename: "Subject";
  friendlyName: string;
  subjectType: GetEvents_getEvents_events_roles_subject_subjectType;
}

export interface GetEvents_getEvents_events_roles_roleType {
  __typename: "RoleType";
  key: string;
}

export interface GetEvents_getEvents_events_roles {
  __typename: "Role";
  subject: GetEvents_getEvents_events_roles_subject;
  roleType: GetEvents_getEvents_events_roles_roleType;
}

export interface GetEvents_getEvents_events {
  __typename: "Event";
  occuredAt: string;
  eventType: GetEvents_getEvents_events_eventType;
  roles: GetEvents_getEvents_events_roles[];
  userIdentifier: string;
  limsId: string;
}

export interface GetEvents_getEvents {
  __typename: "GetEventsPayload";
  events: GetEvents_getEvents_events[];
}

export interface GetEvents {
  getEvents: GetEvents_getEvents;
}

export interface GetEventsVariables {
  eventTypes: string[];
  limsIds?: string[] | null;
}
