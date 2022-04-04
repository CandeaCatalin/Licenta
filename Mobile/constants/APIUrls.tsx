const baseUrl = "http://192.168.0.133:5004";
// const baseUrl = "";
export const endpoint = {
  login: baseUrl + "/api/authentication/user/login",
  logOut: baseUrl + "/api/authentication/logout",
  getUser: baseUrl + "/api/User/get",
  register: baseUrl + "/api/authentication/user/register",
};
