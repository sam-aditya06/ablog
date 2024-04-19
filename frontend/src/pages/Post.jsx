import { useContext, useEffect, useState } from "react";

import axios from "axios";
import {format} from 'date-fns';
import { Link, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { UserContext } from "../utils/userModeContext";

const Post = () => {
  const [post, setPost] = useState({});

  const {user} = useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/post/get/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }, [id]);

  return (
    <>
      {Object.keys(post).length > 0 && (
        <div className="flex flex-col gap-4 py-4 px-4 min-h-[calc(100dvh-4rem)] md:px-20 dark:bg-[#292929] dark:text-white">
          <div className="flex items-center text-xl font-bold">
            <div>{post.title}</div>
            {user._id === post.author._id && <Link className="ml-auto" to={`/edit/${post._id}`}><IconButton className="bg-black text-white hover:bg-black"><EditIcon /></IconButton></Link>}
          </div>
          <div className="flex gap-2 items-center ml-4 text-sm dark:text-gray-300">
            <img
              className="rounded-full w-6 h-6"
              src={post.author.image}
              alt=""
            />

            <div className="font-semibold">{post.author.name}</div>
            <div className="mt-1 text-xs">{format(new Date(post.createdAt), 'dd MMM, yyyy hh:mm')}</div>
          </div>
          <div className="self-center flex w-full">
            <img className="w-full object-cover" src={post.image} alt="" />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      )}
    </>
  );
};

export default Post;
