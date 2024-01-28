import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("/api/user_login", { email, password });
};

const handleGetAllUsers = (id) => {
  return axios.get(`/api/all-users?id=${id}`);
};

//================================================getUserJwt
const handleGetAllUserJWT = (accessToken) => {
  return axios.get("/api/users/read", {
    headers: { token: `Bearer ${accessToken}` },
  });
};

const handleRefreshToken = (id) => {
  return axios.post("/api/getToken", { id: id });
};

const handleAddNewUser = (data) => {
  return axios.post("/api/users/create", data);
};
const handleDeleteUser = (id) => {
  return axios.delete("/api/users/delete", {
    data: {
      id: id,
    },
  });
};
export const HandleEditUser = async (data) => {
  return await axios.put("/api/users/edit", data);
};
const getAllCodeService = async (type) => {
  return await axios.get(`/api/allcode?type=${type}`);
};
export {
  handleLogin,
  handleGetAllUsers,
  handleAddNewUser,
  handleDeleteUser,
  getAllCodeService,
  handleGetAllUserJWT,
  handleRefreshToken,
};
