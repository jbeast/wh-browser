import { gql } from 'apollo-boost';

export default gql`
    query loadEverything($environment:Environment) {

        getEventTypes(environment:$environment) {
            eventTypes {
                key
                eventCount
            }
        }

        getUsers {
            users {
                id
                eventCount
            }
        }
        getLims {
            lims {
                id
                eventCount
            }
        }
    }
`;