import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetEvents, GetEvents_getEvents_events, GetEventsVariables } from './queries/types/GetEvents';
import GET_EVENTS from './queries/get-events';
import { QueryParams } from './types/app-types';

const Events: React.FC<{ query: QueryParams }> = ({ query }) => {
  const { loading, error, data } = useQuery<GetEvents, GetEventsVariables>(GET_EVENTS, {
    variables: {
      eventTypes: query.eventTypes,
      limsIds: query.lims
    }
  });

  if (error) return <p>Error :(</p>;
  if (loading || !data) return <p>Loading...</p>;

  return <EventsTable events={data.getEvents.events} />;
};

const EventsTable: React.FC<{ events: GetEvents_getEvents_events[] }> = ({ events }) => {
  const rows = events.map((event) => {
    return (
      <tr className="border">
        <td className="px-2 py-2 text-gray-700 text-sm">{event.occuredAt}</td>
        <td className="px-2 py-2 text-gray-700 text-sm">{event.eventType.key}</td>
        <td className="px-2 py-2 text-gray-700 text-sm">Labware: 98899998 (Plate)</td>
        <td className="px-2 py-2 text-gray-700 text-sm">{event.userIdentifier}</td>
        <td className="px-2 py-2 text-gray-700 text-sm">{event.limsId}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table-auto w-full shadow text-left">
        <thead className="bg-gray-200 text-xs font-bold text-gray-600 uppercase tracker-wide">
        <tr>
          <th className="px-2 py-4">Occured At</th>
          <th className="px-2 py-4">Event</th>
          <th className="px-2 py-4">Roles</th>
          <th className="px-2 py-4">User Identifier</th>
          <th className="px-2 py-4">LIMS</th>
        </tr>
        </thead>

        <tbody>
          { rows }
        </tbody>
      </table>
    </div>
  );
};

export default Events;