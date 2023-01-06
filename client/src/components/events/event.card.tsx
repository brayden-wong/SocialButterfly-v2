import { useState } from 'react';
import axios from 'axios';
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/20/solid';

interface Props {
  id: string;
  name: string;
  description: string;
  date: Date,
  tags: string[];
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zipcode: string;
  }
  email: string;
}

export const EventCard = (props: Props) => {
  const date = new Date(props.date);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const handleRSVP = async () => {
    const result = await axios.patch(`http://localhost:8080/events/rsvp/${props.id}`, {},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      });

    console.log(result);
  }

  return (
    <div className='w-full p-4 bg-teal-500 rounded-md'>
      <h1 className='text-4xl'>{props.name}</h1>
      <div className='mt-4 ml-4'>
        <p className='cutoff-text text-black box-border'>{props.description}</p>
        <input className={`${props.description.split(' ').length > 32 ? 'viewButton' : 'opacity-0'} text-black font-semibold text-xs`} type='checkbox' />
      </div>
      <div className='flex justify-between mt-2'>
        <div className='flex flex-col flex-start relative ml-4 -space-y-2 text-black'>
          <span>{`${props.address.street}${props.address.suite ? `, ${props.address.suite}` : ''}`}</span>
          <span>{`${props.address.city}, ${props.address.state}`}</span>
          <span>{props.address.zipcode}</span>
        </div>
        <div className='flex flex-col box-border text-black'>
          <p className='flex items-center gap-2'><span><CalendarDaysIcon className='w-5 h-5 invert' /></span>{month}-{day}-{year}</p>
          <p className='flex items-center gap-2'><span><ClockIcon className='w-5 h-5 invert' /></span>{hours > 12 ? `0${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`}</p>
        </div>
      </div>
      <div className='flex items-center justify-between '>
        <div className='relative translate-y-[15%] mx-2 overflow-x-scroll flex gap-2 pb-[10px] items-center box-border'>
          {
            props.tags.map((tag, index) => (
              <p key={index} className='px-2 bg-slate-800 rounded-sm'>{tag}</p>
            ))
          }
        </div>
        <button className='px-2 bg-slate-800 rounded-sm'
          onClick={() => handleRSVP()}>
          RSVP
        </button>
      </div>
    </div>
  );
}

// <div className='w-full flex justify-between items-center mt-1.5'>
//         {/* <div className='space-x-2 mr-1 box-border overflow-x-scroll'> */}
//         <button className='bg-slate-800 px-4 py-1.5 rounded duration-300 hover:bg-slate-700 hover:duration-300'
//           onClick={async () => await handleRSVP()}>
//           RSVP
//         </button>
//       </div>