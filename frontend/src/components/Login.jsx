import { useState } from "react";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Login = ({ errMsg, handleLogin, handlePopup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email, password });
  }

  return (
    <div className="relative flex items-center justify-center py-12 px-4 h-full">
      <div className="absolute top-2 right-3 rounded-full bg-black">
        <IconButton
          className="text-xl font-bold text-white"
          onClick={() => handlePopup("login", "close")}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className="rounded-md shadow-md p-8 bg-white dark:bg-[#292929]">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Log in
          </h2>
        </div>
        {errMsg && <div className="mt-8 text-center text-red-500">{errMsg}</div>}
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
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
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md bg-black py-2 px-4 w-full text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;