import { useParams } from "react-router-dom";
import { blogs } from "../blogsTempData";
import { Comment, Error, Heart, Share } from "styled-icons/boxicons-regular";
import Comments from "../ui/Comments";
import { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";

function SingleBlog() {
  const [copyState, setCopyState] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { id } = useParams();
  const commentsRef = useRef(null);
  const currentUrl = window.location.href;
  const blogsData = blogs;

  const blog = blogsData.find((blog) => blog.id === parseInt(id, 10));

  const scrollToComments = function () {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCommentVisibility = function () {
    setIsVisible((visible) => {
      if (visible) toast("🗨️ Comment box has been appeared below ");
      scrollToComments();
      return !visible;
    });
  };

  if (!blog) {
    return (
      <div className="flex justify-center p-12 font-bold text-2xl text-red-800   ">
        <span className="animate-ping">
          <Error size="100" />
        </span>
        Blog not found
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 my-8 justify-center h-auto sm:px-12 md:px-24  ">
        <div className="shadow-2xl rounded-3xl sm:p-2 p-8 mx-4 ">
          <div className="flex justify-center p-2">
            <img
              src={require("../thumbnail.jpg")}
              alt="thumbnail"
              className="h-[40vh] w-[60vh] rounded-2xl sm:w-[90vh] sm:h-[50vh]   "
            />
          </div>

          <div className="grid grid-cols-2 p-2 font-medium">
            <button className="px-4 hover:text-red-600 justify-center">
              <Heart size="35" />
              <span className="font-bold">{blog.likes}</span>
            </button>

            <div className="flex gap-8 justify-center">
              <CopyToClipboard
                text={currentUrl}
                onCopy={() => {
                  if (copyState) {
                    toast("Link has been copied share with your friends", {
                      icon: "📋",
                    });
                  }
                  setCopyState(true);
                }}
              >
                <button>
                  <Share size="35" />
                </button>
              </CopyToClipboard>

              <button id="comment-btn" onClick={handleCommentVisibility}>
                <Comment size="35" />
              </button>
            </div>
          </div>

          <div className="grid justify-left gap-4 px-7 mt-2 mb-2">
            <span className="font-semibold text-2xl bg-violet-700 text-violet-200 px-4 py-1 rounded-xl hover:text-violet-700 hover:bg-violet-200 transition duration-300">
              {blog.title}
            </span>

            <span className="font-normal text-base  text-violet-950">
              {blog.summary}
            </span>

            <span className="font-semibold italic text-xl  text-violet-950">
              - {blog.author}
            </span>

            <span className="font-bold rounded-sm p-1">
              <span className="font-medium px-2 py-1 bg-violet-800 text-violet-200 rounded-full ">
                Uploaded on
              </span>
              <span className="p-2">{blog.date}</span>
            </span>
          </div>
        </div>
      </div>
      <div className={`${isVisible ? "hidden" : ""} `} ref={commentsRef}>
        <Comments />
      </div>
    </>
  );
}

export default SingleBlog;
