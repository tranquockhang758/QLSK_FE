import React, { Component } from "react";

import { connect } from "react-redux";
import "./User.scss";

import { withRouter, Link } from "react-router-dom";
import banner from "../../../assets/images/evngenco.png";
import "./LockScreen.scss";
import thumbnail from "../../../assets/images/user1-128x128.jpg";
import { jwtDecode } from "jwt-decode";
import LogoutModal from "../../inc/LogoutModal.js";

class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingPreloader: true,
      isOpenLogoutModal: false,
    };
  }

  componentDidMount() {
    let date = new Date();
    let access_token = this.props.access_token ? this.props.access_token : "";
    let decodeToken = jwtDecode(access_token);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
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
  render() {
    return (
      <>
        {/* Automatic element centering */}
        <div className="lockscreen-wrapper">
          <div className="lockscreen-logo">
            <Link to="/admin"></Link>
            <img src={banner} alt={""} />
          </div>
          {/* User name */}
          <div className="lockscreen-name">John Doe1</div>
          {/* START LOCK SCREEN ITEM */}
          <div className="lockscreen-item">
            {/* lockscreen image */}
            <div className="lockscreen-image">
              <img src={thumbnail} alt={""} />
            </div>
            {/* /.lockscreen-image */}
            {/* lockscreen credentials (contains the form) */}
            <form className="lockscreen-credentials">
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                />
                <div className="input-group-append">
                  <button type="button" className="btn">
                    <i className="fas fa-arrow-right text-muted" />
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
          <div className="text-center">
            <a href>Or sign in as a different user</a>
          </div>
          <div className="lockscreen-footer text-center">
            Copyright © 2024
            <b>
              <a href className="text-black">
                HPC Đồng Nai
              </a>
            </b>
            <br />
            All rights reserved
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LockScreen)
);
