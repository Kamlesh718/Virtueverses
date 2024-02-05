import { useState } from "react";
import { blogs } from "../blogsTempData";
import FeaturedBlog from "../ui/FeaturedBlog";
import SearchBar from "../ui/SearchBar";
import { useFetchPosts } from "./dashboard/hooks/useFetchPosts";

function Blogs() {
  const { posts, isLoading, error } = useFetchPosts();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    console.error("Error fetching data:", posts.error);
    return <p>Error fetching data. Please try again.</p>;
  }

  const filteredBlogs = posts.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="flex justify-center w-full ">
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex  justify-center">
        <FeaturedBlog blogs={filteredBlogs} />
      </div>
    </>
  );
}

export default Blogs;
