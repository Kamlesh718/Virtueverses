import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Successfully Login!!");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoading };
}
