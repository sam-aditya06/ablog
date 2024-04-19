import { useState } from "react";

import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import CustomQuill from "../components/CustomQuill";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);

  function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);
    axios.post('/post', data).then(res => {
        console.log(res.data);
    })
  }

  const uploadedImage =
    file.length > 0 ? (
      <img className="h-20" src={URL.createObjectURL(file[0])} alt="" />
    ) : (
      ""
    );

  return (
    <div className="p-8 min-h-[calc(100dvh-4rem)] dark:bg-[#292929]">
      <form className="flex flex-col gap-6" onSubmit={createNewPost}>
        <div className="flex flex-col gap-3">
          <div className="text-xl dark:text-white">Title</div>
          <input
            type="text"
            className="border border-black rounded-md bg-transparent p-2 focus:outline-none focus:border-blue-800 dark:border-gray-600 dark:text-white"
            placeholder="what's this about..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-xl dark:text-white">Summary</div>
          <input
            type="text"
            className="border border-black rounded-md bg-transparent p-2 focus:outline-none focus:border-blue-800 dark:border-gray-600 dark:text-white"
            placeholder="boil it down for us..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-3 w-fit cursor-pointer dark:text-white">
          {uploadedImage}
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files)}
          />
          <FileUploadIcon />
          <div>Upload a photo</div>
        </label>
        <div>
          <CustomQuill content={content} setContent={setContent} />
        </div>
        <button className="self-center rounded-md bg-black py-3 px-5 w-fit text-white" type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
