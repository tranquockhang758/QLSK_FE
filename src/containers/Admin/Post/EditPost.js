import React, { Component, useRef } from "react";
import { connect } from "react-redux";

import "./EditPost.scss";
import { Link } from "react-router-dom";

import {
  updatePostById,
  handleGetPostById,
  handleGetAllUsers,
} from "../../../services/userService";
import axios from "axios";

import { error } from "../../../utils/constant";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
import _ from "lodash";
import JoditEdit from "./JoditEdit.js";

import Select from "react-select";

import { MdCloudUpload } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
//============================================Jodit Editorr
import {
  JoditCurrentActivity,
  JoditContentSolution,
  JoditApplySolution,
  JoditEfficient,
} from "./JoditEdit.js";
import Progress from "../../inc/Progress.js";
import LogoutModal from "../../inc/LogoutModal.js";
import { toast } from "react-toastify";
class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      assistant: "",
      title: "",
      description: "",
      field: "",
      certificate: "",
      motherCompany: "",
      company: "",
      typeOfCompany: "",
      contentJodit_1: "",
      contentJodit_2: "",
      contentJodit_3: "",
      contentJodit_4: "",
      attachment: "",
      listUser: [],
      arrListUser: [],
      contentAfterCallApi: "",
      image: null,
      isLoadingPreloader: true,
      isShowPassword: false,
      error_image: "",
      arrUrlFile: [],
      arrFileAfterCallAPI: [],
      uploadUrl: "",
      arrDeleteFile: [],
      error_author: {},
      error_title: {},
      error_content: {},
      error_description: {},
      error_field: {},
      error_jodit_1: {},
      error_jodit_2: {},
      error_jodit_3: {},
      error_jodit_4: {},
      error_benefit: {},
      error_attachment: {},
      error_typeOfCompany: {},
      error_company: {},

      numberOfUploadArea: 0,

      files: [],
      progress_file_1: 0,
      progress_file_2: 0,
      progress_file_3: 0,
      error_file_1: "",
      error_file_2: "",
      error_file_3: "",

      listUserSameCompany: [],
      listUserAssistant: [],
      selectedUser: [],
      selectedAssistant: [],
    };
    //=====================Tạo ref cho input
    this.inputReference = React.createRef();
    this.inputReference1 = React.createRef();
  }
  buildArrNameFile = (arrUrlFile) => {
    //Thông số đầu vào muốn xây dựng là một mãng hoặc 1 chuỗi
    //Nếu là chuỗi convert thành mãng
    //chạy vòng for cập nhật biến
    let newArrFile = arrUrlFile;
    let arrayName = [];
    let newArrFileAfterCall = [{ name: "", value: "" }];
    newArrFile.map((item, index) => {
      //Cắt chuỗi http
      let newArrFileAfter = newArrFile[index].slice(44);
      arrayName.push(newArrFileAfter);
    });
    //Cập nhật lại mãng gồm value,name
    for (let i = 0; i < newArrFile.length; i++) {
      newArrFileAfterCall.push({
        value: newArrFile[i],
        name: arrayName[i],
      });
    }
    newArrFileAfterCall.shift();
    return newArrFileAfterCall;
  };
  //Lấy getListAuthor => Trả về list danh sách tác giả dựa vào mãng input đầu vào là id của user
  getListAuthor = (newStringAuthor) => {
    //newStringAuthor là mãng gồm 3 phần tử con
    let arrListUser = this.state.arrListUser.length
      ? this.state.arrListUser
      : "";
    let newArrAuthor = [];
    let listArrAuthor = [];
    let listArrAuthor1 = [];
    let listArrAuthor2 = [];

    //B1 kiểm tra xem mãng có không với mãng có dạng ["19-",,"24-25-"]
    // console.log("Check", StringListAuthor);
    if (newStringAuthor.length > 0) {
      newStringAuthor.pop();
      // Chay vòng for để chuyển id từ string thành int
      for (let i = 0; i < newStringAuthor.length; i++) {
        newArrAuthor.push(newStringAuthor[i]);
      }

      for (let i = 0; i < newArrAuthor.length; i++) {
        //Nếu trong mãng có nhiều hơn 1 phần tử
        let id = parseInt(newArrAuthor[i]);
        let user =
          arrListUser.length > 0
            ? arrListUser.filter((item) => item.id === id)
            : "";
        listArrAuthor.push({
          label: user ? user[0].name : "",
          value: user ? user[0].id : "",
        });
      }

      return listArrAuthor;
    }
  };
  getListAssistant = (StringListAssistant) => {
    let arrListUser = this.state.arrListUser.length
      ? this.state.arrListUser
      : "";
    let newStringAssistant = [];
    let newArrAssistant = [];
    let listArrAssistant = [];

    //B1 kiểm tra xem mãng có không với mãng có dạng ["19-",,"24-25-"]
    // console.log("Check", StringListAuthor);
    if (StringListAssistant.length > 0) {
      StringListAssistant.pop();
      for (let i = 0; i < StringListAssistant.length; i++) {
        //push vào mãng với id = id của listUser
        //Ta sẽ có mãng [[19],[24,25]] => dạng string
        newStringAssistant.push(StringListAssistant[i].split("-"));
      }
      // Chay vòng for để chuyển id từ string thành int
      for (let i = 0; i < newStringAssistant.length; i++) {
        newArrAssistant.push(
          newStringAssistant[i].filter((item) => item.length > 0)
        );
      }
      for (let i = 0; i < newArrAssistant.length; i++) {
        //Nếu trong mãng có nhiều hơn 1 phần tử
        let id = parseInt(newArrAssistant[i]);
        let user = arrListUser
          ? arrListUser.filter((item) => item.id === id)
          : "";
        listArrAssistant.push({
          label: user ? user[0].name : "",
          value: user ? user[0].id : "",
        });
        //Nếu mãng con gồm 2 tác giả trở lên
      }

      return listArrAssistant;
    }
  };
  handleGetPost = async () => {
    let id = this.props.match.params.id ? this.props.match.params.id : "";
    let userId = this.props.userInfo.id;
    let access_token = this.props.access_token;
    let res = await handleGetPostById(access_token, id);
    let company = this.props.userInfo.company;
    // console.log("Check state", this.state.arrListUser);
    if (res && res.code === 200) {
      //https://upload.httpbridge.com//uploads_file/
      let data = res.data;
      //Thực hiện tách chuỗi và lấy tên + url của data
      let arrFile = res.data.uploadUrl;
      let newArrFileAfterCall = [{ name: "", value: "" }];
      //Cắt chuỗi lấy từng phần tử file => push vào mãng
      let string = "https://upload.httpbridge.com//uploads_file//";
      let lengthOfString = string.length;
      let newArrFile = arrFile ? arrFile.split("*") : "";

      if (newArrFile !== "") {
        newArrFile = newArrFile.filter((item) => item.length !== 0);
      } else {
        return;
      }

      //Remove phần từ rỗng
      let arrayName = [];
      //Lấy tên file => Cắt http//upload
      newArrFile.map((item, index) => {
        let newArrFileAter = newArrFile[index].slice(lengthOfString);
        arrayName.push(newArrFileAter);
      });
      for (let i = 0; i < newArrFile.length; i++) {
        newArrFileAfterCall.push({
          value: newArrFile[i],
          name: arrayName[i],
        });
      }

      //Sau khi cập nhật xong ta thực hiện update vào state
      newArrFileAfterCall.shift();

      //============================Xử lí Author- Assistant

      let StringListAuthor = [];
      let StringListAssistant = [];
      let newStringAuthor = [];
      let newStringAssistant = [];

      let listArrAuthor = [];
      let listArrAssistant = [];
      StringListAuthor = data.author;
      StringListAssistant = data.assistant;
      newStringAuthor = StringListAuthor.split("-");
      newStringAssistant = StringListAssistant.split("-");

      listArrAuthor = this.getListAuthor(newStringAuthor);
      listArrAssistant = this.getListAssistant(newStringAssistant);
      console.log(listArrAuthor);
      //============================Xử lí Author- Assistant

      //Options của select là listUsersSameCompany
      //value của select là selectedUser => data.author => chuyển thành số
      //gọi API và set options cho assistant và author
      let newArrUser = [];
      if (this.state.listUser.length > 0) {
        let newListUser = this.state.listUser.filter(
          (item) => item.company === company
        );
        newListUser.map((item, index) => {
          newArrUser.push({ value: item.id, label: item.name });
        });
        this.setState({
          listUserSameCompany: newArrUser,
          listUserAssistant: newArrUser,
          company: this.props.userInfo.company,
        });
      }
      // console.log(selectedUser);
      this.setState({
        //Loại nhà máy typeOfCompany
        author: data.author,
        category: data.category,
        company: data.company,
        contentAfterCallApi: data.content,
        contentJodit_1: data.content_1,
        contentJodit_2: data.content_2,
        contentJodit_3: data.content_3,
        contentJodit_4: data.content_4,
        description: data.description,
        title: data.title,
        uploadUrl: data.uploadUrl,
        arrFileAfterCallAPI: newArrFileAfterCall,
        typeOfCompany: data.typeOfField,
        field: data.category,
        arrUrlFile: newArrFile,
        listUserSameCompany: newArrUser,
        listAssistantSameCompany: newArrUser,
        selectedUser: listArrAuthor,
        selectedAssistant: listArrAssistant,
        benefit: data.benefit,
        attachment: data.attachment,
        isOpenLogoutModal: false,
      });
    }
  };
  handleGetAllUsers = async () => {
    let access_token = this.props.access_token;
    let res = await handleGetAllUsers(access_token);
    if (res && res.code === 200) {
      let listUser = res.data;
      let arrListUser = [];
      if (listUser.length > 0) {
        listUser.map((item, index) => {
          arrListUser.push({
            id: item.id,
            name: item.name,
          });
        });
        this.setState({ arrListUser: arrListUser, listUser: res.data });
      }
    }
  };
  async componentDidMount() {
    //Call API ,Preloader

    let date = new Date();
    let access_token = this.props.access_token ? this.props.access_token : "";
    let decodeToken = jwtDecode(access_token);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        setTimeout(
          () => this.setState(() => ({ isLoadingPreloader: false })),
          500
        );
        try {
          this.handleGetAllUsers();
          this.handleGetPost();
        } catch (e) {
          console.log(e);
        }
      } else if (decodeToken.exp < date.getTime() / 1000) {
        this.setState({ isOpenLogoutModal: true });
        // return this.props.history.push("/admin/logout");
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchange = (e, field) => {
    let copyState = { ...this.state };
    copyState[field] = e.target.value;
    this.setState({ ...copyState });

    //===========================================Check lỗi name
    if (field === "author") {
      let data = error.author;
      if (copyState[field] === "") {
        this.setState({ error_author: data });
      } else {
        this.setState({ error_author: "" });
      }
    }

    //====================================================Kiểm tra email
    if (field === "title") {
      let data = error.title;
      if (copyState[field] === "") {
        this.setState({ error_title: data });
      } else {
        this.setState({ error_title: "" });
      }
    }

    //====================================================Kiểm tra content
    if (field === "content") {
      let data = error.content;
      if (copyState[field] === "") {
        this.setState({ error_content: data });
      } else {
        this.setState({ error_content: "" });
      }
    }

    //====================================================Kiểm tra subscription
    if (field === "description") {
      let data = error.description;
      if (copyState[field] === "") {
        this.setState({ error_description: data });
      } else {
        this.setState({ error_description: "" });
      }
    }

    if (field === "field") {
      let data = error.field;
      if (copyState[field] === "") {
        this.setState({ error_field: data });
      } else {
        this.setState({ error_field: "" });
      }
    }
    if (field === "typeOfCompany") {
      let data = error.typeOfCompany;
      if (copyState[field] === "") {
        this.setState({ error_typeOfCompany: data });
      } else {
        this.setState({ error_typeOfCompany: "" });
      }
    }
    if (field === "company") {
      let data = error.company;
      if (copyState[field] === "") {
        this.setState({ error_company: data });
      } else {
        this.setState({ error_company: "" });
      }
    }
  };

  ///==================================Tạo mới bài viết
  HandleUpdatePost = async () => {
    let {
      //Content
      author,
      title,
      assistant,
      contentJodit_1,
      contentJodit_2,
      contentJodit_3,
      contentJodit_4,
      description,
      attachment,
      benefit,
      field,
      typeOfCompany,
      company,
      arrUrlFile,
      selectedUser,
      selectedAssistant,
      arrFileAfterCallAPI,
      arrDeleteFile,
      error_author,
      error_title,
      error_description,
      error_field,
      error_jodit_1,
      error_jodit_2,
      error_jodit_3,
      error_jodit_4,
      error_benefit,
      error_attachment,
      error_typeOfCompany,
      error_company,
      error_file_1,
      error_file_2,
      error_file_3,
    } = this.state;

    if (
      (error_author &&
        error_title &&
        error_description &&
        error_field &&
        error_jodit_1,
      error_jodit_2,
      error_jodit_3,
      error_jodit_4,
      error_typeOfCompany &&
        error_company &&
        error_benefit &&
        error_attachment &&
        error_file_1) ||
      error_file_2 ||
      error_file_3
    ) {
      this.setState({ error_button: error.button });
    } else {
      try {
        let id = this.props.match.params.id ? this.props.match.params.id : "";
        let access_token = this.props.access_token;
        //Ta phải call api xóa trước
        //nếu tồn tại arrFileDelete => duyệt mãng xóa trên server => sau khi thành công ta thực hiện call api update state
        //Ta kiểm tra lần lượt từng file có tồn tại trên hệ thống không => nếu ko remove
        if (arrDeleteFile.length > 0) {
          let fd = new FormData();
          let url = "http://upload.httpbridge.com/delete_file.php";
          let stringUrl = "https://upload.httpbridge.com//uploads_file//";
          let lenghtOfString = stringUrl.length;
          for (let i = 0; i < arrDeleteFile.length; i++) {
            let data = arrDeleteFile[i].slice(lenghtOfString);
            fd.append("filename", data);
            let res = await axios.post(url, fd);
            if (res && res.data.status === "success") {
              //Ta sẽ cập nhật lại state là arrUrlFile => gọi API update lại db
              let newUrlFileAfterDelete = arrUrlFile.filter(
                (item) => item !== arrDeleteFile[i]
              );
              let newArrFile = newUrlFileAfterDelete.join("*");
              let newArrAuthor = [];
              let newStringAuthor = "";
              let newArrAssistant = [];
              let newStringAssistant = "";

              if (selectedUser.length > 0) {
                for (let i = 0; i < selectedUser.length; i++) {
                  newArrAuthor.push(selectedUser[i].value);
                }
                if (
                  newArrAuthor.length > 0 &&
                  newArrAssistant.length.length >= 2
                ) {
                  newStringAuthor = newArrAuthor.join("-");
                } else if (
                  newArrAuthor.length > 0 &&
                  newArrAuthor.length === 1
                ) {
                  newStringAuthor = newArrAuthor.join("-") + "-";
                }
              }
              // =================================================Xử lí lấy author
              // =================================================Xử lí lấy assistant
              if (selectedAssistant.length > 0) {
                for (let i = 0; i < selectedAssistant.length; i++) {
                  newArrAssistant.push(selectedAssistant[i].value);
                }
                if (
                  newArrAssistant.length > 0 &&
                  newArrAssistant.length.length > 2
                ) {
                  newStringAssistant = newArrAssistant.join("-");
                } else if (
                  newArrAssistant.length > 0 &&
                  newArrAssistant.length === 1
                ) {
                  newStringAssistant = newArrAssistant.join("-") + "-";
                }
              }
              let data = {
                author: newStringAuthor,
                assistant: newStringAssistant,
                title,
                content_1: contentJodit_1,
                content_2: contentJodit_2,
                content_3: contentJodit_3,
                content_4: contentJodit_4,
                description,
                benefit,
                attachment,
                typeOfField: typeOfCompany,
                company,
                uploadUrl: newArrFile,
                category: field,
              };
              let resUpdateDB = await updatePostById(access_token, data, id);
              if (resUpdateDB && resUpdateDB.code === 200) {
                // toast.success("Cập nhật bài viết thành công");
                this.props.history.push("/admin/post/list");
              }
            }
          }

          // let res = axios.post(url, data);
          //console.log(res);
          // for (let i = 0; i < arrDeleteFile.length; i++) {
          //   fd.append("filename", arrDeleteFile[i]);
          //   for (var pair of fd.entries()) {
          //     console.log(pair[0] + ", " + pair[1]);
          //   }
          // }
        }
        //Ta call API bình thường và redirect về  trang chủ
        else {
          let newArrFile = arrUrlFile.join("*");
          // =================================================Xử lí lấy author
          let newArrAuthor = [];
          let newStringAuthor = "";
          let newArrAssistant = [];
          let newStringAssistant = "";

          if (selectedUser.length > 0) {
            for (let i = 0; i < selectedUser.length; i++) {
              newArrAuthor.push(selectedUser[i].value);
            }
            if (newArrAuthor.length > 0 && newArrAssistant.length.length >= 2) {
              newStringAuthor = newArrAuthor.join("-");
            } else if (newArrAuthor.length > 0 && newArrAuthor.length === 1) {
              newStringAuthor = newArrAuthor.join("-") + "-";
            }
          }
          // =================================================Xử lí lấy author
          // =================================================Xử lí lấy assistant
          if (selectedAssistant.length > 0) {
            for (let i = 0; i < selectedAssistant.length; i++) {
              newArrAssistant.push(selectedAssistant[i].value);
            }
            if (
              newArrAssistant.length > 0 &&
              newArrAssistant.length.length > 2
            ) {
              newStringAssistant = newArrAssistant.join("-");
            } else if (
              newArrAssistant.length > 0 &&
              newArrAssistant.length === 1
            ) {
              newStringAssistant = newArrAssistant.join("-") + "-";
            }
          }

          // =================================================Xử lí lấy assistant

          let data = {
            author: newStringAuthor,
            assistant: newStringAssistant,
            title,
            content_1: contentJodit_1,
            content_2: contentJodit_2,
            content_3: contentJodit_3,
            content_4: contentJodit_4,
            description,
            benefit,
            attachment,
            typeOfField: typeOfCompany,
            company,
            uploadUrl: newArrFile,
            category: field,
          };

          let res = await updatePostById(access_token, data, id);
          if (res && res.code === 200) {
            this.props.history.push("/admin/post/list");
          } else {
            console.log(res);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleShowPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  //Click button và thêm div input
  handleAddFile = () => {
    this.setState({ numberOfUploadArea: this.state.numberOfUploadArea + 1 });
    for (let i = 0; i < this.state.numberOfUploadArea; i++) {
      return (
        <li className="list-item">
          <div className="title-file">
            <i className="fa fa-file icon-file"></i>
            <span className="file-name">Choosen File</span>
          </div>
          <div className="action-file">
            <i className="fa fa-trash icon-button"></i>
          </div>
        </li>
      );
    }
  };

  //Khi nhấn nút remove file ta xóa file trong biến files của form Data và xóa url nhận về
  //Xóa url nhận về đồng thời call api xóa luôn file trên server
  handleRemoveFile = (name, index) => {
    let arrFile = [];
    arrFile = this.state.files;
    let filter = arrFile.filter((item) => {
      return item.name !== name;
    });

    //Clear lỗi của file
    if (index === 0) {
      this.setState({ error_file_1: "" });
    }
    if (index === 1) {
      this.setState({ error_file_2: "" });
    }
    if (index === 2) {
      this.setState({ error_file_3: "" });
    }
    this.setState({ files: filter, arrUrlFile: [] });
  };

  //===========================Click button => trỏ tới input
  //Có 2 sự kiện là Nút add file và choosen file to upload
  //Ta tạo 2 function có chức năng như nhau để khi click vào button hoặc div trỏ về hàm này => input OnChange cùng thực
  // hiện trong 1 hàm

  setSelectedImage = (e) => {
    let files = this.state.files;
    files.push(e.target.files[0]);
    this.setState({ files: files });
  };
  fileUploadAction = () => this.inputReference.current.click();

  //Click nút add file
  fileUploadAction1 = () => this.inputReference1.current.click();
  fileUploadInputChange = (e) => {
    let filesArray = [...this.state.files];
    filesArray.push(e.target.files[0]);
    this.setState({
      files: filesArray,
      numberOfUploadArea: 0,
      image: e.target.files[0],
    });
  };
  //===========================Click button => trỏ tới input
  //Ta thực hiện remve div mới tạo
  handleRemoveDiv = (index) => {
    // this.setState({});
    //Kiểm tra nếu trong mãng có hoặc không có phần từ thứ length+1 => Thực hiện xóa
    let lengthOfFiles = this.state.files.length;
    //Nếu render phần từ này ở vị trií thứ 2
    if (lengthOfFiles > 0) {
      this.setState({ numberOfUploadArea: lengthOfFiles - 1 });
    }
    if (lengthOfFiles === 0) {
      this.setState({ numberOfUploadArea: 0 });
    }
    // console.log(lengthOfFiles - 1);
  };

  //Khi click button xóa ta chỉ xóa trên FE => Cập nhật lại state là arrUrlFile, arrUrlAfterCallAPI để render
  handleRemoveFileInServer = async (urlFile, name) => {
    try {
      //Value là link đến file
      //name tên
      //arrFileUrl là mãng chứa url của file trên server
      let arrUrlFile = this.state.arrUrlFile;
      let arrFileAfterCallAPI = this.state.arrFileAfterCallAPI;
      let arrDeleteFile = this.state.arrDeleteFile;
      if (arrUrlFile.includes(urlFile)) {
        let newArrFile = arrFileAfterCallAPI.filter(
          (item) => item.value !== urlFile
        );
        arrDeleteFile.push(urlFile);
        //Click nút đó xóa trên FE và cập nhật lại state để call API
        //Cập nhật lại arrUrlFile

        this.setState({
          arrFileAfterCallAPI: newArrFile,
          arrDeleteFile: arrDeleteFile,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  async uploadImage() {
    this.setState({ progress: 0 });
    let avartar = this.state.image;
    let files = this.state.files;
    let arrExtensions = ["jpg", "jpeg", "png", "docx", "pdf", "xlsx"];
    let url = "http://upload.httpbridge.com/upload_file.php";
    const fd = new FormData();
    let arrUrlFile = this.state.arrUrlFile;
    for (let i = 0; i < files.length; i++) {
      let extensions = files[i].name.split(".").pop().toLowerCase();
      let isExtension = arrExtensions.includes(extensions);
      let size = files[i].size;
      if (isExtension) {
        if (size < 10000000) {
          fd.append("avatar", files[i]);
          let res = await axios.post(url, fd, {
            onUploadProgress: (event) => {
              if (i === 0) {
                this.setState({
                  progress_file_1: Math.round(
                    (100 * event.loaded) / event.total
                  ),
                });
              }
              if (i === 1) {
                this.setState({
                  progress_file_2: Math.round(
                    (100 * event.loaded) / event.total
                  ),
                });
              }
              if (i === 2) {
                this.setState({
                  progress_file_3: Math.round(
                    (100 * event.loaded) / event.total
                  ),
                });
              }
            },
          });
          if (res && res.status === 200 && !res.data.error) {
            //Sau khi cập nhật lên server => Lấy được link
            //Sau khi call api thành công ta sẽ có uploadUrl
            arrUrlFile.push(res.data.url);
            //Ta có data ở arrayUrl nhưng ta phải cập nhật lại state arrUrlAfterCallAPI để render ra
            //Khi call xong API cập nhật state và thực hiện update
            this.setState({ arrUrlFile: arrUrlFile });
          }
        }
        ///===================================File size
        else {
          if (i === 0) {
            this.setState({ error_file_1: "File có độ lớn nhỏ hơn 10MB" });
          }
          if (i === 1) {
            this.setState({ error_file_2: "File có độ lớn nhỏ hơn 10MB" });
          }
          if (i === 2) {
            this.setState({ error_file_3: "File có độ lớn nhỏ hơn 10MB" });
          }
        }
      }
      ///===================================Đuôi file
      else {
        if (i === 1) {
          this.setState({
            error_file_1: `File ${avartar[i].name} không nằm trong đuôi file cho phép. Đuôi file có dạng:jpg,jpeg,png,word,pdf, xlsx`,
          });
        } else if (i === 2) {
          this.setState({
            error_file_2: `File ${avartar[i].name} không nằm trong đuôi file cho phép. Đuôi file có dạng:jpg,jpeg,png,word,pdf, xlsx`,
          });
        } else if (i === 3) {
          this.setState({
            error_file_3: `File ${avartar[i].name} không nằm trong đuôi file cho phép. Đuôi file có dạng:jpg,jpeg,png,word,pdf, xlsx`,
          });
        }
      }
    }
  }

  //======================================================Lấy url ảnh đại diện
  handleGetFilelUrl = async () => {
    this.uploadImage();
  };

  //Get size of File
  bytesToSize(bytes, decimals = 2) {
    if (!Number(bytes)) {
      return "0 Bytes";
    }

    const kbToBytes = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const index = Math.floor(Math.log(bytes) / Math.log(kbToBytes));

    return `${parseFloat((bytes / Math.pow(kbToBytes, index)).toFixed(dm))} ${
      sizes[index]
    }`;
  }
  handleMultiSelectChange = (selectedOptions, field) => {
    console.log(selectedOptions);
    if (field === "author") {
      this.setState({ selectedUser: selectedOptions });
    }
    if (field === "assistant") {
      this.setState({ selectedAssistant: selectedOptions });
    }
    // this.setState({ setSelectedOptions: selectedOptions });
  };
  //Lấy data từ dưới component con và dưới component gọi hàm
  //Tình trạng hiện tại
  handleOnChangeCurrentActivityJodit = (data) => {
    let data_error = error.currentActivity;
    console.log(data);
    if (data === "") {
      this.setState({ error_jodit_1: data_error });
    } else {
      this.setState({ error_jodit_1: "", contentJodit_1: data });
    }
  };

  //Nội dung giải pháp
  handleOnChangeContentSolutionJodit = (data) => {
    let data_error = error.contentSolution;
    if (data === "") {
      this.setState({ error_jodit_2: data_error });
    } else {
      this.setState({ error_jodit_2: "", contentJodit_2: data });
    }
  };

  //Áp dụng giải pháp
  handleOnChangeApplySolutionJodit = (data) => {
    let data_error = error.applySolution;
    if (data === "") {
      this.setState({ error_jodit_3: data_error });
    } else {
      this.setState({ error_jodit_3: "", contentJodit_3: data });
    }
  };

  //Hiệu quả mang lại
  handleOnChangeEfficientJodit = (data) => {
    let data_error = error.efficient;
    if (data === "") {
      this.setState({ error_jodit_4: data_error });
    } else {
      this.setState({ error_jodit_4: "", contentJodit_4: data });
    }
  };
  render() {
    let {
      progress,

      files,
      numberOfUploadArea,
      progress_file_1,
      progress_file_2,
      progress_file_3,
      arrFileAfterCallAPI,
    } = this.state;
    let arrLink = handleBuildBreadCrumb();

    return (
      <>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <LogoutModal
            className={"modalLogout"}
            isOpenLogoutModal={this.state.isOpenLogoutModal}
          />
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6"></div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    {arrLink &&
                      arrLink.length > 0 &&
                      arrLink.map((item, index) => {
                        return (
                          <Link
                            to={item.link}
                            key={index}
                            className={"breadcrumb-item"}
                          >
                            {item.text}
                          </Link>
                        );
                      })}
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          <section className="content">
            <div className="row d-flex">
              {/* //Form ở đây */}
              <div className="col-md-12">
                <div className="card card-primary d-flex card-create">
                  <div className="card-header">
                    <h3 className="card-title">Tạo mới sáng kiến</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* <div className="col-md-2"></div> */}
                      <div className="col-md-12 col-sm-12">
                        {/* //======================================tên sáng kiến */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Tên sáng kiến
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <input
                                name="title"
                                type="text"
                                placeholder="Tên sáng kiến"
                                className={
                                  _.isEmpty(this.state.error_title)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                value={this.state.title}
                                onChange={(e) => {
                                  this.handleOnchange(e, "title");
                                }}
                              />
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_title) ? (
                                <i className="fa fa-info-circle"></i>
                              ) : (
                                ""
                              )}
                              {this.state.error_title &&
                                Object.entries(this.state.error_title).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================tên sáng kiến */}
                        {/* //======================================Tác giả */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="author" className="">
                                Tên tác giả
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <Select
                                options={this.state.listUserSameCompany}
                                isMulti
                                onChange={(e) => {
                                  this.handleMultiSelectChange(e, "author");
                                }}
                                value={this.state.selectedUser}
                              />
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_author) ? (
                                <i className="fa fa-info-circle input-post"></i>
                              ) : (
                                ""
                              )}

                              {/* //Render lỗi tại đây */}
                              {this.state.error_author &&
                                Object.entries(this.state.error_author).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================tác giá*/}
                        {/* //======================================Người hỗ trợ */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="author" className="">
                                Người hỗ trợ
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <Select
                                options={this.state.listUserAssistant}
                                isMulti
                                onChange={(e) => {
                                  this.handleMultiSelectChange(e, "assistant");
                                }}
                                value={this.state.selectedAssistant}
                              />
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_author) ? (
                                <i className="fa fa-info-circle input-post"></i>
                              ) : (
                                ""
                              )}

                              {/* //Render lỗi tại đây */}
                              {this.state.error_author &&
                                Object.entries(this.state.error_author).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================Người hỗ trợ*/}
                        {/* //======================================Loại nhà máy - lĩnh vực*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Loại nhà máy
                              </label>
                            </div>
                            <div className="col-md-4 col-sm-5 input-select">
                              <select
                                onChange={(e) => {
                                  this.handleOnchange(e, "typeOfCompany");
                                }}
                                value={this.state.typeOfCompany}
                                className={
                                  _.isEmpty(this.state.error_typeOfCompany)
                                    ? "form-control shadow-none form-select"
                                    : "form-control shadow-none form-select active-error"
                                }
                              >
                                <option value={""}>
                                  Chọn loại hình nhà máy
                                </option>
                                <option value={"HPC"}>Thủy điện</option>
                                <option value={"TPC"}>Nhiệt điện</option>
                                <option value={"SP"}>
                                  Năng lượng mặt trời
                                </option>
                                <option value={"WP"}>Năng lượng gió</option>
                                <option value={"NPP"}>Điện hạt nhân</option>
                              </select>
                              {!_.isEmpty(this.state.error_typeOfCompany) ? (
                                <i class="fa fa-info-circle error-info-select"></i>
                              ) : (
                                ""
                              )}
                              {this.state.error_typeOfCompany &&
                                Object.entries(
                                  this.state.error_typeOfCompany
                                ).map(([key, value]) => (
                                  <span key={key} className="error">
                                    {value}
                                  </span>
                                ))}
                            </div>
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Lĩnh vực
                              </label>
                            </div>
                            <div className="col-md-4 col-sm-5 input-select">
                              <select
                                className={
                                  _.isEmpty(this.state.error_field)
                                    ? "form-control shadow-none form-select"
                                    : "form-control shadow-none form-select active-error"
                                }
                                value={this.state.field}
                                onChange={(e) => {
                                  this.handleOnchange(e, "field");
                                }}
                              >
                                <option value={""}>
                                  Chọn lĩnh vực sáng kiến
                                </option>
                                <option value={"IT"}>
                                  Công nghệ thông tin
                                </option>
                                <option value={"DCS/SCADA"}>DCS/SCADA</option>
                                <option value={"Mechanical"}>Cơ khí</option>
                                <option value={"Auto"}>
                                  Điện - tự động hóa
                                </option>
                                <option value={"HC"}>Hành chính</option>
                              </select>

                              {!_.isEmpty(this.state.error_field) ? (
                                <i class="fa fa-info-circle error-info-select"></i>
                              ) : (
                                ""
                              )}
                              {this.state.error_field &&
                                Object.entries(this.state.error_field).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================Loại nhà máy - lĩnh vực*/}

                        {/* //======================================Mô tả ngắn*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Mô tả ngắn
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <textarea
                                className="form-control shadow-none"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={this.state.description}
                                onChange={(e) =>
                                  this.handleOnchange(e, "description")
                                }
                              ></textarea>
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-1"></div>
                            <div className="col-md-11">
                              {this.state.error_description &&
                                Object.entries(
                                  this.state.error_description
                                ).map(([key, value]) => (
                                  <span key={key} className="error">
                                    {value}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                        {/* //======================================Mô tả ngắn*/}

                        {/* //======================================company */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="company" className="">
                                Nhà máy
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <input
                                name="company"
                                type="text"
                                placeholder="Họ và tên"
                                className={
                                  _.isEmpty(this.state.error_company)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                value={this.state.company}
                                onChange={(e) => {
                                  this.handleOnchange(e, "company");
                                }}
                              />

                              {!_.isEmpty(this.state.error_company) ? (
                                <i class="fa fa-info-circle "></i>
                              ) : (
                                ""
                              )}
                              {this.state.error_company &&
                                Object.entries(this.state.error_company).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================company */}

                        {/* //======================================content1 - Tình trạng kĩ thuật */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Tình trạng kỹ thuật
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <JoditCurrentActivity
                                handleOnChangeCurrentActivityJodit={
                                  this.handleOnChangeCurrentActivityJodit
                                }
                                contentJodit_1={this.state.contentJodit_1}
                              />
                              {this.state.error_jodit_1 &&
                                Object.entries(this.state.error_jodit_1).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================content1 - Tình trạng kĩ thuật */}

                        {/* //======================================content2 - Nội dụng giải pháp*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Nội dung giải pháp
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <JoditContentSolution
                                handleOnChangeContentSolutionJodit={
                                  this.handleOnChangeContentSolutionJodit
                                }
                                contentJodit_2={this.state.contentJodit_2}
                              />
                              {this.state.error_jodit_2 &&
                                Object.entries(this.state.error_jodit_2).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================content2 - Nội dụng giải pháp */}
                        {/* //======================================content3 - Áp dụng giải pháp */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Áp dụng giải pháp
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <JoditApplySolution
                                handleOnChangeApplySolutionJodit={
                                  this.handleOnChangeApplySolutionJodit
                                }
                                contentJodit_3={this.state.contentJodit_3}
                              />
                              {this.state.error_jodit_3 &&
                                Object.entries(this.state.error_jodit_3).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================content3 - Áp dụng giải pháp */}
                        {/* //======================================content4 - hiệu quả thực tế */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Hiệu quả thực tế
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <JoditEfficient
                                handleOnChangeEfficientJodit={
                                  this.handleOnChangeEfficientJodit
                                }
                                contentJodit_4={this.state.contentJodit_4}
                              />
                              {this.state.error_jodit_3 &&
                                Object.entries(this.state.error_jodit_3).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================content4 - hiệu quả thực tế */}
                        {/* //======================================Lợi ích */}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Lợi ích
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <input
                                name="title"
                                type="text"
                                placeholder="Lợi ích mang lại"
                                className={
                                  _.isEmpty(this.state.error_benefit)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                value={this.state.benefit}
                                onChange={(e) => {
                                  this.handleOnchange(e, "benefit");
                                }}
                              />
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_benefit) ? (
                                <i className="fa fa-info-circle"></i>
                              ) : (
                                ""
                              )}
                              {this.state.error_benefit &&
                                Object.entries(this.state.error_benefit).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================Lợi ích */}
                        {/* //======================================Danh mục đính kèm*/}
                        <div className="form-group ">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-1">
                              <label htmlFor="inputName" className="">
                                Danh mục đính kèm
                              </label>
                            </div>
                            <div className="col-md-11 col-sm-11">
                              <textarea
                                className="form-control shadow-none"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={this.state.attachment}
                                onChange={(e) =>
                                  this.handleOnchange(e, "attachment")
                                }
                              ></textarea>
                            </div>
                          </div>
                          <div className="row d-flex">
                            <div className="col-md-1"></div>
                            <div className="col-md-11">
                              {this.state.error_attachment &&
                                Object.entries(this.state.error_attachment).map(
                                  ([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                        {/* //======================================Danh mục đính kèm*/}

                        {/* //======================================Upload file */}
                        <div className="form-group">
                          <div className="row d-flex">
                            <div className="col-md-1 col-sm-2">
                              <label htmlFor="inputName" className="">
                                Thêm file
                              </label>
                            </div>
                            <div className="col-md-8 upload">
                              <div className="row d-flex ">
                                {/*============================================= Content left */}
                                <div className="col-md-4 content-left-upload">
                                  <div className="image-upload">
                                    <MdCloudUpload
                                      color="#1475cf"
                                      size={60}
                                      onClick={this.fileUploadAction}
                                    />
                                  </div>
                                  <p className="text-upload">
                                    Drag and Drop file Or
                                  </p>
                                  <button
                                    className="input-choosen-file"
                                    onClick={this.fileUploadAction}
                                  >
                                    Choose File to Upload
                                  </button>
                                  <input
                                    type="file"
                                    className="input-field"
                                    hidden
                                    multiple
                                    ref={this.inputReference}
                                    onChange={this.fileUploadInputChange}
                                  />
                                  <br />
                                  <button
                                    className="button-add-upload mt-1"
                                    onClick={this.handleAddFile}
                                  >
                                    Add File
                                  </button>
                                  <button
                                    className="button-add-upload mt-1"
                                    // onClick={this.handleAddFile}
                                    onClick={this.handleGetFilelUrl}
                                  >
                                    <i className="fa fa-arrow-up mr-1"></i>
                                    Upload File
                                  </button>
                                </div>
                                {/*============================================= Content right */}
                                <div className="col-md-8 content-right d-flex">
                                  <ul className="file-list">
                                    {/* //===============================Render list item file tại đây */}
                                    {files.length > 0
                                      ? files.map((item, index) => {
                                          return (
                                            <>
                                              <li
                                                className="list-item"
                                                key={index}
                                              >
                                                {/* //==================Loaij file */}
                                                <div className="file-type">
                                                  <p className="">PDF</p>
                                                  <div className="title-file">
                                                    <span className="file-name">
                                                      {item.name}
                                                    </span>
                                                    <br />
                                                    <span className="file-capacity">
                                                      {this.bytesToSize(
                                                        item.size
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                                <div
                                                  className="action-file"
                                                  onClick={() => {
                                                    this.handleRemoveFile(
                                                      item.name,
                                                      index
                                                    );
                                                  }}
                                                >
                                                  <i className="fa fa-trash icon-button"></i>
                                                </div>
                                                {/* Progress bar for upload file 1 */}
                                              </li>
                                              <div className="info-upload">
                                                {/* //====================Lỗi file đầu tiên */}
                                                {index === 0 &&
                                                progress_file_1 > 0 ? (
                                                  <div className="progress mt-1">
                                                    <div
                                                      className="progress-bar progress-bar-info progress-bar-striped"
                                                      role="progressbar"
                                                      aria-valuenow={progress}
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                      style={{
                                                        width:
                                                          progress_file_1 + "%",
                                                      }}
                                                    >
                                                      {progress_file_1}%
                                                    </div>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                                <p className="error-image">
                                                  {index === 0 &&
                                                  this.state.error_file_1
                                                    ? this.state.error_file_1
                                                    : ""}
                                                </p>
                                                {/* //====================Lỗi file đầu tiên */}
                                                {/* //====================Lỗi file thứ 2  */}
                                                {index === 1 &&
                                                progress_file_2 > 0 ? (
                                                  <div className="progress mt-1">
                                                    <div
                                                      className="progress-bar progress-bar-info progress-bar-striped"
                                                      role="progressbar"
                                                      aria-valuenow={
                                                        progress_file_2
                                                      }
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                      style={{
                                                        width:
                                                          progress_file_2 + "%",
                                                      }}
                                                    >
                                                      {progress_file_2}%
                                                    </div>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                                <p className="error-image">
                                                  {index === 1 &&
                                                  this.state.error_file_2
                                                    ? this.state.error_file_2
                                                    : ""}
                                                </p>
                                                {/* //====================Lỗi file thứ 2 */}

                                                {/* //====================Lỗi file thứ 3  */}
                                                {index === 2 &&
                                                progress_file_3 > 0 ? (
                                                  <div className="progress mt-1">
                                                    <div
                                                      className="progress-bar progress-bar-info progress-bar-striped"
                                                      role="progressbar"
                                                      aria-valuenow={
                                                        progress_file_3
                                                      }
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                      style={{
                                                        width:
                                                          progress_file_3 + "%",
                                                      }}
                                                    >
                                                      {progress_file_3}%
                                                    </div>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                                <p className="error-image">
                                                  {index === 2 &&
                                                  this.state.error_file_3
                                                    ? this.state.error_file_3
                                                    : ""}
                                                </p>
                                                {/* //====================Lỗi file thứ 2 */}
                                              </div>
                                            </>
                                          );
                                        })
                                      : ""}

                                    {/* //==================Mảng ảo tạo div mới */}
                                    {numberOfUploadArea > 0 &&
                                      Array.from({
                                        length: this.state.numberOfUploadArea,
                                      }).map((_, index) => (
                                        <li
                                          className="list-item mt-1"
                                          key={index + 4}
                                        >
                                          <div className="file-type">
                                            <p className="">PDF</p>
                                            <div
                                              className="title-file"
                                              onClick={this.fileUploadAction1}
                                            >
                                              <span className="file-name">
                                                Choosen File
                                              </span>
                                              <br />
                                              <span className="file-capacity"></span>
                                            </div>
                                          </div>
                                          <div
                                            className="title-file"
                                            onClick={this.fileUploadAction1}
                                          >
                                            <input
                                              type="file"
                                              hidden
                                              ref={this.inputReference1}
                                              onChange={
                                                this.fileUploadInputChange
                                              }
                                            />
                                            <input hidden type="file" />
                                          </div>
                                          <div
                                            className="action-file"
                                            onClick={() => {
                                              this.handleRemoveDiv(index);
                                            }}
                                          >
                                            <i className="fa fa-trash icon-button"></i>
                                          </div>
                                        </li>
                                      ))}
                                    {arrFileAfterCallAPI.length > 0 &&
                                      arrFileAfterCallAPI.map((item, index) => {
                                        return (
                                          <li
                                            className="list-item mt-1"
                                            key={index + 5}
                                          >
                                            <div className="file-type">
                                              <p className="">PDF</p>
                                              <div className="title-file">
                                                <a href={item.value}>
                                                  <span className="file-name">
                                                    {item.name}
                                                  </span>
                                                </a>
                                                <br />
                                              </div>
                                            </div>

                                            <div
                                              className="action-file"
                                              onClick={() => {
                                                this.handleRemoveFileInServer(
                                                  item.value,
                                                  item.name
                                                );
                                              }}
                                            >
                                              <i className="fa fa-trash icon-button"></i>
                                            </div>
                                          </li>
                                        );
                                      })}
                                  </ul>

                                  {/*Khi có sự kiện Click add ta thực hiện thêm div*/}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* //======================================Upload file */}
                      </div>
                      {/* <div className="col-md-2"></div> */}
                    </div>
                  </div>
                  {/* //======================================content */}
                </div>
                <div className="card-footer footer-user">
                  <button
                    className="btn-sm btn-primary btn-add-user"
                    onClick={this.HandleUpdatePost}
                  >
                    Chỉnh sửa bài viết
                  </button>
                  {this.state.error_button &&
                    Object.entries(this.state.error_button).map(
                      ([key, value]) => (
                        <span key={key} className="error">
                          {value}
                        </span>
                      )
                    )}
                </div>
                {/* /.card-body */}
              </div>
              {this.state.isLoadingPreloader && <Progress />}
              {/* /.content */}
            </div>
          </section>

          {/* //===============================================Progress Icon */}
        </div>
        {/* /.content-wrapper */}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
