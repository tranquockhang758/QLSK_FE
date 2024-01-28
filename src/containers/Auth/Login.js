import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import "./Login.scss";
// import { FormattedMessage } from 'react-intl';
import { handleLogin } from "../../services/userService";
import banner from "../../assets/images/evngenco.png";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
      isShowPassword: false,
    };
  }
  handleOnchangeInput = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleLogin = async (e) => {
    this.setState({ errMessage: "" });
    let email = this.state.username;
    let password = this.state.password;
    try {
      let data = await handleLogin(email, password);
      if (
        data &&
        data.userData.errCode === 0 &&
        data.userData.user.roleId === 1
      ) {
        let accessToken = data.accessToken;
        let userInfo = data.userData;
        let data_action = {
          accessToken: accessToken,
          userInfo: userInfo,
        };
        // console.log(accessToken);
        this.props.userLoginSuccess(data_action);
      }

      //Check quyền nếu không phải admin đẩy user ra ngoài home
      if (
        data &&
        data.userData.errCode === 0 &&
        data.userData.user.roleId !== 1
      ) {
        console.log("Ok");
        this.props.history.push("/");
      }

      ///Nếu xuất hiện lỗi xuất lỗi ra toast cho người dùng  xem
      //data.userData.Message
      if (data.userData.errCode !== 0) {
        console.log(data.userData.Message);
        toast.error(`${data.userData.Message}`);
      }
    } catch (err) {
      console.log(err.dataponse);
    }
    this.setState({
      username: "",
      password: "",
      isShowPassword: false,
    });
    e.preventDefault();
  };
  handleClickEye = (e) => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
    e.preventDefault();
  };
  render() {
    return (
      <React.Fragment>
        <div id="main-container">
          <div className="login-box">
            {/* /.login-logo */}
            <div className="card">
              <div className="card-body login-card-body">
                <div className="banner">
                  <img src={banner} alt="" />
                </div>
                <p className="login-box-msg">Đăng nhặp</p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    value={this.state.username}
                    onChange={(event) => this.handleOnchangeInput(event)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    id="exampleDropdownFormPassword1"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnchangePassword(event)}
                  />
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                    onClick={(e) => {
                      this.handleClickEye(e);
                    }}
                  ></i>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      {/* <span className="fas fa-lock" /> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={(e) => this.handleLogin(e)}
                    >
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.social-auth-links */}
              </div>
              {/* /.login-card-body */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
