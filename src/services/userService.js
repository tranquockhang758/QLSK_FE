import axios from "../axios";
// let axiosJWT = axios.create();
// axiosJWT.interceptors.request.use(async (config) => {
//   let date = new Date();
//   let decodedToken =
// });
const handleLogin = (email, password) => {
  return axios.post("api/auth/login", {
    email,
    password,
  });
};

const handleGetAllCompany = async (access_token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return axios.post("api/auth/readCompanyList");
};
const handleGetAllUsers = async (access_token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return axios.post("api/auth/readUser", {
    onUploadProgress: (progressEvent) => {
      console.log(
        progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              )
      );
    },
  });
};

const handleGetUserById = async (access_token, id) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return axios.post(`api/auth/readUserById/${id}`, {});
};

export const handleGetMe = async (access_token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return axios.post("api/auth/me");
};
export const HandleEditUserById = async (data, access_token, id) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post(`api/auth/updateUserByID/${id}`, data);
};

const createNewUser = async (data, access_token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post("api/auth/createUser", data);
};

const deleteUserById = async (id, access_token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post(`api/auth/deleteUserById/${id}`);
};

const CreatePost = async (data, access_token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post(`api/auth/createPost`, data);
};

const handleGetAllPost = async (access_token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post(`api/auth/readPost`);
};
const handleGetPostById = async (access_token, id) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post(`api/auth/readPostById/${id}`);
};
const updatePostById = async (access_token, data, id) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post(`api/auth/updatePostById/${id}`, data);
};

const deletePostById = async (access_token, id) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return await axios.post(`api/auth/deletePostById/${id}`);
};
export {
  handleLogin,
  handleGetAllUsers,
  handleGetUserById,
  createNewUser,
  deleteUserById,
  handleGetAllCompany,

  //===========================Read Post
  CreatePost,
  handleGetAllPost,
  handleGetPostById,
  updatePostById,
  deletePostById,
};
