import { useState } from 'react';
import { TagIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';


interface Props {
  index: number;
  tagItem: string;
  tagList: string[];
  setTagList: CallableFunction;

}

export const UpdateEventTag = (props: Props) => {
  const [updateTag, setUpdateTag] = useState('');
  const [edit, setEdit] = useState(false);

  const handleValidUpdate = (tag: string, updatedTag: string) => {
    if (updateTag === '') {
      props.setTagList(props.tagList.filter((item) => {
        return !(tag === item && updateTag === '');
      }));
      return true;
    };
    if (!props.tagList.includes(updateTag) || updateTag === tag) {
      props.setTagList(props.tagList.map(t => {
        return t === tag ? updatedTag : t
      }));
      setUpdateTag('');
      setEdit(!edit);
      return true;
    }
  }

  const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleValidUpdate(props.tagItem, updateTag);
  }

  return edit ? (
    <div key={props.index} className='flex justify-center items-center gap-1 py-0.5 px-2 box-border'>
      <input className='pl-1.5 outline-none bg-stone-300 text-zinc-900 rounded-sm'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateTag(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleUpdate(e)}
        value={updateTag} minLength={5} />
      <CheckIcon className='w-5 h-5 cursor-pointer'
        onClick={() => handleValidUpdate(props.tagItem, updateTag)} />
    </div>
  )
    : (
      <div key={props.index} className='flex justify-center items-center text-zinc-900 bg-stone-300 rounded-sm box-border'>
        <TagIcon className='w-5 h-5' />
        <p className='pl-1.5' onClick={() => {
          setUpdateTag(props.tagItem);
          setEdit(!edit);
        }}>{props.tagItem}</p>
        <XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => {
          props.setTagList(props.tagList.filter((item) => item !== props.tagItem));
        }} />
      </div>
    )
}