import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostAPI } from "../../../services/apiPosts";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: deletePostAPI,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["currentUserPost"] });
    },
    onError: (err) => toast.error("Unable to delete post", err.message),
  });

  return { deletePost, isLoading };
}
