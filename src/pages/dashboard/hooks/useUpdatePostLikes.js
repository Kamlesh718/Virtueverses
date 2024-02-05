import { useMutation } from "@tanstack/react-query";
import { updatePostLikes } from "../../../services/apiPosts";

export function useUpdatePostLikes() {
  const { mutate: updatepostlike, isLoading } = useMutation({
    mutationFn: updatePostLikes,
  });

  return { updatepostlike, isLoading };
}
