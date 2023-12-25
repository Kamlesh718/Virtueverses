import { ChatLeftHeart, Stars } from "styled-icons/bootstrap";
import { QuillPen } from "styled-icons/remix-line";
import FeaturedBlog from "../ui/FeaturedBlog";
import { blogs } from "../blogsTempData";

function Homepage() {
  const slogan = "Where Virtue Unveils Its Verses";
  const blogsData = blogs;
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
        <FeaturedBlog blogs={blogsData} numberOfBlogsToDisplay={9} />
      </div>
    </div>
  );
}

export default Homepage;
