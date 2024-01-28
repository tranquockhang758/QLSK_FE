import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import User from "../containers/Admin/User/User";

import { path } from "../utils";
import Login from "../containers/Auth/Login";
import HomePage from "../containers/HomePage/HomePage";
import Home from "./Home";
class SystemAdmin extends Component {
  render() {
    const { systemMenuPath, userInfo } = this.props;
    return (
      <>
        <div className="system-container">
          {/* {this.props.isLoggedIn && <Header />} */}
          <div className="system-list">
            <Switch>
              <Route path={path.USER} component={User} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    roleId: state.user.roleId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdmin);
