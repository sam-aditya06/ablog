import { forwardRef, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import CustomQuill from "../components/CustomQuill";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState({});
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [snackbarInfo, setSnackbarInfo] = useState({
    severity: "",
    msg: "",
  });

  const { vertical, horizontal, open } = state;

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/post/edit/${id}`).then(res => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setSummary(res.data.summary);
        setContent(res.data.content);
        // console.log(typeof(null));
        setFiles(res.data.image);
    }).catch((err) => {
        alert(err.response.data);
        navigate('/');
    })
  }, [id, navigate])

  function handleClose() {
    setState({ ...state, open: false });
    navigate('/');
  }


  function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("id", id);
    data.set("title", title);
    data.set('author', JSON.stringify(author));
    data.set("summary", summary);
    data.set("content", content);
    if(typeof(files) === 'string')
        data.set('file', files);
    else
        data.set("file", files[0]);
        
    axios.put('/post', data)
    .then((res) => {
      setSnackbarInfo({ msg: res.data, severity: "success" });
      setState({ ...state, open: true });
    })
    .catch((err) => {
      setSnackbarInfo({ msg: res.response.data, severity: "error" });
      setState({ ...state, open: true });
    });
  }

  const uploadedImage =
    (typeof(files) !== 'string' && files?.length > 0) ? (
      <img className="h-20" src={URL.createObjectURL(files[0])} alt="" />
    ) : (
      <img className="h-20" src={files} alt="" />
    );

  return (
    <div className="p-8 min-h-[calc(100dvh-4rem)] dark:bg-[#292929]">
      <form className="flex flex-col gap-6" onSubmit={updatePost}>
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
            onChange={(e) => setFiles(e.target.files)}
          />
          <FileUploadIcon />
          <div>Upload a new photo</div>
        </label>
        <div>
          <CustomQuill content={content} setContent={setContent} />
        </div>
        <button className="self-center rounded-md bg-black py-3 px-5 w-fit text-white" type="submit">Update Post</button>
      </form>
      <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarInfo.severity}
            sx={{ width: "100%" }}
          >
            {snackbarInfo.msg}
          </Alert>
        </Snackbar>
    </div>
  );
};

export default EditPost;
