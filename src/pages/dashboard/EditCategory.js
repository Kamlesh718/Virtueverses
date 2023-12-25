import { useState } from "react";
import { useParams } from "react-router-dom";
import { blogs } from "../../blogsTempData";

function EditCategory() {
  const blogsData = blogs;
  const { userId } = useParams();
  const data = blogsData.find((blog) => blog.id === parseInt(userId, 10));
  console.log(userId);
  const [category, setCategory] = useState(data.id);
  const [description, setDescription] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
  };

  const handleCategory = function (e) {
    setCategory(e.target.value);
  };

  const handleDescription = function (e) {
    setDescription(e.target.value);
  };
  console.log(category, description);
  return (
    <>
      <form
        className="flex flex-col gap-2 text-violet-200 max-w-lg min-w-fit  mx-auto pb-32 h-[40vh]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 font-semibold">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={handleCategory}
            id="title"
            placeholder="Category"
            className="w-full px-3 py-1 rounded-md border border-violet-700 focus:outline-none focus:border-violet-900 text-violet-950 "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescription}
            placeholder="Description"
            className="p-2 rounded-md border border-violet-700 focus:outline-none focus:border-violet-900 text-violet-950 h-[20vh]"
          />
        </div>

        <button
          type="submit"
          className="bg-violet-950 text-violet-200 py-2 px-4 rounded-full hover:text-violet-950 hover:bg-violet-400 focus:outline-none focus:bg-violet-700"
        >
          Submit
        </button>
      </form>
    </>
  );
}
export default EditCategory;
