import React, { Component, useRef } from "react";
import { connect } from "react-redux";

import "./CreatePost.scss";
import { Link } from "react-router-dom";
import Thumbnail from "../../../assets/images/image4x6.jpg";
import { toast } from "react-toastify";
import { CreatePost, handleGetAllUsers } from "../../../services/userService";
import axios from "axios";

import { error } from "../../../utils/constant";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
import _ from "lodash";
import {
  JoditCurrentActivity,
  JoditContentSolution,
  JoditApplySolution,
  JoditEfficient,
} from "./Jodit.js";

import { MdCloudUpload } from "react-icons/md";

//============================================Jodit Editorr

import { jwtDecode } from "jwt-decode";
import Progress from "../../inc/Progress.js";
import Select from "react-select";
import LogoutModal from "../../inc/LogoutModal.js";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "30px",
    height: "30px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      assistant: "",
      title: "",
      description: "",
      field: "",
      motherCompany: "",
      company: "",
      typeOfCompany: "",
      contentJodit_1: "",
      contentJodit_2: "",
      contentJodit_3: "",
      contentJodit_4: "",
      attachment: "",
      benefit: "",

      image: null,
      isLoadingPreloader: true,
      isShowPassword: false,
      error_image: "",
      arrUrlFile: [],
      countText: 0,
      error_author: {},
      error_assistant: {},
      error_title: {},
      error_description: {},
      error_field: {},
      error_jodit_1: {},
      error_jodit_2: {},
      error_jodit_3: {},
      error_jodit_4: {},
      error_jodit: {},
      error_typeOfCompany: {},
      error_company: {},
      error_benefit: {},
      error_attachment: {},

      numberOfUploadArea: 0,

      files: [],
      progress_file_1: 0,
      progress_file_2: 0,
      progress_file_3: 0,
      error_file_1: "",
      error_file_2: "",
      error_file_3: "",
      listUser: [],
      userInfo: {},

      listUserSameCompany: [],
      listUserAssistant: [],
      selectedUser: [],
      selectedAssistant: [],

      isOpenLogoutModal: false,
    };
    //=====================Tạo ref cho input
    this.inputReference = React.createRef();
    this.inputReference1 = React.createRef();
  }

  async componentDidMount() {
    //Call API
    let date = new Date();
    let newAccessToken =
      this.props.access_token !== "" ? this.props.access_token : "";
    let decodeToken = jwtDecode(newAccessToken);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        setTimeout(
          () => this.setState(() => ({ isLoadingPreloader: false })),
          500
        );
        this.setState({ userInfo: this.props.userInfo });
        let company = this.props.userInfo.company;
        let res = await handleGetAllUsers(newAccessToken);

        if (res && res.code === 200) {
          this.setState({ listUser: res.data });
          if (this.state.listUser.length > 0) {
            // let newArrUser = [{ value: "", label: "" }];
            let newArrUser = [];
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
              countText: 200 - this.state.description.length,
            });
          }
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
      let lengthText = e.target.value.length;
      let data = error.description;
      if (copyState[field] === "") {
        this.setState({ error_description: data, countText: 200 });
      } else {
        this.setState({ error_description: "", countText: 200 - lengthText });
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

    if (field === "benefit") {
      let data = error.benefit;
      if (copyState[field] === "") {
        this.setState({ error_benefit: data });
      } else {
        this.setState({ error_benefit: "" });
      }
    }
    if (field === "attachment") {
      let data = error.attachment;
      if (copyState[field] === "") {
        this.setState({ error_attachment: data });
      } else {
        this.setState({ error_attachment: "" });
      }
    }
  };

  ///==================================Tạo mới bài viết
  HandleCreatePost = async () => {
    let {
      author,
      title,
      contentJodit_1,
      contentJodit_2,
      contentJodit_3,
      contentJodit_4,
      description,
      field,
      typeOfCompany,
      company,
      arrUrlFile,
      selectedUser,
      selectedAssistant,
      benefit,
      attachment,
      error_author,
      error_title,
      error_description,
      error_field,
      error_jodit_1,
      error_jodit_2,
      error_jodit_3,
      error_jodit_4,
      error_typeOfCompany,
      error_company,
      error_file_1,
      error_file_2,
      error_file_3,
      error_benefit,
      error_attachment,
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
      //Xử lí lấy link file
      let newArrUrlFile = arrUrlFile.join("&&");
      let newArrAuthor = [];
      let newStringAuthor = "";
      let newArrAssistant = [];
      let newStringAssistant = "";

      //Xử lí lấy author
      if (selectedUser.length > 0) {
        for (let i = 0; i < selectedUser.length; i++) {
          newArrAuthor.push(selectedUser[i].value);
        }
        if (newArrAuthor.length > 0) {
          newStringAuthor = newArrAuthor.join("-");
        }
      }

      //Xử lí lấy assistant

      if (selectedAssistant.length > 0) {
        for (let i = 0; i < selectedAssistant.length; i++) {
          newArrAssistant.push(selectedAssistant[i].value);
        }
        if (newArrAssistant.length > 0) {
          newStringAssistant = newArrAssistant.join("-");
        }
      }

      //company
      let data = {
        author: newStringAuthor,
        title,
        assistant: newStringAssistant,
        content_1: contentJodit_1,
        content_2: contentJodit_2,
        content_3: contentJodit_3,
        content_4: contentJodit_4,
        description,
        typeOfField: typeOfCompany,
        company,
        uploadUrl: newArrUrlFile,
        category: field,
        benefit,
        attachment,
        view: 0,
      };
      // console.log(data);
      try {
        let access_token = this.props.access_token;
        let res = await CreatePost(data, access_token);
        if (res && res.code === 200) {
          this.props.history.push("/admin/post/list");
        } else if (res && res.code !== 200) {
          console.log(res.message);
          // toast.error("Create new user unsuccessfully", res.message);
        } else {
          console.log(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleShowPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  //Lấy data từ dưới component con và dưới component gọi hàm
  //Tình trạng hiện tại
  handleOnChangeCurrentActivityJodit = (data) => {
    let data_error = error.currentActivity;
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
  //Click Add File buutton
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
    let arrUrlFile = this.state.arrUrlFile;
    let numberOfUploadArea = this.state.numberOfUploadArea;
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
    this.setState({
      files: filter,
      arrUrlFile: [],
      numberOfUploadArea: numberOfUploadArea - 1,
    });
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
    let numberOfUploadArea = this.state.numberOfUploadArea;
    //Nếu render phần từ này ở vị trií thứ 2
    // if (lengthOfFiles > 0) {
    //   this.setState({ numberOfUploadArea: numberOfUploadArea - 1 });
    // }
    // if (lengthOfFiles === 0) {
    //   this.setState({ numberOfUploadArea: 0 });
    // }
    this.setState({ numberOfUploadArea: numberOfUploadArea - 1 });
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
            arrUrlFile.push(res.data.url);
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
    //Nếu có sự thay đổi của Select => Ta thực hiện cập nhật lại

    if (field === "assistant") {
      let arrUser = this.state.listUserAssistant;
      let newArrUser = arrUser.filter(
        (item) => item.value !== selectedOptions[0].value
      );
      //Ta phải  cập nhật lại selectedOptions
      this.setState({
        selectedAssistant: selectedOptions,
        listUserSameCompany: newArrUser,
      });
    }
    if (field === "author") {
      let arrUser = this.state.listUserSameCompany;
      let newArrUser = arrUser.filter(
        (item) => item.value !== selectedOptions[0].value
      );
      this.setState({
        selectedUser: selectedOptions,
        listUserAssistant: newArrUser,
      });
    }
    // this.setState({ setSelectedOptions: selectedOptions });
  };
  render() {
    let {
      progress,
      files,
      numberOfUploadArea,
      progress_file_1,
      progress_file_2,
      progress_file_3,
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
                              {/* <input
                                name="author"
                                type="text"
                                placeholder="Họ và tên"
                                className={
                                  _.isEmpty(this.state.error_author)
                                    ? "form-control shadow-none"
                                    : "form-control shadow-none active-error"
                                }
                                value={this.state.author}
                                onChange={(e) => {
                                  this.handleOnchange(e, "author");
                                }}
                              /> */}
                              <Select
                                options={this.state.listUserSameCompany}
                                isMulti
                                onChange={(e) => {
                                  this.handleMultiSelectChange(e, "author");
                                }}
                                value={this.state.selectedUser}
                                styles={customStyles}
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
                                styles={customStyles}
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
                            <div className="col-md-5 col-sm-5 input-select">
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
                            <div className="col-md-5 col-sm-5 input-select">
                              <select
                                className={
                                  _.isEmpty(this.state.error_field)
                                    ? "form-control shadow-none form-select-lg"
                                    : "form-control shadow-none form-select-lg active-error"
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
                                className="form-control shadow-none description"
                                rows="3"
                                value={this.state.description}
                                onChange={(e) =>
                                  this.handleOnchange(e, "description")
                                }
                                maxlength="200"
                              ></textarea>
                            </div>
                          </div>
                          <div className="row d-flex row-text-count">
                            <div className="col-md-8"></div>
                            <div className="col-md-4 text">
                              <span>
                                Còn lại {this.state.countText}/200 kí tự
                              </span>
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
                                          key={index + 1}
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
                                              this.handleRemoveDiv();
                                            }}
                                          >
                                            <i className="fa fa-trash icon-button"></i>
                                          </div>
                                        </li>
                                      ))}
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
                    onClick={this.HandleCreatePost}
                  >
                    Thêm bài viết
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

export default connect(mapStateToProps, mapDispatchToProps)(Create);
