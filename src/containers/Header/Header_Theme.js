import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp_Theme";
import { languages } from "../../utils/constant";
import "./Header.scss";
import { FormattedMessage } from "react-intl";

class HeaderTheme extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    const { processLogout, userInfo } = this.props;
    return (
      <>
        {/* thanh navigator */}
        {/* <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div> */}
        {/* <div className="support-language">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />
            {userInfo && userInfo.lastName ? userInfo.lastName : ""}{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}{" "}
          </span>
          <div className="support">
            <i className="fas fa-question-circle"></i>
          </div>
          <div
            className={
              this.props.language === languages.VI
                ? "language-vi action"
                : "language-vi"
            }
            onClick={() => this.changeLanguage("vi")}
          >
            VN
          </div>
          <div
            className={
              this.props.language === languages.EN
                ? "language-en action"
                : "language-en"
            }
            onClick={() => this.changeLanguage("en")}
          >
            EN
          </div>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTheme);
