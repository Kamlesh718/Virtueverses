import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPosts } from "../../../services/apiPosts";
import toast from "react-hot-toast";

export function useAddPost() {
  const queryClient = useQueryClient();

  const { mutate: addpost, isLoading: isPosting } = useMutation({
    mutationFn: addPosts,
    onSuccess: () => {
      toast.success("New Post Successfully created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPosting, addpost };
}
