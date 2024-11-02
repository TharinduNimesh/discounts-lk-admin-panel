export default defineNuxtRouteMiddleware(async (to, from) => {
  /* 
        if user has not logged in, redirect to login page
        but user has access to shop, and /login /register pages
    */
  if (!to.path.includes("/app")) return;

  // check if user is admin
  const { data: isAdmin } = await useSupabase().rpc("is_admin_user");
  if (isAdmin) return;

  return navigateTo("/");
});
