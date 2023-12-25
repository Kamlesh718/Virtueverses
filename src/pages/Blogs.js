import { blogs } from "../blogsTempData";
import FeaturedBlog from "../ui/FeaturedBlog";
import SearchBar from "../ui/SearchBar";

function Blogs() {
  const blogsData = blogs;

  return (
    <>
      <div className="flex justify-center w-full ">
        <SearchBar />
      </div>
      <div className="flex  justify-center">
        <FeaturedBlog blogs={blogsData} />
      </div>
    </>
  );
}

export default Blogs;
