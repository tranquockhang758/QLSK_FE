import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { HandleEditUserById } from "../../../services/userService";
import { checkPassword } from "../../Auth/RegEx";
import * as actions from "../../../store/actions/index";
import bcrypt from "bcryptjs";
import "./ChangePassword.scss";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
import { FormattedMessage } from "react-intl";
import { breadcrumb } from "../../../utils/constant";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Textarea from "@mui/joy/Textarea";
import _ from "lodash";
import { error } from "../../../utils/constant";
import Progress from "../../inc/Progress";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";
import LogoutModal from "../../inc/LogoutModal.js";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      users: {},
      isShowOldPassword: false,
      isShowNewPassword: false,
      isShowConfirmPassword: false,
      errorOldPassword: {},
      errorNewPassword: {},
      errorConfirmPassword: {},
      isLoadingPreloader: true,
      isOpenLogoutModal: false,
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  async componentDidMount() {
    let date = new Date();
    let newAccessToken =
      this.props.access_token !== "" ? this.props.access_token : "";
    let decodeToken = jwtDecode(newAccessToken);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        setTimeout(
          () =>
            this.setState(() => ({
              isLoadingPreloader: false,
            })),
          1000
        );
      } else if (decodeToken.exp < date.getTime() / 1000) {
        return <Redirect to="/admin/logout" />;
      }
    }

    // this.setState({ users: this.props.userInfo });
  }
  handleOnchange = (e, field) => {
    let copyState = { ...this.state };
    copyState[field] = e.target.value;
    this.setState({ ...copyState });
    if (field === "oldPassword") {
      let length = error.oldPassword.length;
      let format = error.oldPassword.format;
      let required = error.oldPassword.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ errorOldPassword: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 8 && copyState[field].length <= 32) {
          delete data.length;
          delete data.required;

          // \w : Kí tự a-zA-Z0-9
          // \W : Tìm kí tự từ a-z, A-Z, 0-9, kể cả _
          // \d :Tìm kí tự là chữ số
          // \s : Kí tự là khoảng trắng
          // + Chứa ít nhất 1 kí tự
          // * Khớp bất kì chuỗi nào
          // ? Its nhất 1 lần xuất hiện
          // ?=n bất kì chuỗi nào theo sau bởi chuỗi chỉ định n
          // + 1 lần
          // * nhiều lần
          // ? Có xuất hiện không
          //Kí tự đặt biệt phía trước có dấu \
          //([\w_!@#$%*]+)
          //1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng
          let pattern_password =
            /^(?=.{8,})(?=.*[A-Z]){1}(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).\S*$/;
          if (!pattern_password.test(copyState[field])) {
            this.setState({ errorOldPassword: data });
          } else {
            this.setState({ errorOldPassword: "" });
          }
        } else {
          delete data.required;
          this.setState({ errorOldPassword: data });
        }
      }
    }
    if (field === "newPassword") {
      let length = error.newPassword.length;
      let format = error.newPassword.format;
      let required = error.newPassword.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ errorNewPassword: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 8 && copyState[field].length <= 32) {
          delete data.length;
          delete data.required;

          // \w : Kí tự a-zA-Z0-9
          // \W : Tìm kí tự từ a-z, A-Z, 0-9, kể cả _
          // \d :Tìm kí tự là chữ số
          // \s : Kí tự là khoảng trắng
          // + Chứa ít nhất 1 kí tự
          // * Khớp bất kì chuỗi nào
          // ? Its nhất 1 lần xuất hiện
          // ?=n bất kì chuỗi nào theo sau bởi chuỗi chỉ định n
          // + 1 lần
          // * nhiều lần
          // ? Có xuất hiện không
          //Kí tự đặt biệt phía trước có dấu \
          //([\w_!@#$%*]+)
          //1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng
          let pattern_password =
            /^(?=.{8,})(?=.*[A-Z]){1}(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).\S*$/;
          if (!pattern_password.test(copyState[field])) {
            this.setState({ errorNewPassword: data });
          } else {
            this.setState({ errorNewPassword: "" });
          }
        } else {
          delete data.required;
          this.setState({ errorNewPassword: data });
        }
      }
    }
    if (field === "confirmPassword") {
      let length = error.confirmPassword.length;
      let format = error.confirmPassword.format;
      let required = error.confirmPassword.required;
      let data = {
        required: required,
        length: length,
        format: format,
      };
      //Kiểm tra có để trống không
      if (copyState[field] === "") {
        this.setState({ errorConfirmPassword: data });
      } else {
        //Kiểm tra độ dài
        if (copyState[field].length >= 8 && copyState[field].length <= 32) {
          delete data.length;
          delete data.required;

          // \w : Kí tự a-zA-Z0-9
          // \W : Tìm kí tự từ a-z, A-Z, 0-9, kể cả _
          // \d :Tìm kí tự là chữ số
          // \s : Kí tự là khoảng trắng
          // + Chứa ít nhất 1 kí tự
          // * Khớp bất kì chuỗi nào
          // ? Its nhất 1 lần xuất hiện
          // ?=n bất kì chuỗi nào theo sau bởi chuỗi chỉ định n
          // + 1 lần
          // * nhiều lần
          // ? Có xuất hiện không
          //Kí tự đặt biệt phía trước có dấu \
          //([\w_!@#$%*]+)
          //1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng
          let pattern_password =
            /^(?=.{8,})(?=.*[A-Z]){1}(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).\S*$/;
          if (!pattern_password.test(copyState[field])) {
            this.setState({ errorConfirmPassword: data });
          } else {
            this.setState({ errorConfirmPassword: "" });
          }
        } else {
          delete data.required;
          this.setState({ errorConfirmPassword: data });
        }
      }
    }
  };
  HandleUpdatePassword = async () => {
    let { users, oldPassword, newPassword, confirmPassword } = this.state;
    //B1 khi ta nhập vào ta check password có match với password trên db ko
    const passwordIsMatch = bcrypt.compareSync(oldPassword, users.password);
    if (passwordIsMatch) {
      //   //Tiếp tục check xem 2 confirm và oldPassword có theo mẫu không
      let isValidNewPassword = checkPassword(newPassword, "Mật khẩu mới");
      let isValidConfirmPassword = checkPassword(
        confirmPassword,
        "Mật khẩu xác nhận"
      );
      //================================================================Nếu cả 2 đã đúng form
      if (isValidNewPassword && isValidConfirmPassword) {
        //===========================================So sánh 2 mật khẩu có trùng nhau không
        let isMatchPassword =
          isValidNewPassword.toString() === isValidConfirmPassword.toString()
            ? true
            : false;
        //================================================Nếu cả 2 trùng nhau ta bắt đầu hash và gửi API
        if (isMatchPassword) {
          let salt = bcrypt.genSaltSync(10);
          let hashNewPassword = await bcrypt.hash(newPassword, salt);
          let data = {
            password: hashNewPassword,
          };
          let access_token = this.props.access_token;
          let id = this.props.id;
          let res = HandleEditUserById(data, access_token, id);
          if (res && res.code === 200) {
            toast.success("Cập nhật mật khẩu thành công");
          } else {
            toast.error(res.message);
          }
        } else {
          toast.error("Mật khẩu mới không trùng nhau");
        }
      }
    } else {
      toast.error("Mật khẩu cũ không chínhh xác");
    }
    //B2 khi ta nhập vào ta check password có match với biểu thức chính quy không
    //B3 Kiểm tra 2 password kia có trùng nhau không
  };
  handleShowPassword = (type) => {
    if (type === "oldPassword") {
      this.setState({ isShowOldPassword: !this.state.isShowOldPassword });
    } else if (type === "newPassword") {
      this.setState({ isShowNewPassword: !this.state.isShowNewPassword });
    } else if (type === "confirmPassword") {
      this.setState({
        isShowConfirmPassword: !this.state.isShowConfirmPassword,
      });
    }
  };
  render() {
    let arrLink = handleBuildBreadCrumb();
    return (
      <>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3>Thông tin cá nhân</h3>
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
                            {breadcrumb.hasOwnProperty(item.text) ? (
                              <>{breadcrumb[label]}</>
                            ) : (
                              item.text
                            )}
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
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header  bg-primary">
                      <h3 className="card-title">Thay đổi mật khẩu</h3>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                          title="Collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                      </div>
                    </div>

                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="row d-flex">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          {/* //======================================oldPassword */}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-2">
                                <label htmlFor="inputName" className="">
                                  Mật khẩu cũ
                                </label>
                              </div>
                              <div className="col-md-10 input-password">
                                <input
                                  className={
                                    _.isEmpty(this.state.errorOldPassword)
                                      ? "form-control shadow-none"
                                      : "form-control shadow-none active-error"
                                  }
                                  placeholder="********"
                                  value={this.state.oldPassword}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "oldPassword");
                                  }}
                                  type={
                                    this.state.isShowOldPassword
                                      ? "text"
                                      : "password"
                                  }
                                />

                                <i
                                  className={
                                    this.state.isShowOldPassword
                                      ? "fas fa-eye-slash"
                                      : "fas fa-eye"
                                  }
                                  onClick={() => {
                                    this.handleShowPassword("oldPassword");
                                  }}
                                ></i>
                                {/* Hiển thị info khi có lỗi */}
                                {!_.isEmpty(this.state.errorOldPassword) ? (
                                  <i class="fa fa-info-circle error-info-password"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-2"></div>
                              <div className="col-md-10">
                                {this.state.errorOldPassword &&
                                  Object.entries(
                                    this.state.errorOldPassword
                                  ).map(([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                          {/* //======================================oldPassword */}
                          {/* //======================================newPassword */}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-2">
                                <label htmlFor="inputName" className="">
                                  Mật khẩu mới
                                </label>
                              </div>
                              <div className="col-md-10 input-password">
                                <input
                                  className={
                                    _.isEmpty(this.state.errorOldPassword)
                                      ? "form-control shadow-none"
                                      : "form-control shadow-none active-error"
                                  }
                                  placeholder="********"
                                  value={this.state.newPassword}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "newPassword");
                                  }}
                                  type={
                                    this.state.isShowNewPassword
                                      ? "text"
                                      : "password"
                                  }
                                />

                                <i
                                  className={
                                    this.state.isShowNewPassword
                                      ? "fas fa-eye-slash"
                                      : "fas fa-eye"
                                  }
                                  onClick={() => {
                                    this.handleShowPassword("newPassword");
                                  }}
                                ></i>
                                {/* Hiển thị info khi có lỗi */}
                                {!_.isEmpty(this.state.errorNewPassword) ? (
                                  <i class="fa fa-info-circle error-info-password"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-2"></div>
                              <div className="col-md-10">
                                {this.state.errorNewPassword &&
                                  Object.entries(
                                    this.state.errorNewPassword
                                  ).map(([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                          {/* //======================================newPassword */}
                          {/* //======================================confirmPassword */}
                          <div className="form-group ">
                            <div className="row d-flex">
                              <div className="col-md-2">
                                <label htmlFor="inputName" className="">
                                  Xác nhận mật khẩu
                                </label>
                              </div>
                              <div className="col-md-10 input-password">
                                <input
                                  className={
                                    _.isEmpty(this.state.errorConfirmPassword)
                                      ? "form-control shadow-none"
                                      : "form-control shadow-none active-error"
                                  }
                                  placeholder="********"
                                  value={this.state.confirmPassword}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "confirmPassword");
                                  }}
                                  type={
                                    this.state.isShowConfirmPassword
                                      ? "text"
                                      : "password"
                                  }
                                />

                                <i
                                  className={
                                    this.state.isShowConfirmPassword
                                      ? "fas fa-eye-slash"
                                      : "fas fa-eye"
                                  }
                                  onClick={() => {
                                    this.handleShowPassword("confirmPassword");
                                  }}
                                ></i>
                                {/* Hiển thị info khi có lỗi */}
                                {!_.isEmpty(this.state.errorConfirmPassword) ? (
                                  <i class="fa fa-info-circle error-info-password"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="row d-flex">
                              <div className="col-md-2"></div>
                              <div className="col-md-10">
                                {this.state.errorConfirmPassword &&
                                  Object.entries(
                                    this.state.errorConfirmPassword
                                  ).map(([key, value]) => (
                                    <span key={key} className="error">
                                      {value}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                          {/* //======================================confirmPassword */}
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer footer-user">
                      <button
                        className="btn btn-primary btn-add-user"
                        onClick={this.HandleUpdatePassword}
                      >
                        Thay đổi
                      </button>
                    </div>
                  </div>
                </div>
                {/* /.col */}
                {this.state.isLoadingPreloader && <Progress />}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>

          {/* //===================================Progress Icon */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.user.user_id,
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    fetchUserStart: (accessToken) =>
      dispatch(actions.fetchUserStart(accessToken)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
