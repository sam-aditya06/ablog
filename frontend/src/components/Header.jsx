import {useContext, useEffect, useRef, useState} from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../utils/userModeContext";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const ref = useRef(null);

  const { mode, setMode, user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)){
        setShowDropDown(false);
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [showDropDown]);

  function handlePopup(name, action) {
    if (action === "open") {
      document.body.style.overflow = "hidden";
      if (name === "login") setShowLogin(true);
      else setShowRegister(true);
      setShowDropDown(false);
    } else {
      document.body.style.overflow = "auto";
      if (name === "login") setShowLogin(false);
      else setShowRegister(false);
      errMsg && setErrMsg('');
    }
  }

  function handleRegister(details) {
    const data = new FormData();
    data.set('name', details.name);
    data.set('email', details.email);
    data.set('password', details.password);
    data.set('file', details.file[0]);
    axios.post("/register", data).then((res) => {
      setUser(res.data);
      handlePopup('register', 'close');
    });
  }

  function handleLogin(details) {
    axios.post("/login", details).then((res) => {
      setUser(res.data);
      handlePopup('login', 'close');
    }).catch((err) => {
      setErrMsg(err.response.data);
    });
  }

  function handleLogout(){
    axios.post('/logout').then(res => {
      if(res.status === 200){
        setUser(null);
        setShowDropDown(false);
        navigate('/');
      }
    })
  }

  function toggleMode() {
    if (mode === "light") {
      document.documentElement.classList.add("dark");
      setMode("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      setMode("light");
      localStorage.theme = "light";
    }
  }

  return (
    <div className="sticky top-0 flex items-center gap-6 bg-white shadow px-8 min-h-16 z-20 dark:bg-[#383838] dark:text-white">
      <Link to={'/'} className="rounded-md bg-black p-2 text-xl font-bold text-white cursor-pointer">ABlog</Link>
      <div className="ml-auto">
        <IconButton className="dark:text-white" onClick={toggleMode}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </div>
      <div className="relative" ref={ref}>
        <div className="rounded-full w-8 h-8 overflow-hidden">
          <IconButton
            className="p-0 dark:text-white"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            {user ? <img src={user.image.includes('http') ? user.image : `http://localhost:4000/${user.image}`} alt="" /> : <AccountCircleIcon className="w-8 h-8" />}
          </IconButton>
        </div>
        {showDropDown && (
          <div className="absolute top-12 -left-20 flex flex-col gap-2 rounded-md border shadow-md bg-white min-w-32 overflow-hidden animate-dropdownV1 dark:border-none dark:bg-[#484848]">
            {user ? (
              <>
              <Link to={'/create'}
                className="mt-3 pl-3 py-2 cursor-pointer hover:bg-black hover:text-white hover:dark:bg-[#232323]"
                onClick={() => setShowDropDown(false)}
              >
                Create Post
              </Link>
              <div
                className="mb-3 pl-3 py-2 cursor-pointer hover:bg-black hover:text-white hover:dark:bg-[#232323]"
                onClick={handleLogout}
              >
                Logout
              </div>
            </>
            ) : (
              <>
                <div
                  className="mt-3 pl-3 py-2 cursor-pointer hover:bg-black hover:text-white hover:dark:bg-[#232323]"
                  onClick={() => handlePopup("login", "open")}
                >
                  Login
                </div>
                <div
                  className="mb-3 pl-3 py-2 cursor-pointer hover:bg-black hover:text-white hover:dark:bg-[#232323]"
                  onClick={() => handlePopup("register", "open")}
                >
                  Register
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {(showLogin || showRegister) && (
        <div className="absolute inset-0 h-screen bg-gray-50 bg-opacity-80 backdrop-blur-sm dark:bg-[#383838] dark:bg-opacity-80">
          {showLogin && (
            <Login handlePopup={handlePopup} handleLogin={handleLogin} errMsg={errMsg} />
          )}
          {showRegister && (
            <Register
              handlePopup={handlePopup}
              handleRegister={handleRegister}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;