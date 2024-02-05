import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../services/apiCategories";

export function useFetchCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    retry: false,
  });

  return { isLoading, error, categories };
}
