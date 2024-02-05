import { useParams } from "react-router-dom";
import { Comment, Error, Heart, Share } from "styled-icons/boxicons-regular";
import { HeartFill } from "styled-icons/bootstrap";
import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { LoaderIcon } from "react-hot-toast";

import ProfileImage from "../ui/ProfileImage";
import Comments from "../ui/Comments";
import formatDate from "../utils/FormatDate";
import { useUserData } from "../ui/useUserData";
import { useSinglePost } from "./dashboard/hooks/useSinglePost";
import { useUpdateLikes } from "./dashboard/hooks/useUpdateLikes";
import { useUpdatePostLikes } from "./dashboard/hooks/useUpdatePostLikes";
import { useGetLikes } from "./dashboard/hooks/useGetLikes";

function SingleBlog() {
  const { id } = useParams();
  const { userId } = useUserData();
  const { updateLike } = useUpdateLikes();
  const { likes, isLoading: likeLoading } = useGetLikes(id);
  const { updatepostlike } = useUpdatePostLikes();
  const { blogsData, isLoading, error } = useSinglePost();

  const likedData = likes || [];
  const likedOrNot = likedData.map((l) => l);

  const [copyState, setCopyState] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [like, setLike] = useState(likedOrNot[0] || false);
  const [likeCount, setLikeCount] = useState(0);
  const commentsRef = useRef(null);
  const currentUrl = window.location.href;

  useEffect(() => {
    likedData.map((l) => setLike(l.liked));
  }, [likedData]);

  const blog =
    blogsData && blogsData.find((blog) => blog.id === parseInt(id, 10));

  useEffect(() => {
    if (blog) {
      setLikeCount(blog.likes_count);
    }
  }, [blog]);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data. Please try again.</p>;
  }

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

  const handleLike = function () {
    setLike((like) => !like);
    try {
      // Update the likes in the likes table
      const likeData = { post_id: id, user_id: userId, liked: !like };
      updateLike(likeData);

      // Update the likes in the posts table
      const updatedLikeCount = like ? likeCount - 1 : likeCount + 1;
      setLikeCount(updatedLikeCount);

      // Update the likes count in the posts table
      updatepostlike({ postId: id, likeCount: updatedLikeCount });
    } catch (error) {
      console.error("Error updating likes:", error.message);
      // Handle error or display a toast message
    }
    // like ? setLikeCount((l) => l - 1) : setLikeCount((l) => l + 1);
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
        <div className="shadow-2xl rounded-3xl sm:p-2 mx-4 ">
          <div className="flex justify-center p-2">
            <img
              src={blog.image}
              alt="thumbnail"
              className="h-[40vh] w-[60vh] rounded-2xl sm:w-[90vh] sm:h-[50vh]   "
            />
          </div>
          {}

          <div className="grid grid-cols-2 p-2 font-medium">
            <button
              className="px-4 hover:text-red-600 text-red-600 justify-center"
              onClick={handleLike}
            >
              {likeLoading ? (
                <LoaderIcon />
              ) : (
                <>{like ? <HeartFill size="30" /> : <Heart size="30" />}</>
              )}
              {/* <span className="font-bold px-2">{blog.likes}</span> */}
              <span className="font-bold px-2">{likeCount}</span>
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
            <span className="font-semibold text-xl sm:text-2xl bg-violet-700 text-violet-200 px-4 py-1 rounded-xl hover:text-violet-700 hover:bg-violet-200 transition duration-300  ">
              {blog.title}
            </span>

            {blog.description && (
              <div
                className="font-normal text-base text-violet-950"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></div>
            )}

            <span className="flex items-center gap-1 font-semibold italic text-xl  text-violet-950">
              <ProfileImage profileImageUrl={blog.user_profile_image} />
              {blog.author}
            </span>

            <span className="font-bold rounded-sm p-1">
              <span className="font-medium px-2 py-1 bg-violet-800 text-violet-200 rounded-full ">
                Uploaded on
              </span>
              <span className="p-2">{formatDate(blog.created_at)}</span>
            </span>
          </div>
        </div>
      </div>
      <div className={`${isVisible ? "hidden" : ""} `} ref={commentsRef}>
        <Comments post_id={id} />
      </div>
    </>
  );
}

export default SingleBlog;
