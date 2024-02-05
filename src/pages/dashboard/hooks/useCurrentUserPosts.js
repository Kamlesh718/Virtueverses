import { useQuery } from "@tanstack/react-query";
import { getCurrentUserPosts } from "../../../services/apiPosts";
import { useUserData } from "../../../ui/useUserData";

export function useCurrentUserPost() {
  const { userId } = useUserData();
  const { isLoading, data, error } = useQuery({
    queryKey: ["currentUserPost"],
    queryFn: () => getCurrentUserPosts({ userId }),
  });

  return { isLoading, data, error };
}
