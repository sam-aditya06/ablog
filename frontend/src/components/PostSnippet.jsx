import {format} from 'date-fns';
import { Link } from 'react-router-dom';

const PostSnippet = (props) => {
  const {_id, title, author, summary, image, createdAt} = props.post;
  
  return (
    <div className='flex gap-4 rounded-md border p-2 w-[42rem] max-sm:flex-col max-sm:w-full dark:border-none dark:bg-[#383838]'>
        <Link className='max-sm:self-center max-sm:mt-2 min-w-48 w-48 h-48' to={`/post/${_id}`}><img className='w-full h-full object-cover' src={image} alt='' /></Link>
        <div className='grow flex flex-col gap-3'>
            <div className="max-sm:text-center text-lg font-bold dark:text-white"><Link to={`/post/${_id}`} className='hover:underline'>{title}</Link></div>
            <div className='max-sm:self-center flex items-center gap-2 text-xs'>
                <div><img className="rounded-full w-6 h-6" src={author.image} alt='' /></div>
                <div className='font-bold dark:text-white'>{author.name}</div>
                <div className='text-gray-500 dark:text-gray-400'>{format(new Date(createdAt), 'dd MMM, yyyy hh:mm')}</div>
            </div>
            <div className='text-sm dark:text-white'>
            <p className="line-clamp-2">{summary}</p>
            </div>
            <div className='flex justify-end mt-auto'>
                    <Link to={`/post/${_id}`}><button className='rounded-md bg-black px-3 pb-2 pt-1 text-white font-bold'>Read More</button></Link>
                </div>
        </div>
    </div>
  )
}

export default PostSnippet;