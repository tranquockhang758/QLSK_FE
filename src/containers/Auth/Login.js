import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import "./Login.scss";
// import { FormattedMessage } from 'react-intl';
import { handleLogin } from "../../services/userService";
import banner from "../../assets/images/logo.png";
import { withRouter } from "react-router-dom";
import { checkEmail, checkPassword } from "./RegEx";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
      isShowPassword: false,
    };
  }

  componentDidMount() {
    const clearTimer = setTimeout(() => {
      return window.location.replace("/login");
    });
    return clearTimeout(clearTimer);
  }
  componentDidUpdate(prevProps) {}
  handleOnchangeInput = (event) => {
    this.setState({ email: event.target.value });
  };
  handleOnchangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleClickEye = (e) => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      this.handleLogin();
    }
  };
  handleLogin = async () => {
    let email = this.state.email;
    let password = this.state.password;
    let isEmail = checkEmail(email);
    // let isPassword = checkPassword(password, "password");
    try {
      if (isEmail && password) {
        let res = await handleLogin(email, password);
        if (res && res.access_token) {
          // toast.success("Đăng nhập thành công");
          this.props.userLoginStart(res);
          this.setState({
            email: "",
            password: "",
            isShowPassword: false,
          });
        } else {
          toast.error("email hoặc password sai");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    let hrefDefault = "";
    return (
      <React.Fragment>
        <div id="main-container">
          <div className="login-box">
            {/* /.login-logo */}
            <div className="card">
              <div className="card-body login-card-body">
                <div className="col-md-12 banner">
                  <img src={banner} alt="" />
                </div>
                <p className="login-box-msg">Đăng nhặp</p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    value={this.state.email}
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
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnchangePassword(event)}
                    onKeyDown={(event) => {
                      this.handleKeyDown(event);
                    }}
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
                      <a
                        href={hrefDefault}
                        className="forget-button"
                        onClick={() => {
                          this.props.history.push("/admin/forget-password");
                        }}
                      >
                        Forget password
                      </a>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-login"
                      onClick={() => this.handleLogin()}
                    >
                      Đăng nhập
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
    user_id: state.user.user_id,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    adminLoginStart: () => dispatch(actions.adminLoginStart()),
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginStart: (data) => dispatch(actions.userLoginStart(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
