import React, { useState } from 'react';
import { XMarkIcon, TagIcon, HomeModernIcon } from '@heroicons/react/20/solid';
import { UpdateEventTag } from '../events/UpdateEventTag';
import { Event } from './interfaces/event.interface';
import axios from 'axios';

interface Props {
  expanded: boolean;
  setExpanded: CallableFunction;
}

export const NewEvent = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date);
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [tag, setTag] = useState('');
  const [filled, setFilled] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);

  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (tag !== '' && !tagList.includes(tag))) {
      setTagList([...tagList, tag]);
      setTag('');
    }
  }

  const handleSubmit = async() => {
    if (title === '' || description === '' || date === null || street === '' || city === '' || state === '' || zip === '') {
      setFilled(!filled);
    }
    const eventDto: Event = {
      event_name: title,
      description,
      date: date,
      online: false,
      address: {
        street,
        suite,
        city,
        state,
        zipcode: zip
      }
    }

    const result = await axios.post('http://localhost:8080/events/create', {
      event: {
        ...eventDto
      },
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    });
    window.location.reload();
    console.log(result);
  }

  return (
    <div className={`w-full ${props.expanded ? 'relative top-[2%] h-full opacity-1 pointer-events-auto duration-300' :
      'absolute top-[2%] h-0 opacity-0 pointer-events-none duration-300'}`}>
      <div className='relative left-2 flex justify-start items-center gap-2'>
        <XMarkIcon className='w-5 h-5 cursor-pointer'
          onClick={() => props.setExpanded(!props.expanded)} />
        <input className='outline-none text-lg w-3/4 bg-transparent'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          type='text' placeholder='Title' />
      </div>
      <div className='mt-2 relative left-2 flex justify-start items-center gap-2'>
        <XMarkIcon className='w-5 h-5 pointer-events-none opacity-0' />
        <textarea className='outline-none overflow-y-hidden w-3/4 tracking-wide h-auto bg-transparent resize-none'
          placeholder='Enter a description' value={description} rows={4}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
      </div>
      <div className='relative left-2 flex flex-col gap-1'>
        <div className='flex gap-2'>
          <label htmlFor='address'>
            <HomeModernIcon className='w-5 h-5' />
          </label>
          <div className='w-full'>
            <input id='address' className='outline-none w-3/4 bg-transparent'
              type='text' placeholder='Address'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)} />
          </div>
        </div>
        <div className='flex gap-2'>
          <HomeModernIcon className='w-5 h-5 opacity-0 pointer-events-none' />
          <div className='w-full'>
            <input id='address' className='outline-none w-3/4 bg-transparent'
              type='text' placeholder='Suite, Apt, Unit'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuite(e.target.value)} />
          </div>
        </div>
        <div className='flex'>
          <HomeModernIcon className='w-5 h-5 pointer-events-none opacity-0' />
          <div className='relative left-2 w-full gap-4 flex'>
            <input className='outline-none w-32 bg-transparent'
              type='text' placeholder='City'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} />
            <input className='outline-none w-12 bg-transparent'
              type='text' placeholder='CA'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)} />
          </div>
        </div>
        <div className='flex gap-2'>
          <HomeModernIcon className='w-5 h-5 opacity-0 pointer-events-none' />
          <div className='w-full'>
            <input id='address' className='outline-none w-3/4 bg-transparent'
              type='text' placeholder='Zip/Postal Code'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZip(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={`mt-4 relative left-2 flex justify-start items-center gap-4 `}>
        <TagIcon className='w-5 h-5' />
        <input className='relative right-2 outline-none w-1/4 bg-transparent'
          placeholder='Enter a tag' type='text' maxLength={15} value={tag}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTag(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleTag(e)} />
        <button className='py-1 px-3 bg-teal-600 rounded-md duration-300 hover:bg-teal-500 
          hover:duration-300'
          onClick={() => {
            if (tag.length > 0 && !tagList.includes(tag)) {
              setTagList([
                tag,
                ...tagList,
              ]);
            }
            setTag('');
          }}>Add Tag
        </button>
        <input className='relative -right-8 outline-none bg-transparent text-black invert'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(() => new Date(e.target.value))}
          type='datetime-local' />
      </div>
      <div className='flex items-center justify-between'>
        <div className=' mx-2 mt-4 overflow-x-scroll flex justify-between items-center gap-2 pb-[10px] box-border'>
          {
            tagList.length > 0 ? tagList.map((tagItem, index) => {
              return (
                <UpdateEventTag index={index} tagItem={tagItem} tagList={tagList} setTagList={setTagList} />
              );
            }) :
              <p className='text-slate-300'>no tags</p>
          }
        </div>
      </div>
      <p className={`${filled ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'} text-red-500 text-center py-2.5`}>* All Fields are required *</p>
      <button className='relative bottom-0 py-2.5 w-full rounded-b-lg bg-teal-500'
        onClick={() => handleSubmit()}>
        Submit
      </button>
    </div >
  )
}