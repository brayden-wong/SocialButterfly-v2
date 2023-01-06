import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface Props {
  setSearchText: CallableFunction;
  event: boolean;
  setEvent: CallableFunction;
}

export const SearchBar = (props: Props) => {

  return (
    <div className='flex justify-between items-center'>
      <label htmlFor='SearchTitle'>
        <MagnifyingGlassIcon className='relative left-2 w-6 h-6' />
      </label>
      <input id='SearchTitle' className={`px-2 w-3/4 outline-none bg-transparent text-lg`} type='text' placeholder='Search'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setSearchText(e.target.value)} />
      <button className={`py-2 px-4 bg-teal-500 rounded-lg mr-2`}
        onClick={() => props.setEvent(!props.event)}>New Event</button>
    </div>
  )
}