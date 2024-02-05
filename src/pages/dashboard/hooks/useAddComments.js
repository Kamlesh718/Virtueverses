import { useMutation } from "@tanstack/react-query";
import { addComments } from "../../../services/apiPosts";
import toast from "react-hot-toast";

export function useAddComments() {
  const { mutate: addComment, isLoading } = useMutation({
    mutationFn: addComments,
    onSuccess: () => {
      toast.success("Comment added successfully!!");
    },
  });
  return { addComment, isLoading };
}
