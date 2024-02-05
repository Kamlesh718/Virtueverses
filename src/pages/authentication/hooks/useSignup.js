import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (user) => {
      toast.success("Verify your account for Login");
    },
  });

  return { signup, isLoading };
}
