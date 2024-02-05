import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentAPI } from "../../../services/apiPosts";
import toast from "react-hot-toast";
import { useUserData } from "../../../ui/useUserData";

export function useDeleteComment() {
  // const { userId: user_id } = useUserData();
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isLoading } = useMutation({
    mutationFn: deleteCommentAPI,
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  return { deleteComment, isLoading };
}
