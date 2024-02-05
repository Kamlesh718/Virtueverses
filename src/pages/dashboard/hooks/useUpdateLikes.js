import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateLikes } from "../../../services/apiPosts";
import toast from "react-hot-toast";

export function useUpdateLikes() {
  const { mutate: updateLike, isLoading } = useMutation({
    mutationFn: updateLikes,
  });

  return { updateLike, isLoading };
}
