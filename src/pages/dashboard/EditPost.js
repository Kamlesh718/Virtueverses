import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogs } from "../../blogsTempData";
import { useCurrentUserPost } from "./hooks/useCurrentUserPosts";
import MyQuillEditor from "../../ui/MyQuillEditor";
import { useEditPost } from "./hooks/useEditPost";
import { BarLoader } from "react-spinners";
import { useUserData } from "../../ui/useUserData";

function EditPost() {
  const { fullName } = useUserData();

  const { data } = useCurrentUserPost();
  const { isLoading: isEditing, editPost } = useEditPost();
  const { userId: postId } = useParams();
  const post = data.find((blog) => blog.id === parseInt(postId, 10));
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState("");

  const prevImagePath = post.image;

  const handleSubmit = function (e) {
    e.preventDefault();
    const formData = {
      id: postId,
      title,
      description,
      image,
      prevImagePath,
    };
    editPost(formData);
  };

  const handleTitle = function (e) {
    setTitle(e.target.value);
  };

  const handleDescription = function (content) {
    setDescription(content);
  };

  return (
    <>
      <form
        className="flex flex-col gap-2 text-violet-200 max-w-lg min-w-fit  mx-auto pb-32 h-[40vh]"
        onSubmit={handleSubmit}
      >
        {isEditing ? (
          <BarLoader size={25} />
        ) : (
          <>
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
              <label htmlFor="description" className="mb-1 font-semibold">
                Description
              </label>
              <MyQuillEditor value={description} onChange={handleDescription} />
            </div>

            <div className="flex flex-col">
              <label className="block font-semibold">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
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
          </>
        )}
      </form>
    </>
  );
}

export default EditPost;
