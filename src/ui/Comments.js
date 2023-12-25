import { useState } from "react";
import { Comment } from "styled-icons/boxicons-regular";
import "../../src/index.css";

function Comments() {
  const [comments, setComments] = useState("");

  const handleChange = function (e) {
    setComments(e.target.value);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
  };
  console.log(comments);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center sm:p-20 py-20 px-4">
        <form className="flex flex-col pt-12 sm:pt-0" onSubmit={handleSubmit}>
          <span className="py-3">
            <Comment size="40" />
            <span className="font-semibold p-2">Comments</span>
          </span>
          <textarea
            type="text"
            placeholder="Enter your comments!!"
            value={comments}
            onChange={handleChange}
            className="p-1 caret-violet-950 focus:h-40 sm:h-40 h-8 textarea rounded-sm  border border-violet-700 focus:border-violet-900 focus:outline-none"
          />
          <button
            className={`p-2 w-full bg-violet-950 text-violet-400 my-2 hover:text-violet-300 transition-all visible"
            `}
          >
            Publish
          </button>
        </form>
        <div className=" overflow-y-scroll h-[40vh] ">
          <ul>
            <li className="p-2 my-2 bg-violet-800 text-violet-300 rounded-lg">
              Best Article ever seen! Best Article ever seen! Best Article ever
              seen! Best Article ever seen! Best Article ever seen!
              <br />
              <span className="px-3 font-bold text-violet-200"> - Kamlesh</span>
            </li>
            <li className="p-3 my-2 bg-violet-800 text-violet-300 rounded-lg">
              Best Article ever seen! Best Article ever seen! Best Article ever
              seen! Best Article ever seen! Best Article ever seen!
              <span className="px-3 font-bold text-violet-200"> - Kamlesh</span>
            </li>
            <li className="p-3 my-2 bg-violet-800 text-violet-300 rounded-lg">
              Best Article ever seen! Best Article ever seen! Best Article ever
              seen! Best Article ever seen! Best Article ever seen!
              <span className="px-3 font-bold text-violet-200"> - Kamlesh</span>
            </li>
            <li className="p-3 my-2 bg-violet-800 text-violet-300 rounded-lg">
              Best Article ever seen! Best Article ever seen! Best Article ever
              seen! Best Article ever seen! Best Article ever seen!
              <span className="px-3 font-bold text-violet-200"> - Kamlesh</span>
            </li>
            <li className="p-3 my-2 bg-violet-800 text-violet-300 rounded-lg">
              Best Article ever seen! Best Article ever seen! Best Article ever
              seen! Best Article ever seen! Best Article ever seen!
              <span className="px-3 font-bold text-violet-200"> - Kamlesh</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Comments;
