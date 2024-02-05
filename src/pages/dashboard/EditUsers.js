import { useParams } from "react-router-dom";
import { blogs } from "../../blogsTempData";
import { useState } from "react";

function EditUsers() {
  const blogsData = blogs;
  const { userId } = useParams();
  const username = blogsData.find((blog) => blog.id === parseInt(userId, 10));
  const [input, setInput] = useState(username.author);

  const handleSubmit = function (e) {
    e.preventDefault();
  };

  const [selectedOption, setSelectedOption] = useState("No");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInput = function (e) {
    setInput(e.target.value);
  };
  return (
    <>
      <form
        className="flex flex-col gap-2 text-violet-200 max-w-lg min-w-fit  mx-auto pb-32 h-[40vh]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="title"
            placeholder="Username"
            value={input}
            onChange={handleInput}
            className="w-full px-3 py-1 rounded-md border border-violet-700 focus:outline-none focus:border-violet-900 text-violet-950 "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-semibold ">
            Admin
          </label>
          <select
            className="text-violet-950"
            value={selectedOption}
            onChange={handleChange}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
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

export default EditUsers;
