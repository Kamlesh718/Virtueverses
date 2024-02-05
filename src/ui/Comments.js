import { useEffect, useState } from "react";
import { Comment } from "styled-icons/boxicons-regular";
import "../../src/index.css";
import { useAddComments } from "../pages/dashboard/hooks/useAddComments";
import { useUserData } from "./useUserData";
import { useFetchComments } from "../pages/dashboard/hooks/useFetchComments";
import { SyncLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
import { Delete } from "styled-icons/material-rounded";
import { useDeleteComment } from "../pages/dashboard/hooks/useDeleteComment";

function Comments({ post_id }) {
  const [comments, setComments] = useState("");
  const { userId, fullName } = useUserData();
  const { addComment, isLoading: addingComments } = useAddComments();
  const { commentsFetch, isLoading: loadingComments } = useFetchComments();
  const { deleteComment, isLoading: deletingComments } = useDeleteComment();
  const queryClient = useQueryClient();

  const commentsss = commentsFetch || [];

  const handleChange = function (e) {
    setComments(e.target.value);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const commentData = {
      post_id,
      user_id: userId,
      content: comments,
      fullName,
    };
    addComment(commentData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
    });
    setComments("");
  };

  const handleDelete = function (id) {
    deleteComment({ id });
  };

  if (loadingComments)
    return (
      <div className="h-[100vh] bg-violet-200 flex items-center justify-center">
        <SyncLoader size={30} color="#210c41" />
      </div>
    );
  if (addingComments)
    return (
      <div className="h-[100vh] bg-violet-200 flex items-center justify-center">
        <SyncLoader size={30} color="#210c41" />
      </div>
    );
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
            {loadingComments ? (
              <SyncLoader size={30} color="#210c41" />
            ) : (
              commentsss.map((comment) => {
                return +post_id === comment.post_id ? (
                  <li
                    className="p-2 my-2 bg-violet-800 text-violet-300 rounded-lg"
                    key={comment.id}
                  >
                    {comment.content}
                    <br />
                    <span className="px-3 font-bold text-violet-200">
                      {" "}
                      - {comment.fullName}
                    </span>
                    {comment.user_id === userId ? (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        disabled={deletingComments}
                      >
                        <Delete size={25} />
                      </button>
                    ) : (
                      ""
                    )}
                  </li>
                ) : null;
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Comments;
