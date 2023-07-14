export default function ({ $axios, app }) {
  $axios.defaults.headers.common["Content-Type"] = "application/json"; 
  $axios.interceptors.request.use((config) => {
    const token = app.$cookies.get("token");
    const excludedUrls = ["/auth/", "/user/profile/"];

    if (token && !excludedUrls.some((url) => config.url.includes(url))) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers.common["Authorization"];
    }
    return config;
  });
}
