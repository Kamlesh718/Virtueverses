// import CategoriesDropdown from "../../ui/CategoriesDropdown";

import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useAddPost } from "./hooks/useAddPost";
import { BeatLoader } from "react-spinners";

import MyQuillEditor from "../../ui/MyQuillEditor";
import { useUserData } from "../../ui/useUserData";

function AddPost() {
  const {
    profileImage: user_profile_image,
    fullName: author,
    userId,
  } = useUserData();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [description, setDescription] = useState("");
  // const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [image, setImage] = useState("");

  const { addpost, isPosting } = useAddPost();

  const handleSubmit = async function (e) {
    const postData = {
      title,
      description,
      image,
      user_profile_image,
      author,
      userId,
    };
    if (!titleError) {
      addpost(postData);
    }
    setTitle("");
    setDescription("");
    setImage("");
    e.preventDefault();
  };

  const handleTitle = function (e) {
    setTitle(e.target.value);
    if (title.length > 60) {
      setTitleError("Title should be within 60 chars");
    } else {
      setTitleError(null);
    }
  };

  const handleDescription = function (content) {
    setDescription(content);
  };

  if (isPosting) {
    return <BeatLoader size={25} />;
  }

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-violet-200 ">
        Add Post
      </h1>
      <form
        className="flex flex-col gap-2 text-violet-200 max-w-lg min-w-fit  mx-auto pb-32 h-[40vh]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col ">
          <label htmlFor="title" className="mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            id="title"
            placeholder="Title"
            className={`w-full px-3 py-1 rounded-md border ${
              titleError ? "focus:border-red-600" : " border-violet-700"
            }  focus:outline-none focus:border-violet-900 text-violet-950 `}
          />
          {titleError && <p className="text-red-400 text-sm">{titleError}</p>}
        </div>

        {/* <div className="flex flex-col">
          <CategoriesDropdown
            onSelect={(categoryId) => setSelectedCategoryId(categoryId)}
          />
        </div> */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-semibold">
            Description
          </label>

          <MyQuillEditor value={description} onChange={handleDescription} />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-sm">
            <span className="">Choose Thumbnail photo</span>
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-violet-200
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 font-semibold
"
          />
        </div>
        <button
          type="submit"
          disabled={isPosting}
          className="bg-violet-950 text-violet-200 py-2 px-4 rounded-full  hover:text-violet-950 hover:bg-violet-400 focus:outline-none focus:bg-violet-700"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default AddPost;
