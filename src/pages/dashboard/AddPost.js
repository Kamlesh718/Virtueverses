import { useState } from "react";

function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
  };

  const handleTitle = function (e) {
    setTitle(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDescription = function (e) {
    setDescription(e.target.value);
  };
  console.log(title, description, selectedOption);
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-violet-200 ">
        Add Post
      </h1>
      <form
        className="flex flex-col gap-2 text-violet-200 max-w-lg min-w-fit  mx-auto pb-32 h-[40vh]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            id="title"
            placeholder="Title"
            className="w-full px-3 py-1 rounded-md border border-violet-700 focus:outline-none focus:border-violet-900 text-violet-950 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="categories" className="mb-1 font-semibold">
            Category
          </label>
          <select
            id="categories"
            value={selectedOption}
            onChange={handleSelect}
            className="w-full px-3 py-1 rounded-md border border-violet-700 focus:outline-none focus:border-violet-900 text-violet-950"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
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
            className="p-2 rounded-md border border-violet-700 focus:outline-none focus:border-violet-900 text-violet-950 h-[16vh]"
          />
        </div>
        <div className="flex flex-col">
          <label className="block font-semibold">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-violet-200
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-violet-950 text-violet-200 py-2 px-4 rounded-full  hover:text-violet-950 hover:bg-violet-400 focus:outline-none focus:bg-violet-700"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default AddPost;
