import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";

import "./Header.scss";
import banner from "../../assets/images/logo.png";
import bannerEVN from "../../assets/images/banner.jpg";
import user1 from "../../assets/images/user1-128x128.jpg";
import MainSpeechHeader from "../Admin/SpeechRecognition/MainSpeechHeader";
import PropTypes from "prop-types";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
      isClick: false,
      isShowVoice: false,
      transcript: "",
      isListening: false,
      message: "",
    };
    this.microphoneParentRef = React.createRef();
  }

  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  componentDidMount() {
    setTimeout(() => this.setState(() => ({ isLoading: false })), 1000);
  }

  //Lấy data từ con
  callBackFunction = (data) => {
    //Sau khi có data ta thực hiện update redux
    console.log("Check data from child",data);
    //Khởi tạo redux
  };

  callBackGetListUser = (data) => {
    let access_token = this.props.access_token;
    console.log("Check",data);
    this.props.fetchUserStart(access_token);
  }
  handleClickMicrophone = (e) => {
    e.preventDefault();
    this.microphoneParentRef.current();
  } 
  render() {
    let hrefDefault = "";
    //Đến mức 570 thì độ rộng của dropdown menu bị mất
    return (
      <>
        {this.state.isLoading && (
          <div className="preloader flex-column justify-content-center align-items-center">
            <img
              className="animation__shake"
              src={bannerEVN}
              alt="AdminLTELogo"
              height="60"
              width="60"
            />
          </div>
        )}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light header-top">
          <div className="banner">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href={hrefDefault.toString()}
              role="button"
            >
              <img src={banner} alt={""} className="banner-logo" />
            </a>
          </div>
        </nav>

        {/* //==================================================navbar */}
        {/* ==================================================Khi vào màn hình nhỏ ta thêm class cho các dropdown  */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light header-bottom">
          {/* Left navbar links */}
          <ul className="navbar-nav sidebar-header">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href={hrefDefault.toString()}
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to={"/admin"} className="nav-link">
                Home
              </Link>
              {/* <a href={hrefDefault.toString()} className="nav-link">
                Home
              </a> */}
            </li>
            <li className="nav-item">
              <Link to="/admin/contact" className={"nav-link"}>
                Contact
              </Link>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto navbar-right">
            {/* Navbar Search */}
           
            <li className="nav-item item-search">
              <a
                className="nav-link"
                data-widget="navbar-search"
                href={hrefDefault.toString()}
                role="button"
              >
                <i className="fas fa-search" />
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control form-control-navbar"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                      </button>
                      <button
                        className="btn btn-navbar"
                        type="button"
                        data-widget="navbar-search"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            {/* Messages Dropdown Menu */}
            <li className="nav-item dropdown nav-item-message">
              <a
                className="nav-link nav-link-comments"
                data-bs-toggle="dropdown"
                href={hrefDefault.toString()}
              >
                <i className="far fa-comments" />
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-message">
                <a href={hrefDefault.toString()} className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src={user1}
                      alt="User Avatar"
                      className="img-size-50 mr-3 img-circle"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href={hrefDefault.toString()} className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src={user1}
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href={hrefDefault.toString()} className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    {/* <img
                      src="dist/img/user3-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    /> */}
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a
                  href={hrefDefault.toString()}
                  className="dropdown-item dropdown-footer"
                >
                  See All Messages
                </a>
              </div>
            </li>
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown nav-item-notifications">
              <a
                className="nav-link nav-link-notifications"
                data-bs-toggle="dropdown"
                href={hrefDefault.toString()}
              >
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-notifications">
                <span className="dropdown-item dropdown-header">
                  15 Notifications
                </span>
                <div className="dropdown-divider" />
                <a href={hrefDefault.toString()} className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a href={hrefDefault.toString()} className="dropdown-item">
                  <i className="fas fa-users mr-2" /> 8 friend requests
                  <span className="float-right text-muted text-sm">
                    12 hours
                  </span>
                </a>
                <div className="dropdown-divider" />
                <a href={hrefDefault.toString()} className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a
                  href={hrefDefault.toString()}
                  className="dropdown-item dropdown-footer"
                >
                  See All Notifications
                </a>
              </div>
            </li>
            <li
              className="nav-item item-microphone"
              onClick={(e) => {this.handleClickMicrophone(e)}}
            >
              <i className="fas fa-microphone"></i>
            </li>
          </ul>
        </nav>

        {/* ==========================================Hiển thị voice Recognition */}
        <div className="d-none">
          <MainSpeechHeader
            microphoneParentRef={this.microphoneParentRef}
            callBackFunction={this.callBackFunction}
            callBackGetListUser={this.callBackGetListUser}
          />
        </div>

        {/* <MainSpeech /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    user_id: state.user.user_id,
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.ChangeLanguage(language)),
    fetchUserStart : (access_token) => dispatch(actions.fetchUserStart(access_token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
