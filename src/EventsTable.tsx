import React from 'react';
import { GetEvents_getEvents_events } from './queries/types/GetEvents';
import _ from "lodash";

const EventsTable: React.FC<{ events: GetEvents_getEvents_events[] }> = ({ events }) => {

  const rows = events.map((event, index) => {

    const roles = _(event.roles).groupBy("roleType.key").map((roles, roleTypeKey) => {
      return <li key={roleTypeKey}><span className="font-semibold">{roleTypeKey}</span>: {roles.length}</li>
    }).value();

    return (
      <tr key={index} className="border">
        <td className="px-2 py-2 text-gray-700 text-sm">{event.occuredAt}</td>
        <td className="px-2 py-2 text-gray-700 text-sm">{event.eventType.key}</td>
        <td className="px-2 py-2 text-gray-700 text-sm">
          <ul>
            <li>{roles}</li>
          </ul>
        </td>
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

export default EventsTable;