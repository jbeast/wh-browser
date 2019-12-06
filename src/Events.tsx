import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GetEvents, GetEvents_getEvents, GetEventsVariables } from './queries/types/GetEvents';
import GET_EVENTS from './queries/get-events';
import { QueryParams } from './types/app-types';
import EventsTable from './EventsTable';
import { Link, LinkProps } from 'react-router-dom';
import { stringify } from 'qs';
import sqlFormatter from 'sql-formatter';

const Events: React.FC<{ query: QueryParams, nextQuery: QueryParams }> = ({ query, nextQuery }) => {
  const [getEvents, { called, loading, data, error }] = useLazyQuery<GetEvents, GetEventsVariables>(GET_EVENTS, {
    variables: {
      eventTypes: query.eventTypes,
      limsIds: query.lims,
      subjectRoles: query.subjectRoles,
      occuredAfter: query.occuredAfter,
      occuredBefore: query.occuredBefore,
      offset: query.offset,
    }
  });

  console.log(query)

  useEffect(() => {
    if (query && query.eventTypes.length > 0) {
      getEvents();
    }
  }, [query, getEvents]);

  let content: React.ReactElement = <p></p>;
  let result: Pick<GetEvents_getEvents, 'sql' | 'count' | 'events'> = {
    sql: null,
    count: null,
    events: []
  };

  if (error) content = <p>Error :(</p>;
  if (!called) content = <p>Select an Event to get started!</p>;
  if (called && loading) content = <p>Loading...</p>;

  if (data && data.getEvents) {
    result = Object.assign({}, result, data.getEvents);
    content = <EventsTable events={result.events} />
  }

  return (
    <>
      <div className="flex justify-between p-2 bg-gray-200 mb-2 rounded">
        <span className="flex">
          <Link className="bg-green-600 hover:bg-green-700 text-white uppercase my-2 mr-2 px-3 py-2 rounded border border-gray-800 " to={{ search: stringify(nextQuery) }}>
            Find Events
          </Link>

          <Sql sql={result.sql} />

          {result.count!=null && result.count !== 0 &&
            <div className="ml-2 p-0 self-center leading-none">
              Showing results <span className="font-semibold">{query.offset+1}</span> to <span className="font-semibold">{Math.min(result.count, (query.offset+query.limit))}</span> of <span className="font-semibold">{result.count}</span>
            </div>
          }
        </span>
        <Pagination query={query} count={result.count} />
      </div>

      { content }
    </>
  );

};

const Sql: React.FC<{ sql: string | null }> = ({ sql }) => {
  const onClick = () => alert(sqlFormatter.format(sql == null ? '' : sql));

  return <button className="bg-white hover:bg-gray-100 text-gray-900 uppercase my-2 px-3 py-2 rounded border border-gray-800 " onClick={onClick} disabled={sql==null}>SQL</button>;
};

const Pagination: React.FC<{ query: QueryParams, count: number | null }> = ({ query, count}) => {
  const toOffset = (offset: number) => {
    return {
      to: {
        search: stringify(Object.assign({}, query, { offset }))
      }
    };
  };

  const activeLink = (link: LinkProps, offset: number, className: string) => {
    let newLink = Object.assign({}, link, toOffset(offset), { className });
    delete newLink["onClick"];
    return newLink;
  };

  type LinkNames = "first" | "previous" | "next" | "last";

  let links: Record<LinkNames, LinkProps> = {
    first: { to: '', className: "pg-btn pg-disabled rounded-l", onClick: (e) => e.preventDefault() },
    previous: { to: '', className: "pg-btn pg-disabled border-r-0 border-l-0", onClick: (e) => e.preventDefault() },
    next: { to: '', className: "pg-btn pg-disabled border-r-0", onClick: (e) => e.preventDefault() },
    last: { to: '', className: "pg-btn pg-disabled rounded-r", onClick: (e) => e.preventDefault() },
  };

  if (count != null) {
    if (query.offset!==0) {
      links.first = activeLink(links.first, 0, "pg-btn rounded-l");
    }

    if (query.offset-query.limit >= 0) {
      links.previous = activeLink(links.previous, query.offset - query.limit, "pg-btn border-r-0 border-l-0");
    }

    if (query.offset+query.limit < count) {
      links.next = activeLink(links.next, query.offset  + query.limit, "pg-btn border-r-0");
    }

    if (query.offset < count - query.limit) {
      links.last = activeLink(links.last, count - query.limit, "pg-btn rounded-r");
    }
  }

  return (
    <div className="flex">
      <Link {...links.first}>First</Link>
      <Link {...links.previous}>Previous</Link>
      <Link {...links.next}>Next</Link>
      <Link {...links.last}>Last</Link>
    </div>
  )
};

export default Events;