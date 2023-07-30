export default async function ({ store, route, redirect, app }) {
  const token = app.$cookies.get("token");
  const isLoggedIn = store.state.auth.isLoggedIn;
  const currentPath = route.path;
  const isRedirected = route.meta.some((meta) => meta.redirectedFrom);
  const requiresAuth =
    route.meta[0].requiresAuth === undefined
      ? true
      : route.meta[0].requiresAuth;

  if (isRedirected) {
    return;
  }

  if (requiresAuth) {
    if (!token && !isLoggedIn && currentPath !== "/login") {
      return redirect("/login");
    }
    if (token && currentPath === "/login") {
      await store.dispatch("auth/login", { token: token });
      return redirect("/");
    }
  } else {
    return;
  }
}
