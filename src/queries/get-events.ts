import { gql } from 'apollo-boost';

export default gql`
    query GetEvents($eventTypes: [String!]!, $limsIds: [String!]) {
        getEvents(input:{eventTypes:$eventTypes, limsIds:$limsIds}) {
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