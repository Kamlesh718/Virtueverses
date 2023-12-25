import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useRegister() {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("Account successfully created,Verify your email address");
    },
  });

  return { register, isLoading };
}
