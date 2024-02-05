import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/apiPosts";

export function useSinglePost() {
  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return { blogsData, isLoading, error };
}
