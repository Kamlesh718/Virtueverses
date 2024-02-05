import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getComments } from "../../../services/apiPosts";

export function useFetchComments() {
  const queryClient = useQueryClient();
  const { data: commentsFetch, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  return { commentsFetch, isLoading };
}
