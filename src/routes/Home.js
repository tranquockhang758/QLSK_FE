import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const axiosJWT = axios.create();
// axiosJWT.interceptors.request.use(async (config) => {});
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {},
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      let date = new Date();
      let access_token = this.props.access_token ? this.props.access_token : "";
      let decodeToken = jwtDecode(access_token);
      //Nếu token hết hạn logout

      if (decodeToken !== "") {
        if (decodeToken.exp > date.getTime() / 1000) {
          return;
        } else if (decodeToken.exp < date.getTime() / 1000) {
          return this.props.history.push("/admin/logout");
        }
      }
    }, 500);
  }
  componentDidUpdate(prevProps) {}

  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let linkToRedirect = isLoggedIn ? "/admin" : "/login";
    return window.location.replace(linkToRedirect);
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isLoadingPage: state.user.isLoadingPage,
    userInfo: state.user.userInfo,
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
