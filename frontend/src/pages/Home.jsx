import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import PostSnippet from "../components/PostSnippet";
import Skeleton from "../components/Skeleton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [pages, setPages] = useState(0);
  const [filterData, setFilterData] = useState({
    category: "Categories",
    textSearch: "",
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [isError, setIsError] = useState(false);

  const ref = useRef(null);
  const { pageNum } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const page = pageNum
    ? parseInt(pageNum)
    : location.search
    ? parseInt(location.search.substring(location.search.lastIndexOf("=") + 1))
    : 1;

  useEffect(() => {
    function handleClickOutside(e) {
      if (!ref.current?.contains(e.target)) {
        setShowDropDown(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    //Reset defaults
    window.scrollTo({ top: 0, behavior: "smooth" });
    allPosts.length > 0 && setAllPosts([]);
    const category = !location.search?.includes("category=Categories")
      ? location.search
          .substring(
            location.search.indexOf("=") + 1,
            location.search.indexOf("&value")
          )
          .replaceAll("%20", " ")
      : "";
    const value = !location.search?.includes("value=none")
      ? location.search
          .substring(
            location.search.indexOf("value=") + 6,
            location.search.lastIndexOf("&")
          )
          .replaceAll("%20", " ")
      : "";
    setFilterData((prev) => ({
      ...prev,
      textSearch: value ? value : "",
      category: category ? category : "Categories",
    }));

    if (location.search) {
      axios(
        `/search?category=${
          category ? encodeURIComponent(category) : "Categories"
        }&value=${value ? encodeURIComponent(value) : "none"}&page=${page}`
      ).then((res) => {
        if (res.data.posts.length > 0) {
          setAllPosts(res.data.posts);
          setAllCategories(res.data.categories);
          setPages(res.data.pageCount);
          isError && setIsError(false);
        } else {
          setIsError(true);
        }
      });
    } else {
      axios
        .get(`/posts/${pageNum}`)
        .then((res) => {
          setAllPosts(res.data.posts);
          setAllCategories(res.data.categories);
          setPages(res.data.pageCount);
        })
        .catch((err) => {
          console(err.response);
        });
    }
  }, [location]);

  function handleFilter(e) {
    setFilterData({ ...filterData, category: e.target.innerText });
    navigate(
      `/search?category=${e.target.innerText}&value=${
        filterData.textSearch ? filterData.textSearch : "none"
      }&page=1`
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    filterData.textSearch
      ? navigate(
          `/search?category=${filterData.category}&value=${filterData.textSearch}&page=${page}`
        )
      : navigate("/");
  }

  return (
    <div className="flex flex-col items-center gap-4 min-h-[calc(100dvh-4rem)] dark:bg-[#292929]">
      <form
        className="fixed flex gap-2 items-center border-b px-2 w-full min-h-20 z-10 dark:bg-[#292929]"
        onSubmit={handleSubmit}
      >
        <div
          className="relative flex items-center border rounded-md ml-auto px-2 py-1.5 cursor-pointer dark:text-white"
          onClick={() => setShowDropDown(!showDropDown)}
          ref={ref}
        >
          <p>{filterData.category}</p>
          <ArrowDropDownIcon />
          {showDropDown && (
            <div className="absolute top-11 -left-[0.1rem] flex flex-col gap-2 max-h-52 text-sm overflow-y-auto dark:bg-[#383838]">
              {allCategories.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="px-2 dark:hover:bg-black"
                    onClick={(e) => handleFilter(e)}
                  >
                    {item.category}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <input
            className="rounded-md bg-transparent border p-1.5 focus:outline-none focus:border-blue-400 dark:text-white"
            type="text"
            placeholder="Search a blog..."
            onChange={(e) =>
              setFilterData({ ...filterData, textSearch: e.target.value })
            }
            value={filterData.textSearch}
          />
        </div>
        <Button type="submit" className="bg-black text-white hover:bg-black">
          Search
        </Button>
      </form>
      <div className="flex flex-col items-center gap-4 mt-16 p-8">
        {allPosts.length > 0 ? (
          allPosts.map((post) => <PostSnippet key={post._id} post={post} />)
        ) : (
          <Skeleton count={10} />
        )}
        {pages && (
          <div className="flex items-center gap-2">
            {page !== 1 && (
              <Link
                to={
                  location.search
                    ? `/search?category=${filterData.category}&value=${
                        filterData.textSearch
                      }&page=${page - 1}`
                    : `/page/${page - 1}`
                }
              >
                <IconButton className="flex justify-center bg-black hover:bg-black">
                  <ArrowBackIosIcon className="translate-x-1 text-white" />
                </IconButton>
              </Link>
            )}
            <div className="flex gap-2">
              {[...Array(pages)].map((_, i) => {
                return (
                  <Link key={i} to={`/page/${i + 1}`}>
                    <IconButton
                      className={`flex justify-center items-center rounded-full ${
                        i + 1 == page && "bg-black text-white"
                      } p-2 w-10 h-10 text-lg cursor-pointer dark:text-white`}
                    >
                      {i + 1}
                    </IconButton>
                  </Link>
                );
              })}
            </div>
            {page !== pages && (
              <Link
                to={
                  location.search
                    ? `/search?category=${filterData.category}&value=${
                        filterData.textSearch
                      }&page=${page + 1}`
                    : `/page/${page + 1}`
                }
              >
                <IconButton className="flex justify-center bg-black hover:bg-black">
                  <ArrowForwardIosIcon className="translate-x-0.5 text-white" />
                </IconButton>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
