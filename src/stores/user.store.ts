import type { IUser } from "@/types/user.interface";

export default defineStore("user", () => {
   const accessToken = ref<string>();
   const isLogin = ref<boolean>(false);

   const credentials = ref<IUser>();
   const isAuthLoading = ref<boolean>(true);

   const setAccessToken = (token: string) => {
      accessToken.value = token;
   };

   const setIsAuthLoading = (value: boolean) => {
      isAuthLoading.value = value;
   };

   const setUser = (user: IUser) => {
      credentials.value = user;
   };

   const logout = () => {
      accessToken.value = undefined;
      credentials.value = undefined;
      isLogin.value = false;
   };

   return {
      isLogin,
      credentials,
      accessToken,
      isAuthLoading,
      setIsAuthLoading,
      setUser,
      logout,
      setAccessToken,
   };
});
