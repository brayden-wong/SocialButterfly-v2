import { useEffect, useState } from "react";
import axios from 'axios';
import { Events } from './events';

interface Props {
  searchText: string;
  setSearchText: CallableFunction;
  email: string;
  expanded: boolean;
}

export const RenderCards = (props: Props) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getUserInformation();
  }, []);

  const getUserInformation = () => {

    axios.get(`http://localhost:8080/events/`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error(`error: ${error}`));
  }

  return (
    <Events searchText={props.searchText} setSearchText={props.setSearchText}  email={props.email} expanded={props.expanded} events={events} />
  )
}