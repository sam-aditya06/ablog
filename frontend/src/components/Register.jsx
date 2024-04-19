import { useState } from "react";

import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const Register = ({handlePopup, handleRegister}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState('');
  const [errMsg, setErrMsg] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    if(password !== confirmpassword)
      setErrMsg('Passwords don\'t match');
    else{
      handleRegister({name, email, password, file})
    }
    
  }

  const profilePic = file.length > 0 ? <img className="w-32 h-32" src={URL.createObjectURL(file[0])} alt="" /> : <AccountCircleIcon className="w-32 h-32" />;

  return (
    <div className="relative flex items-center justify-center py-12 px-4 h-full">
      <div className="absolute top-2 right-3 rounded-full bg-black"><IconButton className="text-xl font-bold text-white" onClick={() => handlePopup('register', 'close')}><CloseIcon /></IconButton></div>
      <div className="rounded-md shadow-md p-8 bg-white dark:bg-[#292929]">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Register
          </h2>
        </div>
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
          <div className="relative self-center">
            <div className="rounded-full bg-gray-300 w-32 h-32 overflow-hidden">
              {profilePic}
            </div>
            <div className="absolute bottom-0 -right-1 rounded-full bg-black p-2 cursor-pointer">
              <input type="file" id="upload-file" onChange={(e) => setFile(e.target.files)} hidden />
              <label htmlFor='upload-file' className="flex items-center cursor-pointer">
                  <EditIcon />
              </label>
            </div>
          </div>
          {errMsg && <div className="text-center text-[#F00]">{errMsg}</div>}
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="name"
                required
                className="border border-gray-300 bg-transparent px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500 dark:text-white"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="border border-gray-300 bg-transparent px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500 dark:text-white"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="border border-gray-300 bg-transparent px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500 dark:text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="border border-gray-300 bg-transparent px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500 dark:text-white"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="rounded-md bg-black py-2 px-4 w-full text-sm font-medium text-white hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;