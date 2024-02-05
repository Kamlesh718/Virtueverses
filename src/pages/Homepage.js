import { ChatLeftHeart, Stars } from "styled-icons/bootstrap";
import { QuillPen } from "styled-icons/remix-line";
import FeaturedBlog from "../ui/FeaturedBlog";
// import { blogs } from "../blogsTempData";

import { useFetchPosts } from "./dashboard/hooks/useFetchPosts";
import { SyncLoader } from "react-spinners";

function Homepage() {
  const { posts, isLoading, error } = useFetchPosts();

  if (isLoading)
    return (
      <div className="h-[100vh] bg-violet-200 flex items-center justify-center">
        <SyncLoader size={30} color="#210c41" />
      </div>
    );

  if (error) {
    console.error("Error fetching data:", posts.error);
    return <p>Error fetching data. Please try again.</p>;
  }

  const slogan = "Where Virtue Unveils Its Verses";

  return (
    <div className="mb-16">
      <h1 className="font-bold text-lg flex justify-center p-3 text-violet-950 font-mono tracking-normal hover:tracking-wider transition-all outline outline-violet-300 outline-1 sm:text-4xl md:max-lg:text-2xl  ">
        <span className="px-2">
          <QuillPen size="35" />
        </span>
        {slogan}
        <span className="px-2">
          <Stars size="35" />
        </span>
      </h1>

      <h2 className="flex justify-center pt-3 text-xl text-violet-950 font-mono font-semibold">
        <span className="animate-pulse">
          <ChatLeftHeart size="30" />
        </span>
        <span className="px-3">Top Posts</span>
      </h2>

      <div className="flex  justify-center">
        <FeaturedBlog blogs={posts} numberOfBlogsToDisplay={9} />
      </div>
    </div>
  );
}

export default Homepage;
