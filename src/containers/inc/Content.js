import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../store/actions";

import { FormattedMessage } from "react-intl";
import { languages } from "../../utils/constant";
import "./HeaderRedux.scss";
import banner from "../../assets/images/banner-logo.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    const { language, userInfo, processLogout } = this.props;
    return (
      <>
        <div>
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">User</h1>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* /.content-header */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.ChangeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
