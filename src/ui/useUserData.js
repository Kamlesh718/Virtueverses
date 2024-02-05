import { useUser } from "../pages/authentication/hooks/useUser";

export function useUserData() {
  const { isLoading, user } = useUser();
  const fullName = user.user_metadata.fullName;
  const profileImage = user.user_metadata.profile_image_url;
  const userId = user.id;
  const email = user.email;

  return { isLoading, fullName, profileImage, userId, email };
}
