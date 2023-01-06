import React, { useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, TagIcon, } from '@heroicons/react/24/solid'
import { NewEvent } from './NewEvent';
import { SearchBar } from './SearchBar';
import { CheckIcon } from '@heroicons/react/20/solid';
import { UpdateEventTag } from '../events/UpdateEventTag';

interface Props {
  searchText: string;
  setSearchText: CallableFunction;
  expanded: boolean;
  setExpanded: CallableFunction;
}

export const Search = (props: Props) => {

  return (
    <div className={`relative top-[2%] left-[5%] w-[90%] bg-slate-800 box-border rounded-lg
      ${props.expanded ? 'h-[400px] duration-300' : 'h-16 duration-300'}`}>
      <div className={`relative top-1/2 -translate-y-1/2 flex justify-center items-center gap-2
        ${props.expanded ? 'h-0 opacity-0 pointer-events-none duration-300' : 'h-auto opacity-1 duration-300'}`}>
        <label htmlFor='SearchTitle'>
          <MagnifyingGlassIcon className='relative left-2 w-5 h-5' />
        </label>
        <input id='SearchTitle' className={`px-2 mr-4 w-3/4 outline-none bg-transparent text-lg`} type='text'
          placeholder='Search'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setSearchText(e.target.value)} />
        <button className={`py-2.5 px-2.5 w-28 bg-teal-500 rounded-lg mr-2`}
          onClick={() => props.setExpanded(!props.expanded)}>New Event</button>
      </div>

      <NewEvent expanded={props.expanded} setExpanded={props.setExpanded} />
    </div>
  );
}