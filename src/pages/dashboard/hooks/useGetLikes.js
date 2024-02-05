import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../../../services/apiPosts";
import { useUserData } from "../../../ui/useUserData";

export function useGetLikes(postId) {
  const { userId } = useUserData();
  const {
    data: likes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["likes"],
    queryFn: () => getLikes({ userId, postId }),
  });

  return { likes, isLoading, error };
}
