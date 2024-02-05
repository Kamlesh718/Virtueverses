import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../../services/apiPosts";
import toast from "react-hot-toast";

export function useEditPost() {
  const queryClient = useQueryClient();

  const { mutate: editPost, isLoading } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["currentUserPost"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editPost, isLoading };
}
