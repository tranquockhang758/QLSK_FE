import React, { Component } from "react";

import { connect } from "react-redux";
import "./User.scss";

import { withRouter, Link } from "react-router-dom";
import "./LockScreen.scss";
import thumbnail from "../../../assets/images/user1-128x128.jpg";
import { jwtDecode } from "jwt-decode";
import LogoutModal from "../../inc/LogoutModal.js";
import * as actions from "../../../store/actions";
import banner from "../../../../src/assets/images/logo.png";
import { error } from "../../../utils/constant";
import { handleLogin } from "../../../services/userService.js";
import { toast } from "react-toastify";
class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingPreloader: true,
      isOpenLogoutModal: false,
      password:""
    };
  }

  componentDidMount() {
    let date = new Date();
    let access_token = this.props.access_token ? this.props.access_token : "";
    let decodeToken = jwtDecode(access_token);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        this.props.processLockScreen();
        setTimeout(
          () =>
            this.setState(() => ({
              isLoadingPreloader: false,
            })),
          300
        );
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

    //====================================================Kiểm tra password
    // if (field === "password") {
    //   let length = error.password.length;
    //   let format = error.password.format;
    //   let required = error.password.required;
    //   let data = {
    //     required: required,
    //     length: length,
    //     format: format,
    //   };
    //   //Kiểm tra có để trống không
    //   if (copyState[field] === "") {
    //     this.setState({ error_password: data });
    //   } else {
    //     //Kiểm tra độ dài
    //     if (copyState[field].length >= 8 && copyState[field].length <= 32) {
    //       delete data.length;
    //       delete data.required;

    //       // \w : Kí tự a-zA-Z0-9
    //       // \W : Tìm kí tự từ a-z, A-Z, 0-9, kể cả _
    //       // \d :Tìm kí tự là chữ số
    //       // \s : Kí tự là khoảng trắng
    //       // + Chứa ít nhất 1 kí tự
    //       // * Khớp bất kì chuỗi nào
    //       // ? Its nhất 1 lần xuất hiện
    //       // ?=n bất kì chuỗi nào theo sau bởi chuỗi chỉ định n
    //       // + 1 lần
    //       // * nhiều lần
    //       // ? Có xuất hiện không
    //       //Kí tự đặt biệt phía trước có dấu \
    //       //([\w_!@#$%*]+)
    //       //1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng
    //       let pattern_password =
    //         /^(?=.{8,})(?=.*[A-Z]){1}(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).\S*$/;
    //       if (!pattern_password.test(copyState[field])) {
    //         this.setState({ error_password: data });
    //       } else {
    //         this.setState({ error_password: "" });
    //       }
    //     } else {
    //       delete data.required;
    //       this.setState({ error_password: data });
    //     }
    //   }
    // }

    //====================================================Kiểm tra mobile
    

   

    //Sau khi cập nhật state ta kiểm tra state email,password ,name,role,birthday
  };
  handleLoginFromLockScreen =  async( ) => {
    let email = this.props.userInfo.email;
    let password = this.state.password;
    let res = await handleLogin(email, password);
    if (res && res.access_token) {
      // toast.success("Đăng nhập thành công");
      this.props.userLoginStart(res);
      this.props.history.push("/admin");
    } else {
      toast.error("email hoặc password sai");
    }

  }
  render() {
    let {userInfo,isLockScreen} = this.props;
    console.log(isLockScreen)
    return (
      <>
      {isLockScreen && <div className="lockscreen-wrapper">
          <div className="lockscreen-logo">
            <img src={banner} alt={"none"}/>
          </div>
          {/* User name */}
          <div className="lockscreen-name text-center">{userInfo.name?userInfo.name:"" } </div>
          {/* START LOCK SCREEN ITEM */}
          <div className="lockscreen-item">
            {/* lockscreen image */}
            <div className="lockscreen-image">
              <img src={userInfo.thumbnailUrl} alt={"none"} />
            </div>
            {/* /.lockscreen-image */}
            {/* lockscreen credentials (contains the form) */}
            <form className="lockscreen-credentials">
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.handleOnchange(e, "password");
                  }}
                />
                <div className="input-group-append">
                  <button type="button" className="btn">
                    <i className="fas fa-arrow-right text-muted" onClick={this.handleLoginFromLockScreen}/>
                  </button>
                </div>
              </div>
            </form>
            {/* /.lockscreen credentials */}
          </div>
          {/* /.lockscreen-item */}
          <div className="help-block text-center">
            Enter your password to retrieve your session
          </div>
          <div className="text-center" style={{cursor:"pointer"}}>
            <Link to="/login">Or sign in as a different user</Link>
          </div>
          <div className="lockscreen-footer text-center">
            Copyright © 2022 <p className="text-company">HPC Đồng Nai</p><br/> All rights reserved
          </div>
        </div>}
        {/* Automatic element centering */}
       

      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    access_token:state.user.access_token,
    userInfo:state.user.userInfo,
    isLockScreen:state.user.isLockScreen,  
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLockScreen : () => dispatch(actions.processLockScreen()),
    userLoginStart: (data) => dispatch(actions.userLoginStart(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LockScreen)
);
