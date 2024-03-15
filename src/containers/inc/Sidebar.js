import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Sidebar.scss";
import { withRouter, Link } from "react-router-dom";
import { path } from "../../utils/constant";
import {
  handleGetAllPost,
  handleGetAllUsers,
} from "../../services/userService";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      listUser: [],
      listPost: [],
    };
  }

  async componentDidMount() {
    try {
      let access_token = this.props.access_token;
      if (access_token) {
        let res = await handleGetAllUsers(access_token);
        let resPost = await handleGetAllPost(access_token);
        if (res && res.code === 200) {
          this.setState({
            listUser: res.data,
          });
        }
        if (resPost && res.code === 200) {
          this.setState({ listPost: resPost.data });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    // console.log("Check",this.props.userInfo.role)
    let { users, listUser, listPost } = this.state;
    let { isLoggedIn } = this.props;
    let pathName = window.location.pathname;
    let hrefDefault = "";
    let isActiveCreate,
      isActiveList,
      isActiveChangePassword,
      isActiveProfile,
      isActiveAdmin,
      isUploadFile,
      isActiveListPost,
      isActiveMyListPost,
      isActiveCreatePost = "";

    if (pathName === "/admin/user/create") {
      isActiveCreate = true;
    } else if (pathName === "/admin/user/list-users") {
      isActiveList = true;
    } else if (pathName === "/admin/user/profile") {
      isActiveProfile = true;
    } else if (pathName === "/admin/user/change-password") {
      isActiveChangePassword = true;
    } else if (pathName === "/admin") {
      isActiveAdmin = true;
    } else if (pathName === "/admin/user/upload-file") {
      isUploadFile = true;
    } else if (pathName === "admin/post/create") {
      isActiveCreatePost = true;
    } else if (pathName === "admin/post/list") {
      isActiveListPost = true;
    } else if (pathName === "admin/post/myPost") {
      isActiveMyListPost = true;
    }
    let role = this.props.userInfo.role;
    
    return (
      <>
        <aside className="main-sidebar main-sidebar-custom sidebar-primary elevation-4 ">
          {/* Sidebar */}
          <div className="sidebar">
            
            {/* //========================================================Phân quyền menu cho users */}
            {isLoggedIn ? (
              <aside className="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4">
                <div className="sidebar">
                  <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                      <img
                        src={
                          this.props.userInfo.thumbnailUrl
                            ? this.props.userInfo.thumbnailUrl
                            : ""
                        }
                        className="img-circle elevation-2"
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <a
                        href={hrefDefault.toString()}
                        className="d-block title-name"
                      >
                        {this.props.userInfo.name
                          ? this.props.userInfo.name
                          : ""}
                      </a>
                      <a
                        href={hrefDefault.toString()}
                        className="d-block title-name"
                      >
                        {this.props.userInfo.role
                          ? this.props.userInfo.role
                          : ""}
                      </a>
                    </div>
                  </div>
                 
                  {/* //========================================================Phân quyền menu cho users */}
                  {role === "User" ? (
                    <nav className="mt-2 ">
                      <ul
                        className="nav nav-pills nav-sidebar flex-column  nav-flat"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                      >
                        {/* Add icons to the links using the .nav-icon class
                   with font-awesome or any other icon font library */}

                        <li className="nav-item first-child">
                          <a href={hrefDefault.toString()} className="nav-link">
                            <i className="nav-icon fas fa-user" />
                            <p>
                              Tài khoản
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview nav-pills nav-item-child">
                            <li className={"nav-item"}>
                              <Link
                                to={path.LIST_USER}
                                className={
                                  isActiveList ? "nav-link active" : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Danh sách thành viên
                                <span className="badge badge-success navbar-badge badge-sidebar">
                                  {listUser && listUser.length > 0
                                    ? listUser.length
                                    : "0"}
                                </span>
                              </Link>
                            </li>
                            <li className={"nav-item"}>
                              <Link
                                to={path.PROFILE}
                                className={
                                  isActiveProfile
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Thông tin tài khoản
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to={path.CHANGE_PASSWORD}
                                className={
                                  isActiveChangePassword
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Thay đổi mật khẩu
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                to={path.LOCKSCREEN}
                                className={"nav-link"}
                              >
                                <i className="far fa-circle nav-icon" />
                               LockScreen
                              </Link>
                            </li>

                            <li className="nav-item ">
                              <Link to={path.LOG_OUT} className={"nav-link"}>
                                <i className="far fa-circle nav-icon" />
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="nav-item">
                          <a href={hrefDefault.toString()} className="nav-link">
                            <i className="nav-icon fa fa-clipboard" />
                            <p>
                              Sáng kiến
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview nav-item-child">
                            <li className={"nav-item"}>
                              <Link
                                to="/admin/post/create"
                                className={
                                  isActiveCreatePost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Thêm mới sáng kiến
                              </Link>
                              <Link
                                to="/admin/post/list"
                                className={
                                  isActiveListPost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                <span className="badge badge-success navbar-badge badge-sidebar">
                                  {listPost && listPost.length > 0
                                    ? listPost.length
                                    : "0"}
                                </span>
                                Danh sách sáng kiến
                              </Link>
                            </li>
                            
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  ) : (
                    <nav className="mt-2 ">
                      <ul
                        className="nav nav-pills nav-sidebar flex-column  nav-flat"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                      >
                        {/* Add icons to the links using the .nav-icon class
                     with font-awesome or any other icon font library */}

                        <li className="nav-item first-child">
                          <a href={hrefDefault.toString()} className="nav-link">
                            <i className="nav-icon fas fa-user" />
                            <p>
                              Tài khoản
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview nav-pills nav-item-child">
                            <li className={"nav-item"}>
                              <Link
                                to={path.CREATE_USER}
                                className={
                                  isActiveCreate
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Thêm mới thành viên
                              </Link>
                            </li>
                            <li className={"nav-item"}>
                              <Link
                                to={path.LIST_USER}
                                className={
                                  isActiveList ? "nav-link active" : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Danh sách thành viên
                                <span className="badge badge-success navbar-badge badge-sidebar">
                                  {listUser && listUser.length > 0
                                    ? listUser.length
                                    : "0"}
                                </span>
                              </Link>
                            </li>
                            <li className={"nav-item"}>
                              <Link
                                to={path.PROFILE}
                                className={
                                  isActiveProfile
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Thông tin tài khoản
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to={path.CHANGE_PASSWORD}
                                className={
                                  isActiveChangePassword
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Thay đổi mật khẩu
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                to={path.LOCKSCREEN}
                                className={"nav-link"}
                              >
                                <i className="far fa-circle nav-icon" />
                               LockScreen
                              </Link>
                            </li>
                            <li className="nav-item ">
                              <Link to={path.LOG_OUT} className={"nav-link"}>
                                <i className="far fa-circle nav-icon" />
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="nav-item">
                          <a href={hrefDefault.toString()} className="nav-link">
                            <i className="nav-icon fa fa-clipboard" />
                            <p>
                              Sáng kiến
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview nav-item-child">
                            <li className={"nav-item"}>
                              <Link
                                to="/admin/post/create"
                                className={
                                  isActiveCreatePost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Thêm mới sáng kiến
                              </Link>
                            </li>
                            <li className={"nav-item"}>
                              <Link
                                to="/admin/post/list"
                                className={
                                  isActiveListPost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                <span className="badge badge-success navbar-badge badge-sidebar">
                                  {listPost && listPost.length > 0
                                    ? listPost.length
                                    : "0"}
                                </span>
                                Danh sách sáng kiến
                              </Link>
                            </li>
                            <li className={"nav-item"}>
                              <Link
                                to="/admin/post/myPost"
                                className={
                                  isActiveMyListPost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                {/* <span className="badge badge-success navbar-badge badge-sidebar">
                                  {listPost && listPost.length > 0
                                    ? listPost.length
                                    : "0"}
                                </span> */}
                                Sáng kiến của tối
                              </Link>
                            </li>
                            {/* <li className={"nav-item"}>
                              <Link
                                to="/admin/speech"
                                className={
                                  isActiveListPost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Nhận diện giọng nói
                              </Link>
                            </li> */}
                          </ul>
                        </li>

                        {/* //AI Module */}
                        <li className="nav-item">
                          <a href={hrefDefault.toString()} className="nav-link">
                            <i className="nav-icon fa fa-clipboard" />
                            <p>
                              Nhận diện khuôn mặt/giọng nói
                              <i className="right fas fa-angle-left" />
                            </p>
                          </a>
                          <ul className="nav nav-treeview nav-item-child">
                            <li className={"nav-item"}>
                              <Link
                                to="/admin/speech"
                                className={
                                  isActiveCreatePost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                Nhận diện giọng nói
                              </Link>
                            </li>
                            <li className={"nav-item"}>
                              <Link
                                to="/admin/faceId"
                                className={
                                  isActiveMyListPost
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                              >
                                <i className="far fa-circle nav-icon" />
                                {/* <span className="badge badge-success navbar-badge badge-sidebar">
                                  {listPost && listPost.length > 0
                                    ? listPost.length
                                    : "0"}
                                </span> */}
                               Nhận diện khuôn mặt
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </aside>
            ) : (
              ""
            )}
          </div>
          {/* /.sidebar */}
        </aside>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    id: state.user.user_id,
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    UpdateIsLogin: () => dispatch(actions.UpdateIsLogin()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
