import { Link } from "react-router-dom";
import { Heart } from "styled-icons/evil";
import formatDate from "../utils/FormatDate";
import ProfileImage from "../ui/ProfileImage";

function FeaturedBlog({ blogs, numberOfBlogsToDisplay }) {
  if (blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-gray-600">
          No blogs available at the moment.
        </p>
      </div>
    );
  }

  const blogsToDisplay = blogs
    .slice(0, numberOfBlogsToDisplay)
    .sort((a, b) => a.likes - b.likes);

  const truncateText = (text, maxLength = 30) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-8 lg:grid-cols-3 sm:w-4/5 lg:w-4/5 md:w-4/5 justify-center w-[70vh]">
      {blogsToDisplay.map((blog) => (
        <div key={blog.id} className="shadow-2xl rounded-xl p-3  ">
          <Heart size={25} />
          <span>{blog.likes_count}</span>
          <div className="flex justify-center  overflow-hidden hover:scale-110 transition duration-300 hover:grayscale">
            <img
              src={blog.image}
              alt="thumnail"
              className="h-[30vh] w-10/12 rounded-2xl   "
            />
          </div>
          <div className="grid justify-left gap-1 px-7 mt-2 mb-2">
            <Link
              className="font-semibold text-md bg-violet-700 text-violet-200 px-4 py-1 rounded-xl hover:text-violet-700 hover:bg-violet-200 transition duration-300"
              to={`/singleblog/${blog.id}`}
            >
              {blog.title}
            </Link>
            <Link
              className="font-normal text-base  text-violet-950"
              to={`/singleblog/${blog.id}`}
            >
              {truncateText(blog.description, 100) && (
                <span
                  className="font-normal text-base text-violet-950"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(blog.description, 50),
                  }}
                />
              )}
              {/* {truncateText(blog.description, 100)} */}
            </Link>
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
      ))}
    </div>
  );
}

export default FeaturedBlog;
