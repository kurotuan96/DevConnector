import store from "@/store";

export const AuthGuard = async (to, from, next) => {
  try {
    if (!store.getters["auth/isAuthenticated"]) {
      next({ name: "Landing" });
      return;
    }
    next();
  } catch (e) {
    store.commit("auth/setLogout");
    next({ name: "Landing" });
    throw e;
  }
};
