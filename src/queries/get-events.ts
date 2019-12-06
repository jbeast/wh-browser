import { gql } from 'apollo-boost';

export default gql`
    query GetEvents($eventTypes: [String!]!, $limsIds: [String!], $occuredAfter: Date, $occuredBefore: Date, $subjectRoles:[SubjectRole!], $offset: Int) {
        getEvents(input:{
            eventTypes:$eventTypes, 
            limsIds:$limsIds, 
            occuredAfter: $occuredAfter, 
            occuredBefore: $occuredBefore,
            subjectRoles: $subjectRoles,
            offset: $offset}) {
            sql
            count
            events {
                occuredAt
                eventType {
                    key
                }
                roles {
                    subject {
                        friendlyName
                        subjectType {
                            key
                        }
                    }
                    roleType {
                        key
                    }
                }
                userIdentifier
                limsId
            }
        }
    }
`;