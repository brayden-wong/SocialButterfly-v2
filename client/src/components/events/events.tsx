import { useState } from 'react';
import { EventCard } from './event.card';
import { Event } from './types/event'

interface Props {
  searchText: string;
  setSearchText: CallableFunction;
  events: Event[]
  expanded: boolean
  email: string;
}

export const Events = (props: Props) => {

  return (
    <div className={`absolute left-3/4 ${props.expanded ? 'mt-[72px]' : 'mt-8'} -translate-x-1/2 w-2/5 rounded-md flex flex-col jusify-center space-y-4`}>
      {
        props.searchText === '' ?
          props.events.map(event => {
            return <EventCard id={event.id} name={event.event_name} email={props.email}
              tags={event.tags} address={event.address} date={event.date}
              description={event.description} />
          }) :
          props.events.map(event => {
            if(event.tags.includes(props.searchText.toLowerCase())) {
              return <EventCard id={event.id} name={event.event_name} email={props.email}
                tags={event.tags} address={event.address} date={event.date}
                description={event.description} />
            }

            if (event.event_name.toLowerCase().includes(props.searchText.toLowerCase())) {
              return <EventCard id={event.id} name={event.event_name} email={props.email}
                tags={event.tags} address={event.address} date={event.date}
                description={event.description} />
            }


          })
      }
    </div>
  );
}