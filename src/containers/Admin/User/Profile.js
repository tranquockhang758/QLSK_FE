import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Progress from "../../inc/Progress";
import Thumbnail from "../../../assets/images/image4x6.jpg";

import { checkEmail, checkMobile } from "../../Auth/RegEx";
import { toast } from "react-toastify";
import { HandleEditUserById, handleGetMe } from "../../../services/userService";
import axios from "axios";

import "./Profile.scss";

import { breadcrumb } from "../../../utils/constant";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";

import _ from "lodash";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { handleGetAllCompany } from "../../../services/userService";
import { jwtDecode } from "jwt-decode";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { error } from "../../../utils/constant";
import LogoutModal from "../../inc/LogoutModal.js";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      gender: "",
      name: "",
      birthday: "",
      mobile: "",
      thumbnailUrl: "",
      role: "",
      levelOfAdmin: "",
      position: "",
      certificate: "",
      motherCompany: "",
      company: "",
      department: "",
      listMotherCompany: [],
      currentFile: undefined,
      previewImage: undefined,
      image: null,
      isLoadingPreloader: true,
      isShowPassword: false,
      progress: 0,
      isOpenLogoutModal: false,
    };
  }

  async componentDidMount() {
    let date = new Date();
    let access_token = this.props.access_token ? this.props.access_token : "";
    let decodeToken = jwtDecode(access_token);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        this.handleGetAllCompany();
        try {
          let res = await handleGetMe(access_token);
          if (res) {
            let users = res;
            this.setState({
              email: users.email,
              gender: users.gender,
              name: users.name,
              birthday: users.birthday,
              mobile: users.mobile,
              role: users.role,
              levelOfAdmin: users.levelOfAdmin,
              position: users.position,
              certificate: users.certificate,
              motherCompany: users.motherCompany,
              company: users.company,
              department: users.department,
              thumbnailUrl: users.thumbnailUrl,
            });
          } else {
            console.log(res.message);
          }
        } catch (e) {
          console.log(e);
        }
      } else if (decodeToken.exp < date.getTime() / 1000) {
        this.setState({ isOpenLogoutModal: true });
        // return this.props.history.push("/admin/logout");
      }
    }
  }
  handleCheckInput = (data) => {
    let isValid = true;
    let arrInput = [
      "mobile",
      "name",
      "birthday",
      "gender",
      "role",
      "levelOfAdmin",
      "position",
      "certificate",
      "motherCompany",
      "company",
      "department",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!data[arrInput[i]]) {
        isValid = false;
        toast.error("Please to fill " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleOnChangeSelect = (e, field) => {
    let copyState = { ...this.state };
    copyState[field] = e.target.value;
    this.setState({ ...copyState });
    if (field === "gender") {
      let data = error.gender;
      if (copyState[field] === "") {
        this.setState({ error_gender: data });
      } else {
        this.setState({ error_gender: "" });
      }
    }
    if (field === "role") {
      let data = error.role;
      if (copyState[field] === "") {
        this.setState({ error_role: data });
      } else {
        this.setState({ error_role: "" });
      }
    }
    if (field === "motherCompany") {
      let data = error.motherCompany;
      if (copyState[field] === "") {
        this.setState({ error_motherCompany: data });
      } else {
        this.setState({ error_motherCompany: "" });
      }
    }

    if (field === "certificate") {
      let data = error.certificate;
      if (copyState[field] === "") {
        this.setState({ error_certificate: data });
      } else {
        this.setState({ error_certificate: "" });
      }
    }
  };
  handleOnchange = (e, field) => {
    let copyState = { ...this.state };
    copyState[field] = e.target.value;
    this.setState({ ...copyState });

    //===========================================Check lỗi name
    if (field === "name") {
      let data = error.name;
      if (copyState[field] === "") {
        this.setState({ error_name: data });
      } else {
        this.setState({ error_name: "" });
      }
    }

    //====================================================Kiểm tra email
    if (field === "email") {
      //Kiểm tra có để trống không
      let length = error.email.length;
      let format = error.email.format;
      let required = error.email.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      if (copyState[field] === "") {
        this.setState({ error_email: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 6 && copyState[field].length <= 32) {
          //Kiểm tra format
          //^[A-Za-z0-9_.]{6,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$
          let pattern_email = new RegExp(
            "^[a-zA-Z0-9_.+-]+@gmail.[a-zA-Z0-9-.]+$"
          );
          if (!pattern_email.test(copyState[field])) {
            delete data.length;
            delete data.required;
            this.setState({ error_email: data });
          } else {
            this.setState({ error_email: "" });
          }
        } else {
          delete data.required;
          this.setState({ error_email: data });
        }
      }
    }

    //====================================================Kiểm tra password

    //====================================================Kiểm tra mobile
    if (field === "mobile") {
      let length = error.mobile.length;
      let format = error.mobile.format;
      let required = error.mobile.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ error_mobile: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 10 && copyState[field].length <= 11) {
          //Kiểm tra format
          delete data.length;
          delete data.required;
          let pattern_mobile = new RegExp(
            "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$"
          );
          if (!pattern_mobile.test(copyState[field])) {
            this.setState({ error_mobile: data });
          } else {
            this.setState({ error_mobile: "" });
          }
        } else {
          delete data.required;
          this.setState({ error_mobile: data });
        }
      }
    }

    if (field === "birthday") {
      let required = error.birthday.required;
      let data = {
        required: required,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ error_birthday: data });
      } else {
        //Kiểm tra độ dài
        this.setState({ error_birthday: "" });
      }
    }

    if (field === "thumbnailUrl") {
      let data = error.thumbnailUrl;
      if (copyState[field] === "") {
        this.setState({ error_thumbnailUrl: data });
      } else {
        this.setState({ error_thumbnailUrl: "" });
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

    //Sau khi cập nhật state ta kiểm tra state email,password ,name,role,birthday
  };
  //==============================================get Image
  setSelectedImage = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  //======================================================Lấy url ảnh đại diện
  handleGetThumbnailUrl = async () => {
    this.uploadImage();
  };
  async uploadImage() {
    this.setState({ progress: 0 });
    let avartar = this.state.image;
    let extensions = avartar.name.split(".").pop().toLowerCase();
    let arrImage = ["jpg", "jpeg", "png", "word", "pdf"];
    let size = avartar.size;
    let isExtension = arrImage.includes(extensions);
    if (isExtension) {
      if (size < 2000000) {
        // Tên file có dạng name-time.đuôi file
        // Nếu file năm trong giới hạn cho phép ta đổi tên file đi
        let url = "http://upload.httpbridge.com/upload_image.php";
        const fd = new FormData();
        fd.append("avatar", avartar);
        let res = await axios.post(url, fd, {
          onUploadProgress: (event) => {
            this.setState({
              progress: Math.round((100 * event.loaded) / event.total),
            });
          },
        });
        if (res && res.status === 200) {
          this.setState({ thumbnailUrl: res.data.url });
        }
      } else {
        this.setState({ error_image: "File có độ lớn nhỏ hơn 2MB" });
      }
      //Nếu đúng đuối file rồi ta tiếp tục kiểm tra tiếp đến size
    } else {
      this.setState({ error_image: "Đuôi file có dạng:jpg,jpeg,png,word,pdf" });
    }
  }
  //==============================================get Image

  HandleEditAdmin = async () => {
    let {
      email,
      mobile,
      gender,
      name,
      birthday,
      role,
      levelOfAdmin,
      position,
      certificate,
      motherCompany,
      company,
      department,
      thumbnailUrl,
    } = this.state;
    let trueEmail = checkEmail(email);

    let trueMobile = checkMobile(mobile);
    let trueInput = this.handleCheckInput(this.state);
    if (trueEmail && trueMobile && trueInput) {
      let data = {
        email,
        mobile,
        gender,
        name,
        birthday,
        role,
        levelOfAdmin,
        position,
        certificate,
        motherCompany,
        company,
        department,
        thumbnailUrl,
      };
      try {
        let id = this.props.id;
        let access_token = this.props.access_token;
        let res = await HandleEditUserById(data, access_token, id);
        if (res && res.code === 200) {
          toast.success("Cập nhật tài khoản thành công");
          this.setState({
            email: "",
            passwordBefore: "",
            mobile: "",
            gender: "",
            name: "",
            birthday: "",
            role: "",
            levelOfAdmin: "",
            position: "",
            certificate: "",
            motherCompany: "",
            company: "",
            department: "",
            thumbnailUrl: "",
          });
          this.props.history.push("/admin/list-users");
        } else if (res && res.code !== 200) {
          toast.error(res.message);
          // toast.error("Create new user unsuccessfully", res.message);
        } else {
          toast.error(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleShowPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  handleGetAllCompany = async () => {
    let access_token = this.props.access_token;
    let res = await handleGetAllCompany(access_token);
    if (res && res.code === 200) {
      this.setState({ isLoadingPreloader: false });
      this.setState({ listCompany: res.data });
      if (this.state.listCompany) {
        let arrMotherCompany = [];
        this.state.listCompany.map((item, index) => {
          //Duyệt mãng và chạy vòng for để check xem phần tử nào chứa trong mãng
          arrMotherCompany.push(item.motherCompany);
        });
        if (arrMotherCompany.length > 0) {
          let newArrMotherCompany = [];
          for (let i = 0; i < arrMotherCompany.length; i++) {
            if (!newArrMotherCompany.includes(arrMotherCompany[i])) {
              newArrMotherCompany.push(arrMotherCompany[i]);
            }
          }
          this.setState({
            listMotherCompany: newArrMotherCompany,
          });
        }
      }
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let arrLink = handleBuildBreadCrumb();
    let { listMotherCompany } = this.state;
    return (
      <>
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
                  <div className="col-sm-6">
                    {/* <h3>Thông tin cá nhân</h3> */}
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      {arrLink &&
                        arrLink.length > 0 &&
                        arrLink.map((item, index) => {
                          let label = item.text;
                          return (
                            <Link
                              to={item.link}
                              key={index}
                              className={"breadcrumb-item"}
                            >
                              {breadcrumb.hasOwnProperty(item.text)
                                ? breadcrumb[label]
                                : breadcrumb[label]}
                            </Link>
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </section>
            <section className="content ">
              <div className="row d-flex">
                {/* //Form ở đây */}
                <div className="col-md-12">
                  <div className="card card-primary d-flex">
                    <div className="card-header">
                      <h3 className="card-title">Thông tin cá nhân</h3>
                      {/* <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                          title="Collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                      </div> */}
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-2">
                          {/* //==============================================Upload image in Here */}
                          <img
                            src={
                              this.state.thumbnailUrl
                                ? this.state.thumbnailUrl
                                : Thumbnail
                            }
                            alt={"none"}
                            className="img-thumbnail"
                          />
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-7">
                          {/* //======================================Họ tên */}
                          <div className="form-group">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="name" className="">
                                  Họ tên
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9">
                                <input
                                  name="name"
                                  type="text"
                                  className={
                                    _.isEmpty(this.state.error_name)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                  placeholder="Họ và tên"
                                  value={this.state.name}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "name");
                                  }}
                                />
                              </div>
                              {/* Hiển thị info khi có lỗi */}
                              {!_.isEmpty(this.state.error_name) ? (
                                <i className="fa fa-info-circle"></i>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
                                {/* //Render lỗi tại đây */}
                                {this.state.error_name &&
                                  Object.entries(this.state.error_name).map(
                                    ([key, value]) => (
                                      <span key={key} className="error">
                                        {value}
                                      </span>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                          {/* //======================================Họ tên */}
                          {/* //======================================email */}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  email
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9 input-email">
                                <input
                                  type="text"
                                  className={
                                    _.isEmpty(this.state.error_email)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                  placeholder="email"
                                  value={this.state.email}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "email");
                                  }}
                                />

                                {/* Hiển thị info khi có lỗi */}
                                {!_.isEmpty(this.state.error_email) ? (
                                  <i className="fa fa-info-circle error-info-email"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
                                {this.state.error_email &&
                                  Object.entries(this.state.error_email).map(
                                    ([key, value]) => (
                                      <span key={key} className="error">
                                        {value}
                                      </span>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                          {/* //======================================email*/}
                          {/* //======================================role*/}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  Vai trò
                                </label>
                              </div>
                              {/* //Ta render theo role của user */}
                              <div className="col-md-9 col-sm-9 input-select">
                                <select
                                  onChange={(e) => {
                                    this.handleOnChangeSelect(e, "role");
                                  }}
                                  value={this.state.role}
                                  className={
                                    _.isEmpty(this.state.error_role)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                >
                                  <option value={""}>Chọn vai trò</option>
                                  <option value={"Admin"}>Admin</option>
                                  <option value={"Moderator"}>Moderator</option>
                                  <option value={"User"}>User</option>
                                </select>
                                {/* Hiển thị info khi có lỗi */}
                                {!_.isEmpty(this.state.error_role) ? (
                                  <i className="fa fa-info-circle error-select"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
                                {this.state.error_role &&
                                  Object.entries(this.state.error_role).map(
                                    ([key, value]) => (
                                      <span key={key} className="error">
                                        {value}
                                      </span>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                          {/* //======================================role */}

                          {/* //======================================năm sinh */}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  Năm sinh
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9">
                                <input
                                  type="text"
                                  className={
                                    _.isEmpty(this.state.error_birthday)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                  placeholder="dd/mm/yyyy"
                                  value={this.state.birthday}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "birthday");
                                  }}
                                />

                                {/* Hiển thị info khi có lỗi */}
                                {!_.isEmpty(this.state.error_birthday) ? (
                                  <i class="fa fa-info-circle"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
                                {this.state.error_role &&
                                  Object.entries(this.state.error_birthday).map(
                                    ([key, value]) => (
                                      <span key={key} className="error">
                                        {value}
                                      </span>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                          {/* //======================================Năm sinh */}
                          {/* //======================================mobile */}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  Số điện thoại
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9">
                                <input
                                  type="text"
                                  className={
                                    _.isEmpty(this.state.error_mobile)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                  value={this.state.mobile}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "mobile");
                                  }}
                                />
                                {!_.isEmpty(this.state.error_mobile) ? (
                                  <i class="fa fa-info-circle error-info-mobile"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
                                {" "}
                                {this.state.error_mobile &&
                                  Object.entries(this.state.error_mobile).map(
                                    ([key, value]) => (
                                      <span key={key} className="error">
                                        {value}
                                      </span>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                          {/* //======================================mobile */}
                          {/* //======================================gender: Gọi API và render cho người dùng*/}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  Giới tính
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9 input-select">
                                <select
                                  onChange={(e) => {
                                    this.handleOnChangeSelect(e, "gender");
                                  }}
                                  value={this.state.gender}
                                  className={
                                    _.isEmpty(this.state.error_gender)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                >
                                  <option value={""}>Chọn giới tính</option>
                                  <option value={"Male"}>Nam</option>
                                  <option value={"Female"}>Nữ</option>
                                </select>
                                {!_.isEmpty(this.state.error_gender) ? (
                                  <i className="fa fa-info-circle error-select"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
                                {this.state.error_gender &&
                                  Object.entries(this.state.error_gender).map(
                                    ([key, value]) => (
                                      <span key={key} className="error">
                                        {value}
                                      </span>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                          {/* //======================================gender */}
                          {/* //======================================certificate: Gọi API và render cho người dùng*/}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  Trình độ chuyên môn
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9 input-select">
                                <select
                                  onChange={(e) => {
                                    this.handleOnChangeSelect(e, "certificate");
                                  }}
                                  value={this.state.certificate}
                                  className={
                                    _.isEmpty(this.state.error_certificate)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                >
                                  <option value={""}>
                                    Chọn trình độ chuyên môn
                                  </option>
                                  <option value={"College"}>Cao đẳng</option>
                                  <option value={"Bachelor"}>Đại học</option>
                                  <option value={"Master"}>Thạc sỹ</option>
                                  <option value={"Doctor"}>Tiến sỹ</option>
                                </select>
                                {!_.isEmpty(this.state.error_certificate) ? (
                                  <i className="fa fa-info-circle error-select"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
                                {this.state.error_certificate &&
                                  Object.entries(
                                    this.state.error_certificate
                                  ).map(([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                          {/* //======================================certificate */}
                          {/* //======================================motherCompany*/}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  Công ty trực thuộc
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9 input-select">
                                <select
                                  onChange={(e) => {
                                    this.handleOnChangeSelect(
                                      e,
                                      "motherCompany"
                                    );
                                  }}
                                  value={this.state.motherCompany}
                                  className={
                                    _.isEmpty(this.state.error_motherCompany)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                >
                                  <option value={""} key={0}>
                                    Chọn công ty trực thuộc
                                  </option>
                                  {listMotherCompany.map((item, index) => {
                                    return (
                                      <option
                                        value={item}
                                        key={index + 1}
                                        className="d-block"
                                      >
                                        {item}
                                      </option>
                                    );
                                  })}
                                </select>
                                {!_.isEmpty(this.state.error_motherCompany) ? (
                                  <i className="fa fa-info-circle error-select-motherCompany"></i>
                                ) : (
                                  ""
                                )}
                                {this.state.error_motherCompany &&
                                  Object.entries(
                                    this.state.error_motherCompany
                                  ).map(([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                          {/* //======================================motherCompany */}
                          {/* //======================================company */}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-3 col-sm-3">
                                <label htmlFor="inputName" className="">
                                  Nhà máy
                                </label>
                              </div>
                              <div className="col-md-9 col-sm-9">
                                <input
                                  type="text"
                                  className={
                                    _.isEmpty(this.state.error_company)
                                      ? "form-control"
                                      : "form-control active-error"
                                  }
                                  value={this.state.company}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "company");
                                  }}
                                />
                                {!_.isEmpty(this.state.error_company) ? (
                                  <i className="fa fa-info-circle "></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-3"></div>
                              <div className="col-md-9">
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
                        </div>
                      </div>
                    </div>
                    <div className="card-footer footer-user">
                      <button
                        className="btn-sm btn-primary btn-add-user"
                        onClick={this.HandleEditAdmin}
                      >
                        Cập nhật
                      </button>
                    </div>
                    {/* /.card-body */}
                  </div>

                  {/* /.card */}
                </div>
                {/* /.=====================================Progress Icon */}
                {this.state.isLoadingPreloader && <Progress />}
                {/* /.content */}
              </div>
            </section>
          </div>
          {/* /.content-wrapper */}
        </>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
    id: state.user.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
